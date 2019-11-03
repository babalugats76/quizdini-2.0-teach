import React from 'react';
import Icon from './Icon';

const Toolbar = ({ buttons, className, ...props }) => {
  const btns = buttons.map((btn, idx) => {
    const { icon, tooltip, onClick, ...props } = btn;
    return (
      <button
        key={idx}
        title={tooltip}
        onClick={onClick}
        tabIndex={-1}
        {...props}
      >
        <Icon name={icon} {...props} />
      </button>
    );
  });

  return <div className={className}>{btns}</div>;
};

export default Toolbar;
