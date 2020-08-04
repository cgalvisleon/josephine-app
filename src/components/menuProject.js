import React from "react";
import { Link } from "react-router-dom";
import ItemProject from "../components/itemProject";

function MenuProject(props) {
  return (
    <React.Fragment>
      <div className="profile dropdown">
        <div className="profileEnter" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <div className="profileEnterName">{props.project.caption || "Nombre empresa"}</div>
          <div className="profileEnterChevron">
            <i className="fa fa-chevron-down"></i>
          </div>
        </div>
        <div className="dropdown-menu dropdownPerson" aria-labelledby="dropdownMenuButton">
          <div className="dropdownPersonHeader">
            <div className="dropdownPersonHeaderAvatar">
              <img className="avatar" src={props.profile.avatar || "/avatar.svg"} alt="" />
            </div>
            <div className="dropdownPersonHeaderInfo">
              <div className="name">{props.profile.caption || "Nombre usuario"}</div>
              <div className="user">{props.profile.username || "correo@correo.com"}</div>
            </div>
            <div className="dropdownPersonHeaderAlert">
              <Link className="btn btn-success btn-sm" to="/inboxes/profile">
                <i className="fa fa-pencil-alt"></i>
              </Link>
            </div>
          </div>
          <div className="dropdownList">
            {props.profile.projects.map((project, i) => {
              return (
                <React.Fragment key={i}>
                  <ItemProject project={project} project_id={props.project_id}></ItemProject>
                </React.Fragment>
              );
            })}
            <div className={props.profile.projects.length === 0 ? "d-none" : ""}>
              <Link className="dropdownItem" to="/inboxes/preferences">
                <div className="dropdownItemLeftIcon">
                  <i className="fa fa-cog"></i>
                </div>
                <div className="dropdownItemContent">Preferencias</div>
                <div className="dropdownItemRightIcon"></div>
              </Link>
              <div className="dropdownSpace"></div>
            </div>
            <Link className="dropdownItem" target="_blank" to="/help">
              <div className="dropdownItemLeftIcon">
                <i className="far fa-question-circle"></i>
              </div>
              <div className="dropdownItemContent">Ayuda & feedback</div>
              <div className="dropdownItemRightIcon"></div>
            </Link>
          </div>
          <div className="dropdownSpace"></div>
          <div className="dropdownItem dropdownItemFooter" onClick={() => props.handleSignOut()}>
            <div className="dropdownItemLeftIcon">
              <i className="fa fa-sign-out-alt"></i>
            </div>
            <div className="dropdownItemContent">Cerrar sesión</div>
            <div className="dropdownItemRightIcon"></div>
          </div>
        </div>
        <div className="profileUser">
          <div className="profileUserOnline">
            <div className={props.online ? "onLine" : "onLine off"}></div>
          </div>
          <div className="profileUserName">{props.profile.caption || "Nombre usuario"}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MenuProject;
