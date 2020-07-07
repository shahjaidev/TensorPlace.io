import React from 'react';
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import Reviews from '../Shared/Reviews';
import Reputations from '../Shared/Reputation';
import Tooltip from '../Shared/Tooltip';

import { formatPrice, countTotalRating } from '../../util/common';

import pluginIcon from '../../assets/images/plugin-icon.png';

const ProductCard = (props) => {
  const { plugin, col, isEdit, loggedIn } = props;
  return (
    <div className={`col-lg-${col || 6} col-md-6 col-sm-6`}>
      <div className="card product-card">
        <div className="card-body">
          <div className="card-top d-flex align-items-top">
            <div className="card-img">
              <img src={plugin.image || pluginIcon} alt="plugin" />
            </div>
            <div className="card-content">
              <div className="card-content-header d-flex align-items-center justify-content-between">
                <div className="plugin-info">
                  <h2 className="card-title">
                    <Link to={`/product/${plugin.slug}`}>{plugin.title}</Link>
                  </h2>
                  <div className="rating d-flex align-items-center">
                    <Reviews rate={countTotalRating(plugin.reviews || 0)} />
                    <div className="rating-count">
                      (<Link to="">{(plugin.reviews && plugin.reviews.length) || 0}</Link>)
                    </div>
                  </div>
                  <div className="reputation d-flex align-items-center">
                    <p>Reputation
                      <span style={{ paddingLeft: '5px' }}>{(plugin.user && Reputations[plugin.user.userName] && Reputations[plugin.user.userName].reputation) || 1}</span>
                    </p>
                    <div style={{ marginLeft: '10px' }}>
                      <Tooltip />
                    </div>
                  </div>
                </div>
                <div className="plugin-price">
                  {(plugin.price && plugin.price > 0) ?
                    <p>{formatPrice(plugin.price)}</p>
                    :
                    <p className="free">Free</p>
                  }
                </div>
              </div>
              <p>{plugin.shortDesc}</p>
              <div className="tags-wrap d-flex align-items-center">
                <h6 className="tag-title">Tags:</h6>
                <ul className="p-0 m-0">
                  {plugin.language.map((tag, i) => (
                    <li key={i}><Link to="">{tag}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <ul className="m-0 p-0">
              <li className="d-flex align-items-center">
                <i className="fa fa-user-circle-o"></i>
                <h5 className="m-0">{plugin.user.userName}</h5>
              </li>
              <li className="d-flex align-items-center">
                <i className="fa fa-download"></i>
                <h5 className="m-0">{plugin.purchaseCount || 0}+ Purchased</h5>
              </li>
            </ul>
            <div className="product-action">
              {(isEdit && loggedIn) &&
                <Link to={`product/${plugin.slug}/edit`}><i className="fa fa-edit"></i></Link>
              }
              <div className="view-link">
                <Link to={`product/${plugin.slug}`}><i className="fa fa-long-arrow-right"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

ProductCard.defaultProps = {
  isEdit: false,
  loggedIn: false,
}

export default ProductCard;
