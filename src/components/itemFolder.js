import React from "react";
import { Link } from "react-router-dom";
import { toggle, Emitter, getVar, setVar, getValue, minicount } from "./utilities";

function Item(props) {
  const onToogle = () => {
    props.folder.display = setVar(props.folder._id, "display", !props.folder.display);
    toggle(props.dropdowId);
  };

  const setFolder = () => {
    Emitter("__folder", props.folder);
  };

  if (!props.dropdow) {
    return (
      <React.Fragment>
        <Link
          className={getValue(props.select, "_id", "") === props.folder._id ? "item active" : "item"}
          to={props.folder._view}
          onClick={setFolder}
        >
          <div className="item-content" to={props.folder._view || ""}>
            <div className="item-icon">
              <i className={`${props.folder.icon || ""}`}></i>
            </div>
            <div className="item-label">{props.folder.caption || ""}</div>
            <div className="item-right">{minicount(props.folder._count) || ""}</div>
          </div>
        </Link>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Link
          className={getValue(props.select, "_id", "") === props.folder._id ? "item active" : "item"}
          to={props.folder._view}
          onClick={setFolder}
        >
          <div className="item-chevron" onClick={onToogle}>
            <i className={props.folder.display ? "fa fa-chevron-down" : "fa fa-chevron-right"}></i>
          </div>
          <div className="item-content" to={props.folder._view || ""}>
            <div className="item-icon">
              <i className={`${props.folder.icon || ""}`}></i>
            </div>
            <div className="item-label">{props.folder.caption || ""}</div>
            <div className="item-right">{props.folder._count || ""}</div>
          </div>
        </Link>
      </React.Fragment>
    );
  }
}

function ItemFolder(props) {
  props.folder.display = getVar(props.folder._id, "display", false);
  const subfolders = props.folder.subfolders || [];
  if (subfolders.length === 0) {
    return (
      <React.Fragment>
        <Item folder={props.folder} select={props.select} dropdow={false}></Item>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Item folder={props.folder} select={props.select} dropdow={true} dropdowId={`${props.folder._id}__dopdown`} />
        <div
          id={`${props.folder._id}__dopdown`}
          className="sidebar-subitems"
          style={props.folder.display ? { display: "block" } : { display: "none" }}
        >
          {subfolders.map((folder, i) => {
            return (
              <React.Fragment key={i}>
                <Item folder={folder} select={props.select} dropdow={false}></Item>
              </React.Fragment>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default ItemFolder;
