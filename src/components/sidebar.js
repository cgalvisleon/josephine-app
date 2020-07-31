import React from "react";
import "../styles/sidebar.scss";
import MenuProject from "./menuProject";
import MenuFolders from "./menuFolders";
import MenuTools from "./menuTools";
import { menuToogle } from "../components/utilities";

function SideBar(props) {
  return (
    <React.Fragment>
      <div id="__sidebarMenu" className="sidebarMenu slide-left">
        <div className="sidebar">
          <div className="sidebar-top">
            <MenuProject
              online={props.online}
              profile={props.profile}
              project={props.project}
              project_id={props.project_id}
              handleSignOut={props.handleSignOut}
            ></MenuProject>
          </div>
          <div className="sidebar-list">
            <MenuFolders folders={props.folders} select={props.folder}></MenuFolders>
          </div>
          <div className="sidebar-bottom">
            <MenuTools talking={props.talking}></MenuTools>
          </div>
        </div>
      </div>
      <div id="__topMenu" className="topMenu">
        <nav id="__sidebarTopMenu" className="navbar navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" onClick={menuToogle}>
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
      </div>
    </React.Fragment>
  );
}

export default SideBar;
