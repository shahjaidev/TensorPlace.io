import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { formatPrice, formateNumber } from '../../util/common';
import Siderbar from './Sidebar';

import { getOrdersRequest } from '../../actions/OrderAction';
import { getOrders } from '../../reducers/OrderReducer';

class PurchasedPlugin extends Component {
  componentDidMount() {
    this.props.dispatch(getOrdersRequest());
  }
  render() {
    const { orders } = this.props;
    return (
      <>
        <div className="row">
          <div className="col-md-4 col-lg-3 mb-4">
            <Siderbar />
          </div>
          <div className="col-md-8 col-lg-9">
            <div className="plugin-card-wrap">
              <div className="page-title">
                <h4>Purchased Products</h4>
              </div>
              <div className="card">
                <div className="card-body">
                  {(orders && orders.length > 0) ? (
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Order Id</th>
                            <th>Name of repository</th>
                            <th>Developer Name</th>
                            <th>URL</th>
                            <th>Amount</th>
                            <th>Review</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order, i) => (
                            <tr>
                              <td>{formateNumber(i+1)}</td>
                              <td>{order.plugin.title}</td>
                              <td>{order.plugin.user.userName}</td>
                              <td>
                                <a
                                  href={order.plugin.githubRepoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Download
                                </a>
                              </td>
                              <td>{formatPrice(order.total)}</td>
                              <td><Link to={`product/${order.plugin.slug}`}>Write a review</Link></td>
                            </tr>
                          ))
                          }
                        </tbody>
                      </table>
                    </div>
                  ) : (
                      <div className="col-lg-9">
                        <div className="no-found">
                          No Product Purchased yet
                      </div>
                      </div>
                    )}
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
  orders: getOrders(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchasedPlugin);