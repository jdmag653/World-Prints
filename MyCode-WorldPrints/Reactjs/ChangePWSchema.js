import * as Yup from 'yup';

const YupChangePW = () => {
  const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const validate = Yup.object().shape({
    password: Yup.string()
      .matches(passwordPattern, 'Strong password is required')
      .required('Password is required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });
  return validate;
};

export default YupChangePW;