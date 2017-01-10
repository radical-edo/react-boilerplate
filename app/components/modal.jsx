import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import { modal } from '../theme';

const Main = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -10;
  background-color: ${modal.overlay.backgroundColor};
  opacity: ${modal.overlay.opacity};
`;
const ModalContainer = styled.div`
  transition: margin-top 300ms cubic-bezier(0, 0, 0.58, 1);
  display: flex;
  flex-direction: column;
  box-shadow: 1px 4px 15px 2px ${modal.container.boxShadowColor};
  margin: 0 auto;
  margin-top: ${(props) => (`${props.marginTop}px`)};
  background-color: ${modal.container.backgroundColor};
  width: ${modal.container.width}px;
  height: ${modal.container.height}px;
`;
const ModalHeader = styled.div`
  flex: 1;
  border-bottom: 1px solid ${modal.header.borderColor};
`;
const ModalBody = styled.div`
  flex: 4;
`;
const ModalFooter = styled.div`
  flex: 1;
  border-top: 1px solid ${modal.footer.borderColor};
`;


export class Modal extends Component {
  state = {
    marginTop: -1000
  };

  componentWillReceiveProps(nextProps) {
    const { show: nextShow } = nextProps;
    if (true === nextShow) {
      setTimeout(() => {
        this.setState({ marginTop: 100 });
      }, 0);
    }
  }

  render() {
    if (false === this.props.show) {
      return null;
    } else {
      return this.__renderModal();
    }
  }

  __renderModal() {
    const {
      header, body, footer,
      modalFooterStyles, modalContainerStyles, modalHeaderStyles, modalBodyStyles, style, overlayStyles
    } = this.props;
    const { marginTop } = this.state;
    return (
      <Main style={style}>
        <Overlay style={overlayStyles} />
        <ModalContainer marginTop={marginTop} style={modalContainerStyles}>
          <ModalHeader style={modalHeaderStyles}>
            { header }
          </ModalHeader>
          <ModalBody style={modalBodyStyles}>
            { body }
          </ModalBody>
          <ModalFooter style={modalFooterStyles}>
            { footer }
          </ModalFooter>
        </ModalContainer>
      </Main>
    );
  }
}

Modal.defaultProps = {
  modalHeaderStyles: {},
  modalFooterStyles: {},
  modalBodyStyles: {},
  modalContainerStyles: {},
  style: {},
  overlayStyles: {}
};

Modal.propTypes = {
  body: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired
};
