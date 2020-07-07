import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  changeTerm = (val) => { this.setState({ search: val })};

  submit = (event) => {
    event.preventDefault();
    this.props.history.push({
      pathname: '/results',
      search: `?search=${this.state.search}`,
    })
  }

  render() {
    return (
      <>
        <form onSubmit={this.submit} className="search-wrapper">
          <span className="collapse">
            <input
              className="form-control"
              type="text"
              placeholder="Search Here..."
              name="test"
              onChange={(e) => this.changeTerm(e.target.value)}
              value={this.state.term}
            />
          </span>
          <button className="btn bmd-btn-icon">
            <i className="material-icons">search</i><span>Search</span>
            <div className="ripple-container"></div>
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));