import React from 'react';
import { formatPrice } from '../../util/common';
import PaypalButton from './PaypalButton';

const Pallet = ({ title, order, btnDisabled }) => {
  return(
  <div className="order-wrap">
    <div className="order-inner">
      <h3>{title}</h3>
      <div className="order-table">
        <table>
          <tbody>
            <tr>
              <td className="product-name">{order.pluginDetail.title}</td>
              <td className="price">{formatPrice(order.pluginDetail.price)}</td>
            </tr>
            <tr>
              <td className="total"><strong>Total</strong></td>
              <td className="total-price">{formatPrice(order.pluginDetail.price)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="order-now-btn">
        {/* <button className="btn order-now">Order Now</button> */}
        <PaypalButton
          amount={parseInt(order.pluginDetail.price)}
          btnDisabled={btnDisabled}
          orderDetail={order}
        />
      </div>
    </div>
  </div>
)};

export default Pallet;
