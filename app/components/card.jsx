import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { card } from '../theme';
import { devLogger } from '../utils';

export const CardHeader = styled.header`
  font-size: 1.5rem;
  font-weight: 500;
`;
export const CardBody = styled.section`
`;
export const CardFooter = styled.footer`
`;
export function Card(props) {
  devLogger(Card);
  const { children, style } = props;
  return (
    <CardContainer style={style}>
      { children }
    </CardContainer>
  );
}

Card.defaultProps = {
  style: {},
};

Card.propTypes = {
  style: PropTypes.object
};

const CardContainer = styled.article`
  padding: 0.5rem;
  background-color: ${card.backgroundColor};
  box-shadow: 1px 1px 2px 3px ${card.shadowColor};
  display: flex;
  flex-direction: column;
`;
