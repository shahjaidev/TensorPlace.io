import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StarRatingComponent from 'react-star-rating-component';

import Reviews from '../../Shared/Reviews';
import Snackbar from '../../Shared/Snackbar';

import { addPluginReview, resetSuccess, getPluginReviews } from '../../../actions/PluginActions';
import { getReviews, getSuccess } from '../../../reducers/PluginReducer';
import {
  getUserLogin,
} from '../../../reducers/RegistrationReducer';

import { formateDate } from '../../../util/common';
import pluginIcon from '../../../assets/images/plugin-icon.png';

const initialState = {
  review: {
    docRating: 0,
    codeRating: 0,
    devRating: 0,
    codebaseUsageDetail: '',
    reviewMsg: '',
  }
}
class ProductReviews extends Component {
  state = {
    ...initialState
  }

  componentWillReceiveProps(nextProps) {
    const { success } = nextProps;
    if (success) {
      setTimeout(() => {
        this.setState({ ...initialState });
        this.props.dispatch(resetSuccess());
      }, 2000);
    }
  }

  handleChange = (fieldName, val) => {
    this.setState({
      review: {
        ...this.state.review,
        [fieldName]: val
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch();
    this.props.dispatch(addPluginReview({
      ...this.state.review,
      slug: this.props.slug,
    })).then(() => {
      this.props.dispatch(getPluginReviews(this.props.slug));
      setTimeout(() => {
        window.scrollTo({
          top: 100,
          left: 100,
          behavior: 'smooth'
        });
      }, 500)
    })
  }

  render() {
    const { reviews, loggedIn } = this.props;
    return (
      <div id="reviews" className="tab-content">
        <h3 className="content-title">Reviews</h3>
        <div className="plugin-reviews">
          {reviews &&
            <ul>
              {reviews.map((review, i) => (
                <li className="plugin-review d-flex" key={i}>
                  <div className="review-avtar">
                    <img src={review.user.profileImg || pluginIcon} alt="user" />
                  </div>
                  <div className="review">
                    <div className="review-header">
                      <div className="header-top d-flex align-items-center">
                        <div className="ratings product-ratings">
                          <div className="rate">
                            <span>Document Rating:</span>
                            <Reviews rate={review.docRating} />
                          </div>
                          <div className="rate">
                            <span>Code Redability Rating:</span>
                            <Reviews rate={review.codeRating} />
                          </div>
                          <div className="rate">
                            <span>Developer Reachability:</span>
                            <Reviews rate={review.devRating} />
                          </div>
                        </div>
                      </div>
                      <h4 className="review-title m-0">
                        {review.reviewMsg}
                      </h4>
                    </div>
                    <div className="review-content">
                      {review.codebaseUsageDetail}
                    </div>
                    <div className="header-bottom d-flex">
                      <div className="review-author">
                        <Link to="#">{review.user.userName}</Link>
                      </div>
                      <div className="review-date">
                        {formateDate(review.date)}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          }
        </div>
        {loggedIn &&
          <div className="write-review-wrap">
            <h3 className="write-review-title"><i className="fa fa-pencil-square-o"></i>Write a View</h3>
            <div className="review-form-wrap">
              <form>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="exampleInputEmail1" className="bmd-label-static">Documentation (README)*</label>
                    <div className="rating-wrap">
                      <StarRatingComponent
                        name="docRating"
                        starCount={5}
                        renderStarIcon={() => <span className="fa fa-star"></span>}
                        value={this.state.review.docRating}
                        onStarClick={(nextValue, prevValue, name) => this.handleChange(name, nextValue)}
                        starColor="#ffd700"
                        emptyStarColor="#ddd"
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="exampleInputEmail1" className="bmd-label-static">Code Readability/ Ease of use*</label>
                    <div className="rating-wrap">
                      <StarRatingComponent
                        name="codeRating"
                        starCount={5}
                        renderStarIcon={() => <span className="fa fa-star"></span>}
                        value={this.state.review.codeRating}
                        onStarClick={(nextValue, prevValue, name) => this.handleChange(name, nextValue)}
                        starColor="#ffd700"
                        emptyStarColor="#ddd"
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="exampleInput4">Developer reachability (e.g. response to issues)</label>
                    <div className="rating-wrap">
                      <StarRatingComponent
                        name="devRating"
                        starCount={5}
                        renderStarIcon={() => <span className="fa fa-star"></span>}
                        value={this.state.review.devRating}
                        onStarClick={(nextValue, prevValue, name) => this.handleChange(name, nextValue)}
                        starColor="#ffd700"
                        emptyStarColor="#ddd"
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="exampleInput1" className="bmd-label-static">What did you use this codebase or API for? (For example: part of a larger pipeline, for a hackathon project, etc)  *</label>
                    <textarea
                      className="form-control"
                      id="exampleInputEmail1"
                      rows="3"
                      value={this.state.review.codebaseUsageDetail}
                      onChange={(e) => this.handleChange('codebaseUsageDetail', e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="general-review" className="bmd-label-static">General Review* How was your experience working with this codebase or API? How useful was it for solving your need?</label>
                    <textarea
                      className="form-control"
                      id="general-review"
                      rows="3"
                      value={this.state.review.reviewMsg}
                      onChange={(e) => this.handleChange('reviewMsg', e.target.value)}
                    />
                  </div>
                  <div className="submit-btn">
                    <button
                      type="submit"
                      className="btn btn-primary btn-raised"
                      onClick={this.handleSubmit}
                    >Submit Review</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        }
        {this.props.success &&
          <Snackbar msg="Review Addedd successfully" />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  success: getSuccess(state),
  reviews: getReviews(state),
  loggedIn: getUserLogin(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviews);
