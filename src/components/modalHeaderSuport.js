import React from "react";
import ModalOptions from "../modals/modalOptions";
import { toolTip } from "./utilities";

function ModalHeaderSuport(props) {
  toolTip();
  return (
    <React.Fragment>
      <div className="modal-header-suport">
        <div className="modal-left">
          <div className="modal-state">
            <i
              className={props._state === "1" ? "fas fa-lock state-1" : "fas fa-lock state-1 d-none"}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Terminado"
            ></i>
            <i
              className={props._state === "2" ? "fa fa-ban state-2" : "fa fa-ban state-2 d-none"}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Cancelado"
            ></i>
          </div>
          <div className="modal-authorized">
            <i
              className={props.authorized === true ? "fas fa-check-circle" : "fas fa-check-circle d-none"}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Autorizado"
            ></i>
            <i
              className={props.authorized === false ? "fas fa-user-clock" : "fas fa-user-clock d-none"}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Por autorización"
            ></i>
          </div>
        </div>
        <div className="modal-title">{props.title || "Titulo"}</div>
        <div className="modal-right">
          <div className="modal-tool">
            <button
              type="button"
              className={props.handlePrior === undefined ? "d-none" : !props.isNew ? "btn btn-icon btn-sm" : "btn btn-icon btn-sm d-none"}
              data-toggle="tooltip"
              data-placement="top"
              title="Anterior"
              onClick={props.handlePrior}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              type="button"
              className={props.handleNext === undefined ? "d-none" : !props.isNew ? "btn btn-icon btn-sm" : "btn btn-icon btn-sm d-none"}
              data-toggle="tooltip"
              data-placement="top"
              title="Siguiente"
              onClick={props.handleNext}
            >
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
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
      </div>
    </React.Fragment>
  );
}

export default ModalHeaderSuport;
