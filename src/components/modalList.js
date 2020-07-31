import React, { useState } from "react";
import { getValue } from "./utilities";
import Td from "./td";

function ModalList(props) {
  const [selectedId, setSelect] = useState(props.selectedId || "-1");
  const caption = props.caption || "caption";
  const field = props.field || "_id";
  const list = props.list || [];
  const checkList = props.checkList || false;
  const filterId = props.filterId || "_id";
  const select = props.select || [];
  const handleScrolling = e => {
    const h = e.target.scrollTop + e.target.clientHeight;
    if (e.target.id === props.id && h === e.target.scrollHeight) {
      props.getData(true);
    }
  };
  const handleClick = e => {
    setSelect(e);
    if (typeof props.onClick === "function") {
      props.onClick(e);
    }
  };
  const handleCheck = e => {
    if (typeof props.onSelect === "function") {
      props.onSelect(e);
    }
  };

  if (checkList) {
    return (
      <React.Fragment>
        <div className="suport-group">
          <div className="suport-scroll" onScroll={handleScrolling} id={props.id}>
            {list.map((item, i) => {
              const className =
                getValue(item, "project_id", "") === "-1"
                  ? "suport-item system"
                  : getValue(item, "_state", "0") === "-1"
                  ? "suport-item system"
                  : getValue(item, "_state", "0") === "2"
                  ? "suport-item cancel"
                  : "suport-item";
              return (
                <React.Fragment key={i}>
                  <Td
                    className={getValue(item, field, "-1") === "-1" || getValue(item, "delete", false) ? "d-none" : `${className}`}
                    selectedId={selectedId}
                    _id={item[field]}
                    cols="25px auto"
                    onClick={handleClick}
                  >
                    <div className="suport-td form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="chk"
                        checked={select.findIndex(sel => sel[filterId] === item._id) > -1}
                        onChange={() => handleCheck(item)}
                      />
                    </div>
                    <div className="suport-td">
                      <props.Modal className="link" project_id={props.project_id} _state={props._state} data={item} setData={props.setData}>
                        {item[caption]}
                      </props.Modal>
                    </div>
                  </Td>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    const _id = getValue(props.select, field, "-1");
    return (
      <React.Fragment>
        <div className="modalListBody" onScroll={handleScrolling} id={props.id}>
          {list.map((item, i) => {
            const className =
              getValue(item, "project_id", "") === "-1"
                ? "modalLisRow system"
                : getValue(item, "_state", "0") === "2"
                ? "modalLisRow cancel"
                : "modalLisRow";
            return (
              <React.Fragment key={i}>
                <div
                  className={
                    getValue(item, field, "-1") === "-1" || getValue(item, "delete", false)
                      ? "d-none"
                      : item[field] === _id
                      ? `${className} active`
                      : `${className}`
                  }
                  onClick={() => props.onSelect(item)}
                >
                  <div className={getValue(item, "project_id", "") === "-1" ? "grid-1 td system" : "grid-1 td"}>{item[caption]}</div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default ModalList;
