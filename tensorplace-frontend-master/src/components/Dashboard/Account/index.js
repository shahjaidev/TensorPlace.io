import React, { Component } from "react";
import { bool, shape, func } from 'prop-types';
import { connect } from "react-redux";
import { isEmpty } from 'lodash';
import Siderbar from '../Sidebar';
import Snackbar from '../../Shared/Snackbar';

import {
  updateProfileRequest, resetSuccess,
} from '../../../actions/RegistrationActions'
import {
  getUserErrors,
  getSuccess,
  getCurrentUser,
} from '../../../reducers/RegistrationReducer';
import { getLoading } from '../../../reducers/ApiReducer';

const initialState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    githubId: '',
    profileImg: '',
    githubToken: '',
    imagePreviewUrl: '',
  },
  dataPopulated: false,
  userErrors: {},
}

class Account extends Component {
  state = {
    ...initialState,
  }

  componentDidMount() {
    this.populateUser();
  }

  componentDidUpdate() {
    this.populateUser();
  }

  componentWillReceiveProps(nextProps) {
    const { success, userErrors } = nextProps;
    if (userErrors) {
      this.setState({
        userErrors: nextProps.userErrors
      });
    }
    if (success) {
      setTimeout(() => {
        this.props.dispatch(resetSuccess());
        this.setState({ ...initialState });
      }, 2000);
    }
  }

  populateUser = () => {
    let user = this.props.currentUser ? this.props.currentUser : null;
    
    if (!this.state.dataPopulated && !isEmpty(user.email)) {
      this.setState({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          githubId: user.githubId,
          githubToken: user.githubToken,
          imagePreviewUrl: user.profileImg,
        },
        dataPopulated: true,
      });
    }
  }

  onFieldChange = (fieldName, str) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [fieldName]: str,
      },
    });
  };

  fileSelection = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        user: {
          ...this.state.user,
          profileImg: file,
          imagePreviewUrl: reader.result
        }
      });
    }
    if(file) {
      reader.readAsDataURL(file)
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { profileImg, imagePreviewUrl, ...rest } = this.state.user;
    const formData = new FormData();
    formData.append("data", JSON.stringify(rest));
    if(profileImg) {
      formData.append("file", profileImg);
    }
    this.props.dispatch(updateProfileRequest(formData));
  };

  render() {
    const { userErrors } = this.state;
    return (
      <>
        <div className="row">
          <div className="col-md-4 col-lg-3 mb-4">
            <Siderbar />
          </div>
          <div className="col-md-8 col-lg-9">
            <div className="plugin-card-wrap account-form">
              <div className="page-title">
                <h4>Account</h4>
              </div>
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="form-group bmd-form-group m-0">
                      <label htmlFor="firstName" className="bmd-label-static">First Name</label>
                      <input
                        type="text"
                        onChange={(e) => this.onFieldChange(e.target.name, e.target.value)}
                        value={this.state.user.firstName}
                        className="form-control"
                        name="firstName"
                        placeholder="First Name"
                      />
                      <span className="error">{userErrors.firstName}</span>
                    </div>
                    <div className="form-group bmd-form-group m-0">
                      <label htmlFor="lastName" className="bmd-label-static">Last Name</label>
                      <input
                        type="text"
                        onChange={(e) => this.onFieldChange(e.target.name, e.target.value)}
                        value={this.state.user.lastName}
                        className="form-control"
                        name="lastName"
                        placeholder="Last name"
                      />
                      <span className="error">{userErrors.lastName}</span>
                    </div>
                    <div className="form-group bmd-form-group m-0">
                      <label htmlFor="email" className="bmd-label-static">E-mail ID</label>
                      <input
                        type="email"
                        onChange={(e) => this.onFieldChange(e.target.name, e.target.value)}
                        value={this.state.user.email}
                        className="form-control"
                        name="email"
                        placeholder="Email Address"
                      />
                      <span className="error">{userErrors.email}</span>
                    </div>
                    <div className="form-group bmd-form-group m-0">
                      <label htmlFor="githubId" className="bmd-label-static">Github User ID</label>
                      <input
                        type="text"
                        onChange={(e) => this.onFieldChange(e.target.name, e.target.value)}
                        value={this.state.user.githubId}
                        className="form-control"
                        name="githubId"
                        placeholder="Github User ID"
                      />
                      <span className="error">{userErrors.githubId}</span>
                    </div>
                    <div className="form-group bmd-form-group m-0">
                      <label htmlFor="githubToken" className="bmd-label-static">Github Token</label>
                      <input
                        type="text"
                        onChange={(e) => this.onFieldChange(e.target.name, e.target.value)}
                        value={this.state.user.githubToken}
                        className="form-control"
                        name="githubToken"
                        placeholder="Github Token"
                      />
                      <span className="error">{userErrors.githubId}</span>
                    </div>
                    <div className="file-upload-wraper">
                      <label htmlFor="image" className="bmd-label-floating">Upload Picture</label>
                      <div className="upload-img">
                        <div className="image">
                          <img src={this.state.user.imagePreviewUrl} alt="" />
                        </div>
                        <div className="botton">
                          <input
                            className="files"
                            type="file"
                            onChange={(e) => this.fileSelection(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary update" onClick={this.onSubmit}>Update</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {this.props.success &&
            <Snackbar msg="Profile Update successfully" />
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userErrors: getUserErrors(state),
  success: getSuccess(state),
  isLoading: getLoading(state),
  currentUser: getCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

Account.propTypes = {
  dispatch: func.isRequired,
  userErrors: shape({}).isRequired,
  success: bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);