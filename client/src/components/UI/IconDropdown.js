import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Icon, InputFeedback } from './'

const IconDropdown = ({
  className,
  error,
  headerSize,
  icon,
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

  const dropdownClasses = ['icon-dropdown'].concat(className).join(" ").trim();

  return (
    <div className={dropdownClasses}>
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
      <InputFeedback error={error} />
    </div>
  );
};

export default IconDropdown;
