import React, { Component } from "react";
import { connect } from "react-redux";
import Siderbar from './Sidebar';
import ProductCard from '../Shared/ProductCard';

import { getUserPluginRequest } from '../../actions/PluginActions';
import { getUserPlugins } from '../../reducers/PluginReducer';
import {
  getUserLogin,
} from '../../reducers/RegistrationReducer';

class MyPlugin extends Component {
  componentDidMount() {
    this.props.dispatch(getUserPluginRequest());
  }
  render() {
    const { plugins } = this.props;
    return (
      <>
        <div className="row">
          <div className="col-md-4 col-lg-3 mb-4">
            <Siderbar />
          </div>
          <div className="col-md-8 col-lg-9">
            <div className="plugin-card-wrap">
              <div className="page-title">
                <h4>My Products</h4>
              </div>
              <div className="row">
                {(plugins && plugins.length > 0) ?
                  plugins.map((plugin) => (
                    <ProductCard
                      plugin={plugin}
                      key={plugin.title}
                      isEdit
                      loggedIn
                    />
                  ))
                  :
                  <div className="col-lg-9">
                    <div className="card no-found">
                      No Product Uploaded yet
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: getUserLogin(state),
  plugins: getUserPlugins(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPlugin);