import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { WithAppBarHeightHOC } from './with_app_bar_height_hoc';

const Main = styled.main`
  padding: 0.5rem;
  height: ${(props) => `calc(100% - ${props.appBarHeight}px)`};
`;

export const Page = WithAppBarHeightHOC(function Page(props) {
  const { style, appBarHeight } = props;

  return (
    <Main appBarHeight={appBarHeight} style={style}>
      { props.children } 
    </Main>
  );
});

Page.defaultProps = {
  style: {}
};

