import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { isEqual } from 'lodash';

const pages = [
  {
    slug: 'dashboard',
    name: 'Dashboard'
  },
  {
    slug: 'purchased-products',
    name: 'Purchased Products'
  },
  {
    slug: 'saved-products',
    name: 'Saved Tensor Products'
  },
  {
    slug: 'my-products',
    name: 'My Products'
  },
  {
    slug: 'upload-new-product',
    name: 'Upload New Product'
  },
  {
    slug: 'change-password',
    name: 'Change Password'
  }
];

class Sidebar extends Component {

  splitUrl = () => this.props.location.pathname.split('/').filter(Boolean);

  render() {
    const currentRootPage = this.splitUrl()[0];
    return (
      <div className="side-bar">
        <ul>
          {pages.map((page) => {
            const isActive = isEqual(currentRootPage, page.slug);
            return (
              <li key={page.slug}>
                <Link
                  to={`/${page.slug}`}
                  key={page.slug}
                  className={`${isActive ? 'active' : ''}`}
                >
                  {page.name}
                </Link>
              </li>
            )}
          )}
        </ul>
      </div>
    )
  }
}

export default withRouter(Sidebar);
