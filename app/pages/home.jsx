import React, { Component } from 'react';

import { devLogger } from '../utils';
import { Page } from '../components';

export class HomePage extends Component {
  render() {
    devLogger(this);
    return (
      <Page>
        <h1>Welcome Home</h1>
      </Page>
    );
  }
}
