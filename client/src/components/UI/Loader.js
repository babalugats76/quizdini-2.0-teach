import React from "react";
import Icon from "./Icon";

const Loader = () => {
  return (
    <div className="d-flex flex-1 h-auto flex-justify-center flex-center-items">
      <div className="loader">
        <Icon name="spinner" viewBox="0 0 50 50" />
      </div>
    </div>
  );
};

export default Loader;
