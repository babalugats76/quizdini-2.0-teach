import React from "react";
import PropTypes from "prop-types";
import { Form, Radio } from "semantic-ui-react";

const MyRadioGroup = props => {
  const { name, value, options, onChange, inline, ...rest } = props;

  return options.map((option, idx) => {
    const id = `${name}${option.value}`; // Compose unique id for radio option

    return (
      <Form.Field as={inline ? "span" : "div"} key={option.key} inline>
          <Radio
            fitted={false}
            label={option.label}
            id={id}
            name={name}
            value={option.value}
            onChange={onChange}
            checked={option.value === value ? true : false}
            {...rest}
          />
      </Form.Field>
    );
  });
};

MyRadioGroup.defaultProps = {
  inline: true
};

MyRadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inline: PropTypes.bool.isRequired
};

export default MyRadioGroup;
export { MyRadioGroup as RadioGroup };
