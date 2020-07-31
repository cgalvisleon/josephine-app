import React from "react";
import { getValue } from "./utilities";

function ModalSelect(props) {
  const caption = props.caption || "caption";

  return (
    <React.Fragment>
      <div className="input-group input-group-sm grid-1">
        <input className={props.className || "form-control ellipse"} readOnly value={props.select[caption] || ""} />
        <div className="input-group-append">
          <props.Modal
            className="btn input-group-text"
            project_id={props.project_id}
            _state={props._state}
            _id={getValue(props.select, "_id", "")}
            data={props.select}
            msg={props.msg}
            setData={props.setData}
          >
            <i className="fa fa-ellipsis-h"></i>
          </props.Modal>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ModalSelect;
