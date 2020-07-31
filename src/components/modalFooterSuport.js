import React from 'react';
import ModalPrint from '../modals/modalPrint';
import { Button } from './inputs';
import ModalOptions from '../modals/modalOptions';

function ModalFooterSuport(props) {
  const handleArchive = e => {
    if (e) {
      props.handleState('1');
    } else {
      props.handleState(props._state);
    }
  };

  const handleRestore = e => {
    if (e) {
      props.handleState('0');
    } else {
      props.handleState(props._state);
    }
  };

  const handleCancel = e => {
    if (e) {
      props.handleState('2');
    } else {
      props.handleState(props._state);
    }
  };

  return (
    <React.Fragment>
      <div className="modal-footer">
        <div className="float-left">
          <ModalOptions
            className={
              props._state === '0' && !props.isNew
                ? 'btn btn-icon btn-sm'
                : 'btn btn-icon btn-sm d-none'
            }
            params={{
              title: 'Terminar soporte?',
              description:
                '¿Desea archivar el soporte, para procesar los cambios?'
            }}
            display={true}
            change={true}
            title="Terminar"
            placement="top"
            onClose={handleArchive}
          >
            <i className="fa fa-check"></i>
          </ModalOptions>
          <ModalOptions
            className={
              props._state === '1' && !props.isNew
                ? 'btn btn-icon btn-sm'
                : 'btn btn-icon btn-sm d-none'
            }
            params={{
              title: 'Restaurar soporte?',
              description:
                '¿Desea restaurar el soporte, para reversar los cambios?'
            }}
            display={true}
            change={true}
            title="Restaurar"
            placement="top"
            onClose={handleRestore}
          >
            <i className="fa fa-reply"></i>
          </ModalOptions>
          <ModalOptions
            className={
              props._state === '0' && !props.isNew
                ? 'btn btn-icon btn-sm'
                : 'btn btn-icon btn-sm d-none'
            }
            params={{
              title: 'Cancelar soport?',
              description:
                '¿Desea cancelar el soporte? este cambio no podrá revertirse.'
            }}
            display={true}
            change={true}
            title="Cancelar"
            placement="top"
            onClose={handleCancel}
          >
            <i className="fa fa-ban"></i>
          </ModalOptions>
          <ModalOptions
            className={
              props.handleSend === undefined
                ? 'd-none'
                : props._state === '0' && !props.isNew
                ? 'btn btn-icon btn-sm'
                : 'btn btn-icon btn-sm d-none'
            }
            params={{
              title: 'Enviar soporte?',
              description:
                '¿Desea enviar el soporte? comparte el soporte para agilizar tramites'
            }}
            display={true}
            change={true}
            title="Enviar"
            placement="top"
            onClose={props.handleSend}
          >
            <i className="far fa-paper-plane"></i>
          </ModalOptions>
          <ModalPrint
            className={
              !props.isNew
                ? 'btn btn-icon btn-sm'
                : 'btn btn-icon btn-sm d-none'
            }
            title="Imprimir"
            placement="top"
            data={props.data}
            params={props.printParams}
          >
            <i className="fa fa-print"></i>
          </ModalPrint>
          <div className="menu-space"></div>
          <Button
            className={
              props._state === '0' && !props.isNew
                ? 'btn btn-text btn-sm'
                : 'btn btn-text btn-sm d-none'
            }
            onClick={props.handleNew}
          >
            Nuevo
          </Button>
        </div>
        <ModalOptions
          className="btn btn-outline-secondary btn-sm"
          change={props.change}
          onClose={props.handleClose}
        >
          Cerrar
        </ModalOptions>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={props.handleOk}
        >
          Aceptar
        </button>
      </div>
    </React.Fragment>
  );
}

export default ModalFooterSuport;
