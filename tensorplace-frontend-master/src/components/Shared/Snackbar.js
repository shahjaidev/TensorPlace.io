
import React, { Component } from "react";

class Snackbar extends Component {
  render() {
    const { msg } = this.props;
    return (
      <>
        <div id="snackbar-container">
          <div
            className="snackbar snackbar-opened"
            data-timeout="3000"
            data-html-allowed="true"
            data-content={msg}
          >
            <span className="snackbar-content">{msg}</span>
          </div>
        </div>
      </>
    );
  }
}

export default Snackbar;