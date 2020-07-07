import React, { Component } from 'react';
import { connect } from "react-redux";
import SimpleReactValidator from 'simple-react-validator';

import { resetSuccess } from '../../actions/OrderAction';
import { getCurrentUser } from '../../reducers/RegistrationReducer';
import { getOrder } from '../../reducers/OrderReducer';

import Pallet from './Pallet';

const initialState = {
  billing: {
    address: '',
    city: '',
    state: 'gujarat',
    country: 'india',
    zipCode: '',
    phone: '',
    email: '',
  }
}

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator({
      messages: {
        required: 'This is the required field'
      },
      element: message => <div className="error-message">{message}</div>,
      validators: {
        array_required: {
          message: 'This is the required field',
          rule: (value) => {
            return value && value.length > 0;
          }
        },
      },
    });
  }

  state = initialState;

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      billing: {
        ...prevState.billing,
        email: nextProps.currentUser.email,
      },
      plugin: nextProps.order,
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetSuccess());
  }

  onFieldChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      billing: {
        ...this.state.billing,
        [name]: value
      }
    });
  }

  render() {
    const { order } = this.props;
    return (
      <div className="container">
        <div className="main-content checkout-wrap">
          <div className="page-title">
            <h2 className="m-0">Checkout</h2>
          </div>
          <form _lpchecked="1">
            <div className="row">
              <div className="col-md-8">
                <div className="details-check">
                  <div className="customers-details">
                    <div className="column1">
                      <div className="billing-details">
                        <h3>Billing details</h3>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label htmlFor="address" className="bmd-label-static">Address<span>*</span></label>
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              onChange={this.onFieldChange}
                              value={this.state.billing.address}
                            />
                            {this.validator.message('address', this.state.billing.address, 'required')}
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="city" className="bmd-label-static">Town / City<span>*</span></label>
                            <input
                              type="text"
                              className="form-control"
                              name="city"
                              onChange={this.onFieldChange}
                              value={this.state.billing.city}
                            />
                            {this.validator.message('city', this.state.billing.city, 'required')}
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="state" className="bmd-label-static">State<span>*</span></label>
                            <select
                              className="form-control"
                              name="state"
                              onChange={this.onFieldChange}
                              value={this.state.billing.state}
                            >
                              <option value="gujarat">Gujarat</option>
                              <option value="delhi">delhi</option>
                            </select>
                            {this.validator.message('state', this.state.billing.state, 'required')}
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="country" className="bmd-label-static">Country<span>*</span></label>
                            <select
                              className="form-control"
                              name="country"
                              onChange={this.onFieldChange}
                              value={this.state.billing.country}
                            >
                              <option value="india">India</option>
                              <option value="uk">uk</option>
                            </select>
                            {this.validator.message('country', this.state.billing.country, 'required')}
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="zipCode" className="bmd-label-static">Postcode / ZIP<span>*</span></label>
                            <input
                              type="text"
                              className="form-control"
                              name="zipCode"
                              onChange={this.onFieldChange}
                              value={this.state.billing.zipCode}
                            />
                            {this.validator.message('zipCode', this.state.billing.zipCode, 'required')}
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="phone" className="bmd-label-static">Phone<span>*</span></label>
                            <input
                              type="tel"
                              className="form-control"
                              name="phone"
                              onChange={this.onFieldChange}
                              value={this.state.billing.phone}
                            />
                            {this.validator.message('phone', this.state.billing.phone, 'required')}
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="email" className="bmd-label-static">Email<span>*</span></label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              onChange={this.onFieldChange}
                              value={this.state.billing.email}
                            />
                            {this.validator.message('email', this.state.billing.email, 'required')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <Pallet
                  title="Your Orders"
                  order={{
                    ...this.state.billing,
                    pluginDetail: {...order},
                  }}
                  btnDisabled={this.validator.allValid()}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: getOrder(state),
  currentUser: getCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);