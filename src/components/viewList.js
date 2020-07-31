import React from "react";
import { formatDate, getValue } from "./utilities";

function ViewList(props) {
  const list = props.data.list || [];
  const _state = props._state || "0";
  const _id = getValue(props.select, "_id", "-1");
  const handleScroll = e => {
    const h = e.target.scrollTop + e.target.clientHeight;
    if (e.target.id === "__viewListScroll" && h === e.target.scrollHeight) {
      props.handleData(true);
    }
  };

  return (
    <React.Fragment>
      <div className="viewlist" id="__viewListScroll" onScroll={handleScroll}>
        {list.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <props.Modal project_id={props.project_id} data={item} setData={props.setData}>
                <div
                  className={
                    _state === "ALL"
                      ? item._id === _id
                        ? "viewlist-item active"
                        : "viewlist-item"
                      : item.delete || item._state !== _state
                      ? "viewlist-item d-none"
                      : item._id === _id
                      ? "viewlist-item active"
                      : "viewlist-item"
                  }
                  onClick={() => props.handleSelected(item)}
                >
                  <div className="item-row">
                    <div className="item-left modal-state">
                      <i className={item._state === "1" ? "fas fa-lock state-1" : "fas fa-lock state-1 d-none"}></i>
                      <i className={item._state === "2" ? "fas fa-ban state-2" : "fas fa-ban state-2 d-none"} />
                    </div>
                    <div className="item-row-line">
                      <b>{item.caption}</b>
                    </div>
                    <div className="item-row-date">{formatDate(item.date_of, "MMM d, yyyy")}</div>
                    <div className="item-row-right"></div>
                  </div>
                  <div className="item-row">
                    <div className="item-left modal-authorized">
                      <i
                        className={item.authorized ? "fas fa-check-circle" : "fas fa-check-circle d-none"}
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Autorizado"
                      />
                      <i
                        className={item.authorized === false ? "fas fa-user-clock" : "fas fa-user-clock d-none"}
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Por autorización"
                      />
                    </div>
                    <div className="item-row-line">{item.description}</div>
                    <div className="item-row-right">
                      <i className={getValue(item, "alerts", false) === false ? "d-none" : "fas fa-exclamation-triangle alerts"}></i>
                    </div>
                  </div>
                </div>
              </props.Modal>
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default ViewList;
