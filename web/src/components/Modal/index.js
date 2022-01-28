import React from 'react';
import { MdRemoveRedEye } from 'react-icons/md';
import Popup from 'reactjs-popup';

import PropTypes from 'prop-types';

import { PopUpButton } from './styles';

export default function Modal({ children }) {
  return (
    <Popup
      trigger={
        <PopUpButton type="button">
          <MdRemoveRedEye color="#dc143c" size={20} />
          <span>Visualizar</span>
        </PopUpButton>
      }
      modal
      position="center center"
      contentStyle={{
        width: '450px',
        borderRadius: '4px',
        padding: '25px',
      }}
      overlayStyle={{
        background: 'rgb(0, 0, 0, 0.7)',
        border: 'rgb(0, 0, 0, 0.7)',
        width: '100%',
      }}
    >
      {children}
    </Popup>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};
