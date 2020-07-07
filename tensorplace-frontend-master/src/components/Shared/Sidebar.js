import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <>
        <div className="plugin-filter-wraper">
          <div id="accordion" className="accordion">
            <div className="card-header collapsed" data-toggle="collapse" href="#collapseOne" aria-expanded="true">
              <a className="card-title"> Tags </a>
            </div>
            <div id="collapseOne" className="collapse show" data-parent="#accordion">
              <div className="card-body">
                <form className="mb-0">
                  <span className="bmd-form-group is-filled">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span className="checkbox-decorator">
                          <span className="check"></span>
                        </span> Tags window
                      </label>
                    </div></span>
                  <span className="bmd-form-group"><div className="checkbox">
                    <label>
                      <input type="checkbox" value="" />
                      <span className="checkbox-decorator">
                        <span className="check"></span>
                      </span>
                      Test
                    </label>
                  </div></span>
                  <span className="bmd-form-group"><div className="checkbox">
                    <label>
                      <input type="checkbox" value="" />
                      <span className="checkbox-decorator">
                        <span className="check"></span>
                      </span>
                      Test
                    </label>
                  </div></span>
                </form>
              </div>
            </div>
            <div className="card-header collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true">
              <a className="card-title"> Ratings </a>
            </div>
            <div id="collapseTwo" className="collapse show" data-parent="#accordion">
              <div className="card-body">
                <form className="mb-0">
                  <span className="bmd-form-group is-filled">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span className="checkbox-decorator">
                          <span className="check"></span>
                        </span>
                        4★ &amp; above
                      </label>
                    </div>
                  </span>
                  <span className="bmd-form-group is-filled">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span className="checkbox-decorator">
                          <span className="check"></span>
                        </span>
                        3★ &amp; above
                      </label>
                    </div>
                  </span>
                  <span className="bmd-form-group is-filled">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span className="checkbox-decorator">
                          <span className="check"></span>
                        </span>
                        2★ &amp; above
                      </label>
                    </div>
                  </span>
                  <span className="bmd-form-group is-filled">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" />
                        <span className="checkbox-decorator">
                          <span className="check"></span>
                        </span>
                        1★ &amp; above
                      </label>
                    </div>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Sidebar;