import React, { Component } from "react";
import { connect } from "react-redux";
import Siderbar from './Sidebar';
import DeveloperRatings from './Shared/DeveloperRatings';
import ProductCard from '../Shared/ProductCard';

import { getTopPluginRequest } from '../../actions/PluginActions';
import { getTopPlugins } from '../../reducers/PluginReducer';

class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch(getTopPluginRequest());
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
            <div className="dashboard">
              <div className="page-title">
                <h4>Reputation Matrics and Ratings</h4>
              </div>
              <DeveloperRatings />
              <div className="top-repositories-wrap">
                <div className="sec-title">
                  <h4>Top Five Products</h4>
                </div>
                <div className="reposi-list plugin-card-wrap">
                  <div className="row">
                    {plugins &&
                      plugins.map((plugin) => (
                        <ProductCard plugin={plugin} key={plugin.title} />
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  plugins: getTopPlugins(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);