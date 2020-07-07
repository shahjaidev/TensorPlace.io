import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ReactTooltip from './Tooltip';


const CircularProgress = (props) => {
  return (
    <div className="d-flex align-items-center">
      <CircularProgressbar
        value={props.value}
        maxValue={5}
        text={props.value}
        className="progress-circle p34"
        styles={buildStyles({
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'butt',

          // Text size
          textSize: '22px',

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          pathColor: '#48BEC0',
          textColor: '#48BEC0',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}
      />
      <div style={{ marginLeft: '16px' }}>
        <ReactTooltip />
      </div>
    </div>
  )
}

export default CircularProgress;