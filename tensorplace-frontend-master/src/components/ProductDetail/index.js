import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Reviews from '../Shared/Reviews';
import CircularProgressbar from '../Shared/CircularProgressbar';
import Reputations from '../Shared/Reputation';

import Snackbar from '../Shared/Snackbar';
import { session } from '../../util/session';
import { countTotalRating } from '../../util/common';

import RelatedAddon from './RelatedAddon';
import ProductTabs from './ProductTabs';

import {
  getPluginRequest,
  savePlugin,
  removePlugin,
  resetSuccess,
  getRelatedPluginRequest,
  getPluginReviews,
  addPluginReview,
} from '../../actions/PluginActions';

import { saveOrderInSession } from '../../actions/OrderAction';
import {
  getPluginDetail,
  getSuccess,
  getSavedPlugin
} from '../../reducers/PluginReducer';

import {
  getUserLogin,
} from '../../reducers/RegistrationReducer';

import { $mountTabs, arrayOfSlug, formatPrice } from '../../util/common';

import pluginIcon from '../../assets/images/plugin-icon.png';

class ProductDetail extends Component {
  state = {
    productUpdateMsg: '',
    success: false,
  }

  getPlugin = (slug) => {
    this.props.dispatch(getPluginRequest(slug));
    this.props.dispatch(getRelatedPluginRequest(slug));
    this.props.dispatch(getPluginReviews(slug));
  }
  componentDidMount() {
    $mountTabs();
    this.getPlugin(this.props.match.params.slug);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.slug !== this.props.match.params.slug) {
      this.getPlugin(nextProps.match.params.slug);
    }
  }

  handleCheckoutClick = (plugin) => {
    if(this.props.loggedIn) {
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
    if(this.props.loggedIn) {
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
    if(savedPlugin) {
      const savedPlugins = arrayOfSlug(savedPlugin);
      return savedPlugins.includes(slug);
    }
    return null; 
  }

  handleAddReview = (e, review) => {
    e.preventDefault();
    this.props.dispatch(addPluginReview({
      ...review,
      slug: this.props.slug,
    }))
  }

  render() {
    const { plugin, savedPlugin } = this.props;
    return (
      <div className="container">
        <div className="main-content plugin-detail-wrap">
          <div className="detail-inner-wrap">
            <div className="pluging-header d-flex">
              <div className="plugin-thubnail">
                <img src={plugin.image || pluginIcon} alt="plugin-icon" />
              </div>
              <div className="plugin-info d-flex justify-content-between">
                <div className="title">
                  <h2>{plugin.title}</h2>
                  <p>By <a href="#">{plugin.user && plugin.user.userName}</a></p>
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
                <div className="actions text-right d-flex justify-content-end">
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
            </div>
            <div className="plugin-detail">
              <div className="row">
                <div className="col-md-9">
                  <ProductTabs {...plugin} />
                </div>
                <div className="col-md-3">
                  <RelatedAddon
                    title="Other Products"
                  />
                </div>
              </div>
            </div>
          </div>
          {this.state.success &&
            <Snackbar
              msg={this.state.productUpdateMsg}
            />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: getUserLogin(state),
  plugin: getPluginDetail(state),
  success: getSuccess(state),
  savedPlugin: getSavedPlugin(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);