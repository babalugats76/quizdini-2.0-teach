import React from 'react';
// eslint-disable-next-line
import { Button } from 'semantic-ui-react';
import Icon from './Icon';
// eslint-disable-next-line


const Toolbar = ({ buttons, ...props }) => {

  // Loop through metadata to create buttons
  const btns = buttons.map((btn, idx) => {
    const { icon, tooltip, onClick, ...props } = btn;
    return (
      <button 
         className="button-toolbar" 
         key={idx} 
         title={tooltip} 
         onClick={onClick} 
         tabIndex={-1} 
         {...props}>
        <Icon 
           icon={icon} 
           size={16} 
         {...props} />
      </button>);
  });

  return (
    <div className="toolbar">{btns}</div>
  );

}

export default Toolbar;