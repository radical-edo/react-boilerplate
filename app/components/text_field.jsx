import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { textField } from '../theme';

const Input = styled.input`
  width: 80%;
  outline: none;
  border: 0;
  height: 2rem;
  border: 1px solid ${textField.borderColor};
  font-size: 0.9rem;
  &:focus {
    box-shadow: 1px 1px 3px 0 ${textField.focusShadow};
  }
`;
const Label = styled.label`
  width: 20%;
  font-weight: ${textField.labelFontWeight};
  text-align: center;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
`;

export function TextField(props) {
  const {
    placeholder = '',
    style = {},
    labelStyles = {},
    inputStyles = {},
    value,
    name,
    label = '',
    type = 'text',
    onChange = Function.prototype,
  } = props;
  return (
    <Container style={style}>
      <Label style={labelStyles}>{ label }</Label>
      <Input
        placeholder={placeholder || label}
        value={value}
        type={type}
        name={name}
        onChange={onChange}
        style={inputStyles}
      />
    </Container>
  );
}

TextField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string
};
