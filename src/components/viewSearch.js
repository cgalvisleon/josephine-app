import React from "react";
import { minicount } from "./utilities";
import ModalPrint from "../modals/modalPrint";
import { Button } from "../components/inputs";

function ViewSearch(props) {
  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light view-navbar">
        <div className="navbar-brand view-title">
          {props.title}
          {props.data.state === "1" ? ` - Terminados` : props.data.state === "2" ? ` - Cancelados` : ""}
          {props.data.all > 0 ? ` (${minicount(props.data.end)} de ${minicount(props.data.all)})` : ""}
        </div>
        <div className="form-inline">
          <div className="input-group input-group-sm view-search">
            <input
              type="text"
              className="form-control"
              autoComplete="nope"
              placeholder="Buscar"
              name="search"
              value={props.data.search}
              onChange={props.handleChange}
              onKeyDown={props.handleKeyDown}
            />
            <div className="input-group-append">
              <Button className="btn btn-secondary" onClick={props.handleSearch}>
                <i className="fa fa-search"></i>
              </Button>
            </div>
          </div>
          <ModalPrint className="btn btn-secondary btn-sm ml-2" params={props.printParams}>
            <i className="fa fa-print"></i>
          </ModalPrint>
          <props.Modal className="btn btn-primary btn-sm ml-2" isNew={true} onChange={props.onChange}>
            Nuevo
          </props.Modal>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default ViewSearch;
