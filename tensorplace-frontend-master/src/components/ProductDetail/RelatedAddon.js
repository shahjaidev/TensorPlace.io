import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getRelatedPlugin } from '../../reducers/PluginReducer';
import pluginIcon from '../../assets/images/plugin-icon.png';

class RelatedAddon extends Component {
  render() {
    const { title, plugins } = this.props;
    return (
      <div className="related-add-ons-wrap" >
        <h2 className="related-ttile">{title}</h2>
        {plugins &&
          <ul className="m-0 p-0">
            {plugins.map((plugin) => (
              <li className="realted-item d-flex" key={plugin.slug}>
                <div className="p-image">
                  <img src={plugin.image || pluginIcon} alt="plugin" />
                </div>
                <h4 className="title m-0">
                <Link to={`/product/${plugin.slug}`}>{plugin.title}</Link>
                </h4>
              </li>
            ))}
          </ul>
        }
      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  plugins: getRelatedPlugin(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(RelatedAddon);
