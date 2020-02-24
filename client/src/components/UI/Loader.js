import React from "react";
import { Icon, Modal } from "./";

const Loader = () => {
  return (
    <Modal id="loader" show={true}>
      <div className="loader">
        <Icon name="spinner" viewBox="0 0 50 50" />
      </div>
    </Modal>
  );
};

export default Loader;
