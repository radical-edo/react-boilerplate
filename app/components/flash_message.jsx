import Immutable from 'immutable';
import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { flashMessages, colors, typography } from '../theme';

const Main = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column
`;
const TextSection = styled.section`
  color: ${typography.textColor};
`;
const Row = styled(TextSection)`
  width: 100%;
  display: flex;
  padding: 0.25rem 0;
`;
const PaddedSection = styled(TextSection)`
  padding: 0 0.5rem;
`
const StatusSection = styled(PaddedSection)`
  margin-right: 0.5rem;
  border-right: 1px solid ${colors.white};
`;
const Background = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  background-color: ${flashMessages.backgroundColor};
  border-radius: ${flashMessages.borderRadius}px;
  z-index: -10;
`;
const FloatContainer = styled.div`
  position: fixed;
  top: 0;
  width: 40vh;
`;

export function FlasMessage(props) {
  const {
    error, 
    statusStyles, messageStyles, floatContainerStyles, status, message, style
  } = props;
  return (
    <FloatContainer style={floatContainerStyles}>
      <Main style={style}>
        <Background />
        <Row>
          <PaddedSection>
            Ooops! Something went wrong:
          </PaddedSection>
        </Row>
        <Row>
          <StatusSection style={statusStyles}>
            { error.get('status') }
          </StatusSection>
          <TextSection style={messageStyles}>
            { error.get('message') }
          </TextSection>
        </Row>
      </Main>
    </FloatContainer>
  );
}

FlasMessage.defaultProps = {
  floatContainerStyles: {},
  statusStyles: {},
  messageStyles: {},
  style: {},
}

FlasMessage.propTypes = {
  error: PropTypes.instanceOf(Immutable.Map)
}
