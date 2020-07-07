import React from "react";
import PaypalBtn from 'react-paypal-checkout';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { addOrder } from '../../actions/OrderAction';
import { getOrderSuccess } from '../../reducers/OrderReducer';

const CLIENT = {
  sandbox: "AQjyOG5y9hz-B2i6511bQZh_Mo7mHHKB33Xbn_G9mn1KAEZB2T-PBI7xhA3k0cl9_15-sog7Iv9ECU3e",
  production: "your client id"
};


class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentFailedMsg: '',
    };
  }
  render() {
    const onSuccess = (payment) => {
      // Congratulation, it came here means everything's fine!
      
      const orderData = {
        payerID: payment.payerID,
        paymentID: payment.paymentID,
        payerEmail: payment.email,
        total: this.props.orderDetail.pluginDetail.price,
        pluginName: this.props.orderDetail.pluginDetail.title,
        ...this.props.orderDetail,
      }

      this.props.dispatch(addOrder(orderData)).then(
        () => this.props.history.push('/purchased-products')
      );
      
    }

    const onCancel = (data) => {
      // User pressed "cancel" or close Paypal's popup!
      console.log('The payment was cancelled!', data);
      this.setState({
        paymentFailedMsg: 'The payment was cancelled!'
      })
    }

    const onError = (err) => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      console.log("Error!", err);
      this.setState({
        paymentFailedMsg: 'error in load script'
      })
    }

    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'USD'; // or you can set this value from your props or state  
    let total = this.props.amount;  // same as above, this is the total amount (based on currency) to be 
    let locale = 'en_US';
    let style = {
      'label': 'checkout',
      'tagline': false,
      'size': 'responsive',
      'shape': 'rect',
      'color': 'blue'
    };
    return (
      <>
        <PaypalBtn
          env={env}
          client={CLIENT}
          currency={currency}
          total={total}
          locale={locale}
          style={style}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
        {this.state.paymentFailedMsg &&
          <div className="error">{this.state.paymentFailedMsg}</div>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  success: getOrderSuccess(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaypalButton));