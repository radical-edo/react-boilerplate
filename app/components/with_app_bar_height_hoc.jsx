import React, { Component, PropTypes } from 'react';

export function WithAppBarHeightHOC(WrappedComponent) {
  return class WithAppBarHeightHOC extends Component {
    static contextTypes = {
      appBarHeight: PropTypes.number
    }

    render() {
      const { appBarHeight } = this.context;
      return (
        <WrappedComponent {...this.props} appBarHeight={appBarHeight} />
      );
    }
  };
}
