import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Immutable from 'immutable';

import { devLogger } from '../../utils';

const Main = styled.section`
  font-weight: 300;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const Div = styled.div`
`;

export function SessionInfo(props) {
  const { sessionTimeout, style, sessionInfoStyle, current_user } = props;
  return (
    <Main style={style}>
      { current_user.get('email') }
      <Div style={sessionInfoStyle}>
        Session Expires In: { formatSessionTimeout(sessionTimeout) }
      </Div>
    </Main>
  );
}

const formatSessionTimeout = function formatSessionTimeout(sessionTimeout) {
  return sessionTimeout.split(':').map(function (section) {
    return 1 === section.length ? `0${section}` : section;
  }).join(':');
};

SessionInfo.defaultProps = {
  style: {},
  sessionInfoStyle: {}
};

SessionInfo.propTypes = {
  sessionTimeout: PropTypes.string.isRequired,
  current_user: PropTypes.instanceOf(Immutable.Map).isRequired
};
