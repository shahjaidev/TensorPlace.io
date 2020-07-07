import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Loader from '../../Shared/Loader';
import Snackbar from '../../Shared/Snackbar';

import { sendPluginDeveloperEmail, resetSuccess } from '../../../actions/PluginActions';
import { getSuccess } from '../../../reducers/PluginReducer';
import { getLoading } from '../../../reducers/ApiReducer';
import {
  getUserLogin,
} from '../../../reducers/RegistrationReducer';

const initialState = {
  developerMsg: '',
}
class ContactDeveloper extends Component {
  state = {
    ...initialState
  }

  componentWillReceiveProps(nextProps) {
    const { success } = nextProps;
    if (success) {
      this.setState({ ...initialState });
      setTimeout(() => {
        this.props.dispatch(resetSuccess());
      }, 2000);
    }
  }

  onFieldChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const contactData = {
      developerMsg: this.state.developerMsg,
      title: this.props.plugin.title,
      authorEmail: this.props.plugin.user.email,
    }
    this.props.dispatch(sendPluginDeveloperEmail(contactData));
  };

  render() {
    return (
      <>
        <div id="contact-developer" className="tab-content">
          {!this.props.loggedIn ? (
            <div className="text-block my-3">
              <span>Please login to send message to developer </span>
              <Link to="/login">Login</Link>
            </div>
          ) : (
            <form className="contect-form">
              <div className="form-group">
                <label htmlFor="developer-message" className="bmd-label-static">Write message to developer:</label>
                <textarea
                  className="form-control"
                  id="developer-message"
                  rows="7"
                  name="developerMsg"
                  onChange={this.onFieldChange}
                  value={this.state.developerMsg}
                />
              </div>
              <div className="send-btn">
                <button
                  type="submit"
                  className="btn btn-primary btn-send"
                  onClick={this.onSubmit}
                  disabled={this.props.isLoading}
                >
                  Send
                </button>
                {this.props.isLoading &&
                  <Loader width="100" height="35" />
                }
              </div>
            </form>
          )}
        </div>
        {this.props.success &&
          <Snackbar msg="mail sent successfully." />
        }
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  success: getSuccess(state),
  isLoading: getLoading(state),
  loggedIn: getUserLogin(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDeveloper);
