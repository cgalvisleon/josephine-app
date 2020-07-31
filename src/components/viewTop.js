import React from "react";
import { formatInteger } from "./utilities";
import { Button } from "../components/inputs";
import ModalPrint from "../modals/modalPrint";

function ViewTop(props) {
  const fields = props.fields || [{ _id: "", caption: "Todos" }];
  return (
    <React.Fragment>
      <div className="viewtop">
        <div className="viewtop-search">
          <div className="input-group input-group-sm grid-1">
            <input
              type="text"
              className="form-control"
              autoComplete="off"
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
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-bars"></i>
              </button>
              <div className="dropdown-menu">
                {fields.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className={item._id === props.field ? "dropdown-item active" : "dropdown-item"}
                      onClick={() => props.handleField(item)}
                    >
                      {item.caption}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="grid-2 grid-l menubar s">
            <ModalPrint className="btn btn-secondary btn-sm" params={props.printParams}>
              <i className="fa fa-print"></i>
            </ModalPrint>
            <props.Modal className="btn btn-primary btn-sm" project_id={props.project_id} isNew={true} setData={props.setData}>
              Nuevo
            </props.Modal>
          </div>
          <div className="btn-group btn-group-sm grid-3 grid-r s">
            <p className="m-0">
              <b className="mr-1">{formatInteger(props.data.end)}</b>
              de
              <b className="ml-1">{formatInteger(props.data.all)}</b>
            </p>
          </div>
        </div>
        <div className="viewtop-views">
          {props.views.map((item, i) => {
            return (
              <span
                key={i}
                className={item._id === props.data.state ? "btn btn-light badge-pill-sm mr-2 active" : "btn btn-light badge-pill-sm mr-2"}
                onClick={() => props.handleState(item._id)}
              >
                {item.caption}
              </span>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ViewTop;
