import React, { Component } from "react";
import { connect } from "react-redux";
import Siderbar from './Sidebar';
import DeveloperRatings from './Shared/DeveloperRatings';
import ProductCard from '../Shared/ProductCard';
import products from '../../util/products.json';

class SellerDashboard extends Component {
  render() {
    return (
      <>
        <div className="page-title">
          <h4>Reputation Matrics and Ratings</h4>
        </div>
        <div className="row">
          <div className="col-md-4 col-lg-3 mb-4">
            <Siderbar />
          </div>
          <div className="col-md-8 col-lg-9">
            <div className="dashboard">
              <DeveloperRatings />
              <div className="top-repositories-wrap">
                <div class="sec-title">
                  <h4>Top Five Products</h4>
                </div>
                <div className="reposi-list plugin-card-wrap">
                  <div className="row">
                    {products &&
                      products.map((product) => (
                        <ProductCard plugin={product} key={product.slug} />
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
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerDashboard);