import { includes } from 'lodash';
import { Config } from 'browser-resource';
import { connect } from 'react-redux';
import React, { PropTypes, Component } from 'react';
import styled from 'styled-components';

import { backgroundColor, appBar } from './theme';
import { logOut } from './actions/auth';
import { RESOLVE_STATUSES } from './constants';
import { devLogger } from './utils';
import { getMe, getMeResolve } from './actions/me';
import { resolveGlobalError } from './actions/global_errors';
import { Button, Modal, AppBar, FlasMessage } from './components';

const MainLayout = styled.div`
  background-color: ${backgroundColor};
  height: 100%;
  width: 100%;
  display: ${({ isLoggedIn }) => isLoggedIn ? 'block' : 'flex'};
  justify-content: center;
  align-items: center;
`;
const SignInLayout = styled(MainLayout)`
`;

class Layout extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  static childContextTypes = {
    appBarHeight: PropTypes.number
  };

  state = {
    showSessionExpiredModal: false
  };

  getChildContext() {
    return {
      appBarHeight: appBar.height
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { showSessionExpiredModal: prevShowSessionExpiredModal } = prevState;
    const { showSessionExpiredModal } = this.state;
    if (true === prevShowSessionExpiredModal && false === showSessionExpiredModal) {
      this.props.logOut();
    }
  }

  componentWillReceiveProps(nextProps) {
    const hasLoggedIn = includes(RESOLVE_STATUSES, nextProps.session.get('logInRequest').get('status'));
    const hasLoggedOut = includes(RESOLVE_STATUSES, nextProps.session.get('logOutRequest').get('status'));
    const nextStatus = nextProps.globalError.get('error').get('status');
    if (true === hasLoggedIn) {
      const access_token = nextProps.session.get('current_user').get('token').get('access_token');
      Config(function (config) {
        config.headers.push(['Authorization', `Bearer/${access_token}`]);
      })
    }
    if (true === hasLoggedOut) {
      setTimeout(() => {
        this.context.router.push('/sign_in');
      }, 0);
    }
    if (nextStatus != null) {
      setTimeout(() => {
        this.props.resolveGlobalError();
      }, 2e3);
    }
  }

  render() {
    devLogger(this);
    const { session, globalError, children } = this.props;
    const isLoggedIn = null != session.get('current_user').get('token').get('access_token');
    const hasFlashMessage = null != globalError.get('error').get('status');
    const { showSessionExpiredModal } = this.state;
    return (
      <MainLayout isLoggedIn={isLoggedIn}>
        { isLoggedIn ? this.__renderAppBar(this.props) : null }
        { hasFlashMessage ? this.__renderFlashMessage(this.props) : null }
        { children }
        <Modal
          show={showSessionExpiredModal}
          header="Session Expired"
          body="Your session has expired. Please log in again"
          footer={<Button onClick={this.__onSessionExpiredConfirm} text="Ok" />}
        />
      </MainLayout>
    );
  }

  __renderAppBar(props) {
    const { logOut, session } = props;
    return (
      <AppBar onSessionExpired={this.__onSessionExpired} onLogOut={logOut} session={session} />
    );
  }

  __onSessionExpired = () => {
    this.setState({ showSessionExpiredModal: true });
  };

  __renderFlashMessage(props) {
    const { globalError } = props;
    return (
      <FlasMessage error={globalError.get('error')} />
    );
  }

  __onSessionExpiredConfirm = (ev) => {
    ev.preventDefault();
    this.setState({ showSessionExpiredModal: false });
  };
}

const mapStateToProps = function mapStateToProps(state) {
  return {
    session: state.session,
    globalError: state.globalError
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    logOut: logOut(dispatch),
    getMe: getMe(dispatch),
    resolveGlobalError: resolveGlobalError(dispatch)
  };
};

export const PageLayout = connect(mapStateToProps, mapDispatchToProps)(Layout);
