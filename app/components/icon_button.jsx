import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { iconButton } from '../theme';

const Icon = styled.i`
  color: ${iconButton.color};
  &:hover {
    cursor: ${({ blocked }) => (blocked ? 'not-allowed' : 'pointer')};
    color: ${iconButton.activeColor};
  }
`;
const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: 0;
  font-size: 1rem;
  height: ${iconButton.height}px;
  width: ${iconButton.width}px;
  background-color: transparent;
  border-radius: 50%;
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

export function IconButton(props) {
  const {
    icon, style, blocked, type
  } = props;
  return (
    <StyledButton
      blocked={blocked} type={type} onClick={onButtonClick(props)} style={style}>
      <Icon className={`fa fa-${icon}`} />
    </StyledButton>
  );
}

IconButton.defaultProps = {
  icon: '',
  style: {},
  blocked: false,
  type: 'button',
  onClick: Function.prototype
};

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func
};
