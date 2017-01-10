import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { colors, button } from '../theme';

const StyledButton = styled.button`
  outline: none;
  border: 0;
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: ${({ backgroundColor, blocked }) => (blocked ? '' : backgroundColor)};
  color: ${colors.white};
  border-radius: ${button.borderRadius}px;
  &:hover {
    cursor: ${({ blocked }) => (blocked ? 'not-allowed' : 'initial')}
  }
  &:active {
    box-shadow: ${({ backgroundColorActive, blocked }) => (blocked ? 'none': `1px 1px 3px 0 ${backgroundColorActive}`)};
    background-color: ${({ backgroundColorActive, blocked }) => (blocked ? '' : backgroundColorActive)};
  }
`;

const onButtonClick = function onButtonClick(props) {
  return function (ev) {
    if (true === props.blocked) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      props.onClick(ev);
    }
  };
};

export function Button(props) {
  const { backgroundColor, backgroundColorActive, style, blocked, text, type } = props;
  return (
    <StyledButton
      backgroundColor={backgroundColor} backgroundColorActive={backgroundColorActive}
      blocked={blocked} type={type} onClick={onButtonClick(props)} style={style}>
      { text }
    </StyledButton>
  );
}

Button.defaultProps = {
  backgroundColor: button.backgroundColor,
  backgroundColorActive: button.backgroundColorActive,
  style: {},
  blocked: false,
  text: '',
  type: 'button',
  onClick: Function.prototype
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func
};
