import React, { Component } from "react";
import StarRatingComponent from 'react-star-rating-component';

class Reviews extends Component {
  render() {
    return (
      <>
        <div className="rating-wrap">
          <StarRatingComponent
            name="rate1"
            editing={false}
            // renderStarIcon={() => <span className="fa fa-star"></span>}
            starCount={5}
            value={this.props.rate}
            starColor="#ffd700"
            emptyStarColor="#ddd"
            renderStarIcon={(index, value) => {
              return (
                <span>
                  <i className={index <= value ? 'fa fas fa-star' : 'fa far fa-star'} />
                </span>
              );
            }}
            // renderStarIconHalf={() => {
            //   return (
            //     <span>
            //       <span style={{position: 'absolute'}}><i className="fa far fa-star" /></span>
            //       <span><i className="fa fas fa-star-half" /></span>
            //     </span>
            //   );
            // }} 
          />
        </div>
      </>
    );
  }
}

export default Reviews;