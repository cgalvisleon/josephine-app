import React from "react";
import Folder from "./folder";
import { useSelector } from "react-redux";

function ItemFolder(props) {
  const display = useSelector(state => {
    const project_id = state.sistem.project._id;
    const display = state.sistem.display || [];
    const index = display.findIndex(element => element.project_id === project_id && element.folder_id === props.folder._id);
    if (index === -1) {
      return false;
    } else {
      return display[index].display;
    }
  });
  const subfolders = props.folder.subfolders || [];

  if (subfolders.length === 0) {
    return <Folder folder={props.folder} dropdow={false} display={display} index={props.index} />;
  } else {
    return (
      <React.Fragment>
        <Folder folder={props.folder} dropdowId={`${props.folder._id}__dopdown`} index={props.index} dropdow={true} display={display} />
        <div id={`${props.folder._id}__dopdown`} className="sidebar-subitems" style={display ? { display: "block" } : { display: "none" }}>
          {subfolders.map((folder, i) => {
            return <Folder key={i} folder={folder} dropdow={false} display={display} />;
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default ItemFolder;
