import React from "react";
import LoaderSpinner from 'react-loader-spinner'

const Loader = (props) => {
  return (
    <div className="overlay active loader">
      <LoaderSpinner
        type="ThreeDots"
        color="#48BEC0"
        height={props.height || 230}
        width={props.width || 230}
      />
    </div>
  )
}

export default Loader;