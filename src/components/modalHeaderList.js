import React from "react";
import { minicount } from "./utilities";

function ModalHeaderList(props) {
  return (
    <React.Fragment>
      <div className="modal-header-new">
        <div className="modal-title">
          {props.title || "Lista"}
          {props.state === "1" ? ` - Terminados` : props.state === "2" ? ` - Cancelados` : ""}
          {props.all > 0 ? ` - (${minicount(props.rows)} de ${minicount(props.all)})` : ""}
        </div>
        <div className="modal-close btn btn-icon btn-sm" onClick={props.handleClose}>
          <i className="fa fa-times"></i>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ModalHeaderList;
