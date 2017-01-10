import { includes, isFunction, upperFirst } from 'lodash';
import { connect } from 'react-redux';
import React, { PropTypes, Component } from 'react';
import styled, { css } from 'styled-components';

import { RESOLVE_STATUSES } from '../constants';
import { devLogger } from '../utils';
import { logInResolve, logIn } from '../actions/auth';
import { Button, TextField } from '../components';

const ErrorMessage = styled.section`
  color: #CB3939;
  text-align: center;
`;
const TextFieldContainer = styled.section`
  padding: 0.5rem;
`;
const ButtonContainer = styled(TextFieldContainer)`
  display: flex;
  justify-content: center;
`;
const Main = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  width: 600px;
  height: 320px;
  box-shadow: 1px 1px 3px 2px #c3c3c3;
`;

class SignIn extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  state = {
    errorMessage: '',
    auth: {
      email: '',
      password: ''
    }
  };

  componentWillReceiveProps(nextProps) {
    const nextStatus = nextProps.session.get('logInRequest').get('status');
    const access_token = nextProps.session.get('current_user').get('token').get('access_token');
    if ('error' === nextStatus) {
      this.showErrorMessage(nextProps.session.get('logInRequest'));
    }
    if (null != access_token) {
      this.context.router.push('/');
    }
  }

  showErrorMessage(logInRequest) {
    const [error] = logInRequest.get('errors').toJS();
    const { info: errorMessage } = error;
    this.setState({ errorMessage });
  }

  render() {
    devLogger(this);
    const status = this.props.session.get('logInRequest').get('status');
    const { errorMessage, auth: { email, password } } = this.state;
    return (
      <Main>
        <form onSubmit={this.onSubmit}>
          <ErrorMessage>
            { errorMessage }
          </ErrorMessage>
          <TextFieldContainer>
            <TextField
              value={email} onChange={this.onChange}
              name="email" label="Email"/>
          </TextFieldContainer>
          <TextFieldContainer>
            <TextField
              value={password} onChange={this.onChange}
              type="password" name="password" label="Password"/>
          </TextFieldContainer>
          <ButtonContainer>
            <Button blocked={null != status} type="submit" text="Log In"/>
          </ButtonContainer>
        </form>
      </Main>
    );
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.logIn(this.state.auth);
  }

  onChange = (ev) => {
    const { target: { name, value } = {} } = ev;
    const auth = Object.assign({}, this.state.auth, { [name]: value });
    this.setState({ auth });
  }
}

const mapStateToProps = function mapStateToProps(state) {
  return {
    session: state.session
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    logIn: logIn(dispatch)
  };
};

export const SignInPage = connect(mapStateToProps, mapDispatchToProps)(SignIn);
