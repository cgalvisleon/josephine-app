import React from "react";
import { Emitter } from "./utilities";

function MenuTools(props) {
  const setTalking = e => {
    Emitter("__talking", !props.talking);
  };

  return (
    <React.Fragment>
      <button className={props.talking ? "btn btn-tool active" : "btn btn-tool"} onClick={setTalking}>
        <i className="far fa-comments"></i>
      </button>
    </React.Fragment>
  );
}

export default MenuTools;
