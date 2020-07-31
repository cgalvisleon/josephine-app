import React from 'react';
import ModalOptions from '../modals/modalOptions';
import { Button } from './inputs';

function ModalFooter(props) {
  const single = props.single || '';
  const plural = props.plural || '';

  return (
    <React.Fragment>
      <div className="float-left">
        <ModalOptions
          className={
            props.onFinish === undefined
              ? 'd-none'
              : props._state === '0' && !props.isNew
              ? 'btn btn-outline-secondary btn-sm'
              : 'd-none'
          }
          params={{
            title: `¿Terminar ${single}?`,
            description: `¿Desea dejar de usar ${plural}?`
          }}
          change={true}
          onClose={props.onFinish}
        >
          Terminar
        </ModalOptions>
        <ModalOptions
          className={
            props.onRestore === undefined
              ? 'd-none'
              : props._state === '1' && !props.isNew
              ? 'btn btn-outline-secondary btn-sm'
              : 'd-none'
          }
          params={{
            title: `¿Restaurar ${single}?`,
            description: `¿Desea restaurar ${plural}?`
          }}
          change={true}
          onClose={props.onRestore}
        >
          Restaurar
        </ModalOptions>
      </div>
      <ModalOptions
        className={
          props.onClose === undefined
            ? 'd-none'
            : 'btn btn-outline-secondary btn-sm'
        }
        change={props.change || false}
        onClose={props.onClose}
      >
        Cerrar
      </ModalOptions>
      <Button className="btn btn-primary btn-sm" onClick={props.onOk}>
        Aceptar
      </Button>
    </React.Fragment>
  );
}

export default ModalFooter;
