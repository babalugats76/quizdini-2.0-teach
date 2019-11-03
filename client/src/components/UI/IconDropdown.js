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
    <React.Fragment>
      <Header as={headerSize} icon textAlign="center">
        <Icon name={icon} />
        {label}
      </Header>
      <Dropdown
        id={name}
        name={name}
        options={options}
        value={value}
        error={!!error}
        onChange={(event, data) => onChange(event, data)}
        {...props}
      />
      <InputFeedback error={error} />
    </React.Fragment>
  );
};

export default IconDropdown;
