import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { $mountTabs, arrayOfSlug, formatPrice, countTotalRating } from '../../util/common';
import { session } from '../../util/session';
import Reputations from '../Shared/Reputation';

import CircularProgressbar from '../Shared/CircularProgressbar';
import Reviews from '../Shared/Reviews';
import Snackbar from '../Shared/Snackbar';
import ProductTabs from '../ProductDetail/ProductTabs';

import { saveOrderInSession } from '../../actions/OrderAction';
import {
  savePlugin,
  removePlugin,
  resetSuccess
} from '../../actions/PluginActions';
import {
  getSuccess,
  getSavedPlugin
} from '../../reducers/PluginReducer';
import {
  getUserLogin,
} from '../../reducers/RegistrationReducer';

class ProductDetail extends Component {
  state = {
    productUpdateMsg: '',
    success: false,
  }
  componentDidMount() {
    $mountTabs();
  }

  handleCheckoutClick = (plugin) => {
    if (this.props.loggedIn) {
      session.setOrder(plugin);
      this.props.dispatch(saveOrderInSession(plugin));
      this.props.history.push('/checkout');
    } else {
      this.setPluginUpdateMsg('Login require to purchase plugin');
    }
  }

  resetSuccess = () => {
    setTimeout(() => {
      this.props.dispatch(resetSuccess());
      this.setState({ success: false });
    }, 1800);
  }

  setPluginUpdateMsg = (msg) => {
    this.setState({
      productUpdateMsg: msg,
      success: true
    });
    this.resetSuccess();
  }

  savedPlugin = (slug) => {
    if (this.props.loggedIn) {
      this.props.dispatch(savePlugin({ 'slug': slug }));
      this.setPluginUpdateMsg('Saved successfully');
    } else {
      this.setPluginUpdateMsg('Login require to save plugin');
    }
  }

  removePlugin = (slug) => {
    this.props.dispatch(removePlugin({ 'slug': slug }));
    this.setPluginUpdateMsg('Unsave successfully');
  }

  checkSaved = (slug, savedPlugin) => {
    if (savedPlugin) {
      const savedPlugins = arrayOfSlug(savedPlugin);
      return savedPlugins.includes(slug);
    }
    return null;
  }

  render() {
    const { plugin, savedPlugin } = this.props;
    return (
      <div className="detail-view-inner">
        <div className="detail-top d-flex justify-content-between">
          <div className="content">
            <h3 className="employer-name m-0">{plugin.title}</h3>
            <div className="rating d-flex align-items-center">
              <Reviews rate={
                (plugin.reviews && plugin.reviews.length > 0) ? countTotalRating(plugin.reviews) : 0
              }
              />
              <div className="rating-count">
                (<Link to="#">{(plugin.reviews && plugin.reviews.length) || 0}</Link>)
                    </div>
            </div>
            <div className="reputation d-flex align-items-center">
              <CircularProgressbar
                value={(plugin.user && Reputations[plugin.user.userName] && Reputations[plugin.user.userName].reputation) || 1} />
            </div>
          </div>
          <div className="actions d-flex">
            <p className="plugin-price">{plugin.price > 0 ? formatPrice(plugin.price) : 'Free'}</p>
            {this.checkSaved(plugin.slug, savedPlugin) ? (
              <button
                className="btn save"
                onClick={() => this.removePlugin(plugin.slug)}
              >
                <i className="fa fa-heart-o"></i>Unsave
              </button>
            ) : (
                <button
                  className="btn save"
                  onClick={() => this.savedPlugin(plugin.slug)}
                >
                  <i className="fa fa-heart-o"></i>Save
                </button>
              )}
            {plugin.price > 0 ?
              <button className="btn buy-now" onClick={() => this.handleCheckoutClick(plugin)}>Buy Now<div className="ripple-container"></div></button>
              :
              <a rel="noopener noreferrer" target="_blank" href={plugin.githubRepoUrl} className="btn buy-now">Buy Now</a>
            }
          </div>
        </div>
        <div className="detail-bottom-wraper">
          <ProductTabs {...plugin} />
        </div>
        {this.state.success &&
          <Snackbar
            msg={this.state.productUpdateMsg}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: getUserLogin(state),
  success: getSuccess(state),
  savedPlugin: getSavedPlugin(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetail));
