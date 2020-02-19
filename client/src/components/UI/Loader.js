import React from "react";
import Icon from "./Icon";

const Loader = () => {
  return (
    <div id="loader-wrapper" className="flxc vc">
      <div className="loader">
        <Icon name="spinner" viewBox="0 0 50 50" />
      </div>
    </div>
  );
};

export default Loader;
