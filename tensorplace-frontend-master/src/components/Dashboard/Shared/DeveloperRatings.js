import React, { Component } from "react";
import { connect } from "react-redux";
import ratingIcon from '../../../assets/images/rating.png';

class DeveloperRatings extends Component {
  render() {
    return (
      <div className="developer-rating">
        <div className="row">
          <div className="col-md-5">
            <div className="rating-inner">
              <h2 className="title">Overall Developer Rating</h2>
              <div className="rating d-flex align-items-center">
                <img src={ratingIcon} alt="rating" />
                <h4 className="m-0">69.69</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperRatings);