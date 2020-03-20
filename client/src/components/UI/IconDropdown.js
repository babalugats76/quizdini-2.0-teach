import React from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import InputFeedback from './InputFeedback';
import Icon from './Icon';

const IconDropdown = ({
  error,
  headerSize,
  icon,
  label,
  name,
  options,
  setFieldValue,
  value,
  ...props
}) => {
  const onChange = (event, data) => {
    event.preventDefault();
    setFieldValue(name, data.value);
  };

  return (
    <div className="icon-dropdown">
      <Icon name={icon} />
      <Dropdown
        error={!!error}
        id={name}
        name={name}
        onChange={(event, data) => onChange(event, data)}
        options={options}
        value={value}
        {...props}
      />
      <label>{label}</label>
      <InputFeedback error={error} />
    </div>
  );
};

export default IconDropdown;
