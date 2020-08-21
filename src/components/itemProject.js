import React from "react";
import { Emitter } from "../components/utilities";

function ItemProject(props) {
  const setProject = e => {
    Emitter("__project", props.project);
  };

  return (
    <React.Fragment>
      <div className={props.project._id === props.project_id ? "dropdownProject active" : "dropdownProject"} onClick={setProject}>
        <div className="dropdownProjectLogo">
          <img className="avatar" src={props.project.avatar || "/logo.svg"} alt="" />
        </div>
        <div className="dropdownProjectInfo">
          <div className="name">{props.project.caption || "Nombre usuario"}</div>
          <div className="profile">{props.project.profile || "Perfil"}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ItemProject;
