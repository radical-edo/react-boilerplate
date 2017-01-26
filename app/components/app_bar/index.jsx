import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Immutable from 'immutable';

import { appBar } from '../../theme';
import { SessionInfo } from './session_info';
import { WithAppBarHeightHOC } from '../with_app_bar_height_hoc';
import { IconButton } from '../../components';
import { devLogger } from '../../utils';

const Section = styled.section`
  display: flex;
  align-items: center;
`;
const Main = styled.div`
  box-shadow: 0 1px 5px 2px #bbb;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1rem;
  width: 100%;
  background-color: ${appBar.backgroundColor};
  height: ${({ height }) => `${height}px`};
`;

export const AppBar = WithAppBarHeightHOC(
  class AppBar extends Component {
    static propTypes = {
      onSessionExpired: PropTypes.func,
      onLogOut: PropTypes.func.isRequired,
      session: PropTypes.instanceOf(Immutable.Map).isRequired
    };
    static defaultProps = {
      onSessionExpired: Function.prototype
    };

    state = {
      sessionTimeout: '--:--'
    };

    componentWillReceiveProps(nextProps) {
      const { session: nextSession } = nextProps;
      const { session } = this.props;
      const expires_in = nextSession.get('timer').get('expires_in');
      if (nextSession.get('current_user') !== session.get('current_user')) {
        this.__calculateSessionTimeout(nextSession.get('current_user').get('token').get('expires_at'), expires_in);
      }
      if (nextSession.get('timer') !== session.get('timer')) {
        this.__calculateSessionTimeout(moment().add(expires_in, 'seconds').toDate(), expires_in);
      }
    }

    __calculateSessionTimeout(expires_at, expires_in) {
      clearTimeout(this.__timer);
      if (null == expires_in) {
        this.setState({ sessionTimeout: '--:--' });
      } else {
        this.__timer = this.__countdown(expires_at, moment.duration(moment(expires_at).diff(moment())));
      }
    }

    __countdown(expires_at, sessionTimeout) {
      if (sessionTimeout.asMilliseconds() <= 0) {
        clearTimeout(this.__timer);
        this.props.onSessionExpired();
      } else {
        this.setState({ sessionTimeout: `${sessionTimeout.minutes()}:${sessionTimeout.seconds()}` });
        return setTimeout(() => {
          this.__timer = this.__countdown(expires_at, moment.duration(moment(expires_at).diff(moment())));
        }, 1e3);
      }
    }

    componentDidMount() {
      const { session } = this.props;
      this.__calculateSessionTimeout(session.get('current_user').get('token').get('expires_at'), session.get('timer').get('expires_in'));
    }

    componentWillUnmount() {
      clearTimeout(this.__timer);
    }

    render() {
      const { onLogOut, session, appBarHeight } = this.props;
      const { sessionTimeout } = this.state;
      return (
        <Main height={appBarHeight}>
          <Section>
            <SessionInfo
              sessionTimeout={sessionTimeout}
              current_user={session.get('current_user')} style={styles.sessionInfo} />
            <IconButton onClick={onLogOut} icon="power-off" />
          </Section>
        </Main>
      );
    }
  }
);

const styles = {
  sessionInfo: {
    margin: '0 0.5rem'
  }
};
