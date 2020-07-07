import React from "react";
import ReactTooltip from "react-tooltip";


const Tooltip = () => {
  return (
    <div>
      <a data-tip data-for="dark" data-place="right">
        <i className="fa fa-question-circle"></i>
      </a>
      <ReactTooltip id="dark" type="dark" effect="solid" style={{ maxWidth: '100px' }}>
        <p style={{ backgroundColor: 'inherit' }}>{`
            (i) Developer Overall Reputation (t-index):
            The maximum value of t such that a
            developer has created at least
            t repositories that have a
            repository rating of 25
          `}
        </p>
        <p style={{ backgroundColor: 'inherit' }}>
          (ii) Repository Reputation Score:.
          Formula: 0.5 x average_rating_of_repository* log(num_total_transactions_repository)
          Note: log is base 10
          </p>
      </ReactTooltip>
    </div>

  )
}

export default Tooltip;