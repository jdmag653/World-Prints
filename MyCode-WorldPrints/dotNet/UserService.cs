using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Enums;
using Sabio.Models.Requests;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


namespace Sabio.Services
{
    public class UserService : IUserService
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;

        public UserService(IAuthenticationService<int> authService, IDataProvider dataProvider)
        {
            _authenticationService = authService;
            _dataProvider = dataProvider;
        }

        public async Task<bool> LogInAsync(string email, string password)
        {
            bool isSuccessful = false;

            IUserAuthData response = Get(email, password);

            if (response != null)//&& response.IsEmailConfirmed)
            {
                await _authenticationService.LogInAsync(response);
                isSuccessful = true;
            }

            return isSuccessful;
        }

        public async Task<bool> LogInTest(string email, string password, int id, string[] roles = null)
        {
            bool isSuccessful = false;
            var testRoles = new[] { "User", "Super", "Content Manager" };

            var allRoles = roles == null ? testRoles : testRoles.Concat(roles);

            IUserAuthData response = new UserBase
            {
                Id = id
                ,
                Email = email
                ,
                Roles = allRoles
                ,
                TenantId = "WorldPrint"
            };

            Claim fullName = new Claim("CustomClaim", "Sabio Bootcamp");
            await _authenticationService.LogInAsync(response, new Claim[] { fullName });

            return isSuccessful;
        }


        ///methods
        public bool Update(UserUpdatePWRequest model, int id)
        //^^Access Modifieer
        {

            string hashedPasswordFromDB = "";
            bool authorizedUser = false;

            string procName = "[dbo].[Users_Select_ById/Password_Auth]";



            _dataProvider.ExecuteCmd(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
 

                },
                delegate (IDataReader reader, short set)
                {
                    bool isValidCredentials = false;

                    hashedPasswordFromDB = reader.GetSafeString(0);

                    isValidCredentials = BCrypt.BCryptHelper.CheckPassword(model.CurrentPassword, hashedPasswordFromDB);

                    if (isValidCredentials)
                    {
                        UpdatePassword(model, id);
                        authorizedUser = true;
                    }
                    if (!isValidCredentials) throw new Exception("User not confirmed.");
                });

