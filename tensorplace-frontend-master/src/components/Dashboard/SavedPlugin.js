import React, { Component } from "react";
import { connect } from "react-redux";
import Siderbar from './Sidebar';
import ProductCard from '../Shared/ProductCard';
import { getSavedPlugins } from '../../actions/PluginActions';
import { getSavedPlugin } from '../../reducers/PluginReducer';

class SavedPlugin extends Component {
  componentDidMount() {
    this.props.dispatch(getSavedPlugins());
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
                <h4>Saved Tensor Products</h4>
              </div>
              <div className="row">
                {(plugins && plugins.length > 0) ?
                  plugins.map((plugin) => (
                    <ProductCard plugin={plugin} key={plugin.title} />
                  ))
                  :
                  <div className="col-lg-9">
                    <div className="card no-found">
                      No Product Saved yet
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
  plugins: getSavedPlugin(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedPlugin);