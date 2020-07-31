import React from "react";
import ItemFolder from "../components/itemFolder";
import { getValue } from "./utilities";

function MenuFolders(props) {
  const folders = getValue(props, "folders", []);

  return (
    <React.Fragment>
      {folders.map((folder, i) => {
        return (
          <React.Fragment key={i}>
            <ItemFolder folder={folder} select={props.select}></ItemFolder>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}

export default MenuFolders;