            return authorizedUser;
        }

        public void UpdatePassword(UserUpdatePWRequest userModel, int currentUserId)
        {
            if(userModel.Password == userModel.CurrentPassword) throw new Exception("Cannot Use Previous Password");

            string procName = "[dbo].[Users_Update_ChangePW]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {

                    col.AddWithValue("@Id", currentUserId);
                    col.AddWithValue("@Password", GenerateSalt(userModel.Password));

                },

                returnParameters: null);
        } 
        public int Create(UserBaseAddRequest userModel)
        {

            int userId = 0;

            string procName = "[dbo].[Users_Insert_V2]";

            //make sure the password column can hold long enough string. put it to 100 to be safe
            //DB provider call to create user and get us a user id
            _dataProvider.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Email", userModel.Email);
                    col.AddWithValue("@Password", GenerateSalt(userModel.Password));
                    col.AddWithValue("@RoleId", userModel.RoleId);
                    col.AddWithValue("@IsSubscribed", userModel.IsSubscribed);

                    SqlParameter idOutput = new SqlParameter("@Id", SqlDbType.Int);
                    idOutput.Direction = ParameterDirection.Output;
                    col.Add(idOutput);
                },
                delegate (SqlParameterCollection col)
                {
                    object objectId = col["@Id"].Value;
                    int.TryParse(objectId.ToString(), out userId);
                });


            //be sure to store both salt and passwordHash
            //DO NOT STORE the original password value that the user passed us

            return userId;
        }

        public Guid CreateRegToken(int userId)
        {
            string procName = "[dbo].[UserToken_Insert_Registration]";
            Guid token = Guid.NewGuid();

            _dataProvider.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@Token", token);
                });

            return token;
        }

        public void ConfirmRegToken(Guid token)
        {
            string procName = "[dbo].[Users_Confirm]";

            _dataProvider.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Token", token);
                });
        }

        private string GenerateSalt(string password)
        {
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            return BCrypt.BCryptHelper.HashPassword(password, salt);
        }

        /// <summary>
        /// Gets the Data call to get a give user
        /// </summary>
        /// <param name="email"></param>
        /// <param name="passwordHash"></param>
        /// <returns></returns>
        private IUserAuthData Get(string email, string password)
        {
            //make sure the password column can hold long enough string. put it to 100 to be safe
            string passwordFromDb = "";
            UserBase authorizedUser = null;
            string procName = "[dbo].[Users_Select_ByEmail_Auth]";


            //get user object from db;
            _dataProvider.ExecuteCmd(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Email", email);
                },
                delegate (IDataReader reader, short set)
                {
                    bool isValidCredentials = false;
                    int idx = 0;
                    UserBase user = MapUser(reader, out passwordFromDb, idx);

                    if (!user.IsEmailConfirmed) throw new Exception("User not yet confirmed. Please check your Email to confirm your Account");

                    isValidCredentials = BCrypt.BCryptHelper.CheckPassword(password, passwordFromDb);

                    if (isValidCredentials)
                    {
                        authorizedUser = user;
                    }
                });

            return authorizedUser;
        }


        public bool PasswordRecovery(string email, string token)
        {
            bool isAuth = false;
            int tokenType = (int)TokenType.PasswordRecovery;
            string procName = "dbo.UserToken_PasswordRecovery";


            _dataProvider.ExecuteNonQuery(procName, inputParamMapper:

             delegate (SqlParameterCollection col)
            {

                col.AddWithValue("@email", email);
                col.AddWithValue("@Token", token);
                col.AddWithValue("@TokenType", tokenType);

                SqlParameter idOutput = new SqlParameter("@IsUser", SqlDbType.Bit);
                idOutput.Direction = ParameterDirection.Output;
                col.Add(idOutput);

            },
             delegate (SqlParameterCollection col)
             {
                 object objectId = col["@IsUser"].Value;
                 bool.TryParse(objectId.ToString(), out isAuth);
             }

            );

            return isAuth;

        }

        public void PasswordRecoveryChangeEmail(string password, string token)
        {
            //bool isChanged=false;
            string procName = "dbo.Users_PasswordRecover_updatePw";

            string secPassword = GenerateSalt(password);

            _dataProvider.ExecuteNonQuery(procName, inputParamMapper:
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Password", secPassword);
                    col.AddWithValue("@Token", token);
                });


        }




        public bool GoogleInsertToken(string email, string token) //bool for Is User exist
        {
            string procName = "dbo.UserToken_GoogleLogin";
            int tokenType = (int)TokenType.Google;
            bool isAuth = false;


            _dataProvider.ExecuteNonQuery(procName, inputParamMapper:
                delegate (SqlParameterCollection col)

                {
                    col.AddWithValue("@email", email);
                    col.AddWithValue("@token", token);
                    col.AddWithValue("@tokenType", tokenType);


                    SqlParameter idOutput = new SqlParameter("@IsUser", SqlDbType.Bit);
                    idOutput.Direction = ParameterDirection.Output;
                    col.Add(idOutput);
                },
             delegate (SqlParameterCollection col)
             {
                 object objectId = col["@IsUser"].Value;
                 bool.TryParse(objectId.ToString(), out isAuth);
             }

            );

            return isAuth;

        }

        public async Task<bool> GoogleLogInAsync(string email)
        {
            bool isSuccessful = false;

            IUserAuthData response = GetGoole(email);

            if (response != null)
            {
                await _authenticationService.LogInAsync(response);
                isSuccessful = true;
            }

            return isSuccessful;
        }


        private IUserAuthData GetGoole(string email)
        {
            UserBase authorizedUser = null;
            string procName = "[dbo].[Users_Select_ByEmail_Google]";

            _dataProvider.ExecuteCmd(procName,
              inputParamMapper: delegate (SqlParameterCollection col)
               {
                   col.AddWithValue("@Email", email);
               },
               singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int idx = 0;
                    UserBase user = MapGoogleUser(reader, idx);

                    if (!user.IsEmailConfirmed) throw new Exception("User not yet confirmed. Please check your Email to confirm your Account");

                    {
                        authorizedUser = user;
                    }

                });

            return authorizedUser;
        }


        private static UserBase MapUser(IDataReader reader, out string passwordFromDb, int idx)
        {
            UserBase user = new UserBase();
            user.Id = reader.GetSafeInt32(idx++);
            user.Email = reader.GetSafeString(idx++);
            passwordFromDb = reader.GetSafeString(idx++);
            user.Roles = new[] { reader.GetSafeString(idx++) };
            user.IsEmailConfirmed = reader.GetSafeBool(idx++);
            user.TenantId = "WorldPrint";
            return user;
        }

        private static UserBase MapGoogleUser(IDataReader reader, int idx)
        {
            UserBase user = new UserBase();
            user.Id = reader.GetSafeInt32(idx++);
            user.Email = reader.GetSafeString(idx++);
            user.IsEmailConfirmed = reader.GetSafeBool(idx++);
            user.TenantId = "WorldPrint";
            user.Roles = new[] { reader.GetSafeString(idx++) };

            return user;
        }


    }
}