import React from 'react';
import { createPortal } from 'react-dom';
import { usePortal } from '../../hooks/';

const Portal = ({ id, children }) => {
  const target = usePortal(id);
  return createPortal(children, target);
};

const Modal = ({ children, id, show }) => {
  const showHideClassName = show ? 'modal modal-show' : 'modal';

  return (
    <Portal id={id}>
      <div className={showHideClassName}>
        <div className="modal-content">{children}</div>
      </div>
      <div className="modal-overlay"></div>
    </Portal>
  );
};

export default Modal;
