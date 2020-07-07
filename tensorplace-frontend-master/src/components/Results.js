import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from 'lodash';
import InputRange from 'react-input-range';
import { Link } from "react-router-dom";

import ProductDetail from './Shared/ProductDetail';
import Reviews from './Shared/Reviews';

import languages from './Dashboard/UploadNewRepo/languages';
import codebase from './Dashboard/UploadNewRepo/typeOfCodebase';
import { priceRangeDropdown, countTotalRating } from '../util/common';

import { searchPluginRequest, getPluginRequest } from '../actions/PluginActions';
import { getSearchPlugin, getPluginDetail } from '../reducers/PluginReducer';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      results: [],
      plugin: {},
      selectedPlugin: '',
      codebaseFilter: '',
      languageFilter: '',
      priceFilter: '',
      ratingFilter: '',
    };
  }

  getSearchParam = () => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var term = url.searchParams.get("search");
    if (term) {
      this.setState({
        search: term.replace(/\s+/g, '-').toLowerCase()
      }, () => (
        this.updateResult(this.state)
      ));
    }
  }

  componentDidMount() {
    this.getSearchParam();
    priceRangeDropdown();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.getSearchParam();
    }
    if (this.props.results !== nextProps.results) {
      setTimeout(() => {
        const pluginList = document.querySelectorAll('.filter-results ul li');
        if (pluginList.length > 0) {
          pluginList[0].click();
        }
      });
    }
    this.setState({ results: nextProps.results, plugin: nextProps.plugin });
  }

  updateResult = (state) => {
    this.props.dispatch(searchPluginRequest(state))
  }

  filterResults = () => {
    this.updateResult(this.state);
    let inputRangeWrapper = document.getElementsByClassName('input-range');
    if(inputRangeWrapper) {
      inputRangeWrapper[0].classList.remove('d-block');
    }
  }

  handleFilter = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleClick = (slug) => {
    this.props.dispatch(getPluginRequest(slug));
    this.setState({ selectedPlugin: slug });
  }

  render() {
    const { results, plugin } = this.state;
    return (
      <>
        <div className="container">
          <div className="main-content trending">
            <div className="search-title">
              <h2>Search Results: <span>“{this.state.search}”</span></h2>
            </div>
            <div className="trending-filter-main">
              <div className="hzfilterwrap d-flex">
                <ul className="filter-wrap m-0 p-0">
                  <li>
                    <select
                      className="custom-select custom-select-lg"
                      onChange={this.handleFilter}
                      value={this.state.codebaseFilter}
                      name="codebaseFilter"
                    >
                      <option value=''>Codebase</option>
                      {
                        codebase.map(item => (
                          <option value={item.name} key={item.name}>{item.label}</option>
                        ))
                      }
                    </select>
                  </li>
                  <li>
                    <select
                      className="custom-select custom-select-lg"
                      onChange={this.handleFilter}
                      value={this.state.languageFilter}
                      name="languageFilter"
                    >
                      <option value=''>Language</option>
                      {
                        languages.map(item => (
                          <option value={item.name} key={item.name}>{item.label}</option>
                        ))
                      }
                    </select>
                  </li>
                  <li>
                    <div className="price-range">
                      <label>Price slider</label>
                    </div>
                    <InputRange
                      maxValue={200}
                      minValue={0}
                      value={this.state.priceFilter}
                      onChange={value => this.setState({ priceFilter: value })}
                    />
                  </li>
                  <li>
                    <select
                      className="custom-select custom-select-lg"
                      onChange={this.handleFilter}
                      value={this.state.ratingFilter}
                      name="ratingFilter"
                    >
                      <option value=''>Ratings</option>
                      <option value="4"> 4★ &amp; above</option>
                      <option value="3"> 3★ &amp; above</option>
                      <option value="2"> 2★ &amp; above</option>
                      <option value="1"> 1★ &amp; above</option>
                    </select>
                  </li>
                </ul>
                <div className="filter-btn">
                  <button
                    className="btn m-0"
                    htmlFor="search"
                    data-toggle="collapse"
                    data-target="#collapse-search"
                    aria-expanded="false" aria-controls="collapse-search"
                    onClick={this.filterResults}
                  >
                    Filter
                  </button>
                </div>
              </div>
              <div className="filter-results-wrap">
                <div className="inner-wrap">
                  <div className="row">
                    <div className="col-md-4 filter-results-outer">
                      <div className="filter-results">
                        <h2 className="title">Results</h2>
                        {(results && results.length > 0) ? (
                          <ul className="m-0 p-0">
                            {results.map((plugin) => (
                              <li
                                className={`fl ${this.state.selectedPlugin === plugin.slug ? 'active' : ''}`}
                                onClick={() => this.handleClick(plugin.slug)}
                                key={plugin.slug}
                              >
                                <div className="box d-flex">
                                  <div className="logo-wrap">
                                    <img src={plugin.image} alt="product" />
                                  </div>
                                  <div className="content">
                                    <h3 className="employer-name m-0">{plugin.title}</h3>
                                    <div className="rating d-flex align-items-center">
                                      <Reviews rate={countTotalRating(plugin.reviews || 0)} />
                                      <div className="rating-count">
                                        (<Link to={`/product/${plugin.slug}`}>{(plugin.reviews && plugin.reviews.length) || 0}</Link>)
                                      </div>
                                    </div>
                                    {/* <div className="rating d-flex">
                                      <Reviews rate={countTotalRating(plugin.reviews || 0)} />
                                      <p className="m-0">4.4</p>
                                    </div> */}
                                    <p>{plugin.shortDesc}</p>
                                    <span className="location">Ahmedabad</span>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>) : (
                            <div className="no-result">
                              No Result found
                            </div>
                          )
                        }
                      </div>
                    </div>
                    <div className="col-md-8 result-detail-view">
                      {!isEmpty(plugin) &&
                        <ProductDetail plugin={plugin} />
                      }
                    </div>
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
  results: getSearchPlugin(state),
  plugin: getPluginDetail(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);