import React, { Component } from 'react';
import { connect } from "react-redux";
import ProductCard from '../Shared/ProductCard';
import products from '../../util/products.json';

import { getAllPlugins } from '../../actions/PluginActions';
import { getPlugins } from '../../reducers/PluginReducer';

class ProductList extends Component {
  componentDidMount() {
    this.props.dispatch(getAllPlugins());
  }
  render() {
    const { plugins } = this.props;
    return (
      <div className="plugin-card-wrap">
        <div className="row">
          {plugins &&
            plugins.map((plugin) => (
              <ProductCard plugin={plugin} key={plugin.title} col="4" />
            ))
          }
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  plugins: getPlugins(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);