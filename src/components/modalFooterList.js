import React from 'react';
import { Button } from './inputs';

function ModalFooterList(props) {
  if (props.Modal === undefined) {
    return (
      <React.Fragment>
        <div className="float-left">
          <Button
            className={
              props.onRemove === undefined
                ? 'd-none'
                : 'btn btn-outline-secondary btn-icon btn-sm'
            }
            title="Retirar"
            placement="top"
            onClick={props.onRemove}
          >
            <i className="fas fa-eraser"></i>
          </Button>
        </div>
        <Button
          className={
            props.onClose === undefined
              ? 'd-none'
              : 'btn btn-outline-secondary btn-sm'
          }
          onClick={props.onClose}
        >
          Cerrar
        </Button>
        <Button
          className="btn btn-primary btn-sm"
          _state={props._state}
          onClick={props.onOk}
        >
          Aceptar
        </Button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className="float-left">
          <props.Modal
            className={
              props.onSetData === undefined
                ? 'd-none'
                : 'btn btn-outline-secondary btn-sm'
            }
            project_id={props.project_id}
            isNew={true}
            data={props.data || {}}
            onChange={props.onSetData}
          >
            Nuevo
          </props.Modal>
          <Button
            className={
              props.onRemove === undefined
                ? 'd-none'
                : 'btn btn-outline-secondary btn-icon btn-sm ml-1'
            }
            title="Retirar"
            placement="top"
            onClick={props.onRemove}
          >
            <i className="fas fa-eraser"></i>
          </Button>
        </div>
        <Button
          className={
            props.onClose === undefined
              ? 'd-none'
              : 'btn btn-outline-secondary btn-sm'
          }
          onClick={props.onClose}
        >
          Cerrar
        </Button>
        <Button
          className="btn btn-primary btn-sm"
          _state={props._state}
          onClick={props.onOk}
        >
          Aceptar
        </Button>
      </React.Fragment>
    );
  }
}

export default ModalFooterList;
