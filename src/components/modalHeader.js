import React from 'react';
import ModalOptions from '../modals/modalOptions';

function ModalHeader(props) {
  return (
    <React.Fragment>
      <div className="modal-header-new">
        <div className="modal-title">{props.title || 'Titulo'}</div>
        <ModalOptions
          className="modal-close btn btn-icon btn-sm"
          placement="top"
          title="Cerrar"
          change={props.change || false}
          onClose={props.handleClose}
        >
          <i className="fa fa-times"></i>
        </ModalOptions>
      </div>
    </React.Fragment>
  );
}

export default ModalHeader;
