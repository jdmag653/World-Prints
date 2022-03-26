import React from "react";
import UserProfileForm from "../components/forms/userProfile/UserProfileForm";
import PropTypes from "prop-types";
import hero2 from "@assets/images/hero-bg/hero-2.jpg";
import particles3 from "@assets/images/hero-bg/particles-2.svg";
import userProfileService from "../services/userProfileService";
import usersServices from "../services/usersService";
import debug from "sabio-debug";

const _logger = debug.extend("UserProfile");

class UserProfile extends React.Component {
  state = {
    profile: {
      avatarUrl: "",
      dateCreated: "",
      dateModified: "",
      firstName: "",
      id: 0,
      lastName: "",
      mi: "",
    },
  };

  componentDidMount = () => {
    userProfileService
      .getCurrent()
      .then(this.onGetProfileSuccess)
      .catch(this.onGetProfileFail);
    usersServices
      .getCurrent()
      .then(this.onGetUserSuccess)
      .catch(this.onGetUserFail);
  };

  onGetProfileSuccess = (response) => {
    _logger(response.item);
    this.setState((prevState) => {
      return { ...prevState, profile: response.item };
    });
  };

  onGetProfileFail = (error) => {
    _logger(error);
  };

  onGetUserSuccess = (response) => {
    this.setState((prevState) => {
      return { ...prevState, user: response.item };
    });
  };
  onGetUserFail = (error) => {
    _logger(error);
  };

  render() {
    return (
      <React.Fragment>
        <div className="hero-wrapper bg-wrapper bg-deep-sky">
          <div className="hero-wrapper--content">
            <div
              className="bg-composed-wrapper--image opacity-7"
              style={{ backgroundImage: "url(" + hero2 + ")" }}
            />
            <div className="bg-composed-wrapper--bg bg-second opacity-6" />
            <div className="bg-composed-wrapper--bg bg-primary opacity-6" />
            <div
              className="bg-composed-wrapper--image bg-composed-filter-rm opacity-9"
              style={{ backgroundImage: "url(" + particles3 + ")" }}
            />
            <div className="bg-composed-wrapper--content">
              <div className="z-over pb-2">
                <h1 className="text-center font-weight-bold text-light m-5">
                  {this.state.profile.firstName === "" ? (
                    <span>Create Your Profile</span>
                  ) : (
                    <span>Update Your Profile</span>
                  )}
                </h1>
              </div>
            </div>
          </div>
          <div className="z-over">
            <UserProfileForm
              profile={this.state.profile}
              user={this.state.user}
            />
          </div>
          <div className="shape-container-top-2 z-below mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="white"
                fillOpacity="1"
                d="M0,96L34.3,96C68.6,96,137,96,206,90.7C274.3,85,343,75,411,90.7C480,107,549,149,617,154.7C685.7,160,754,128,823,149.3C891.4,171,960,245,1029,245.3C1097.1,245,1166,171,1234,138.7C1302.9,107,1371,117,1406,122.7L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

UserProfile.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default UserProfile;
