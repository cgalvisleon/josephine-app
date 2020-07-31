import React from "react";
import Td from "./td";
import { getValue, formatNumber } from "./utilities";

function ModalStock(props) {
  const caption = props.caption || "caption";
  const list = props.list || [];
  const _id = getValue(props.select, "_id", 0);
  const handleScrolling = e => {
    const h = e.target.scrollTop + e.target.clientHeight;
    if (e.target.id === props.id && h === e.target.scrollHeight) {
      props.getData(true);
    }
  };

  return (
    <React.Fragment>
      <div className="suport-group">
        <Td className="suport-head" cols="80px auto 89px">
          <div className="suport-td m">Código</div>
          <div className="suport-td m">Descripción</div>
          <div className="suport-td m">Existencias</div>
        </Td>
        <div className="suport-scroll" onScroll={handleScrolling} id={props.id}>
          {list.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <Td
                  className={getValue(item, "stock", 0) > 0 ? "suport-item" : "suport-item d-none"}
                  selectedId={_id}
                  _id={item._id}
                  cols="80px auto 85px"
                  onClick={() => props.onSelect(item)}
                >
                  <div className="suport-td t-c">{item.code}</div>
                  <div className="suport-td t-l">{item[caption]}</div>
                  <div className="suport-td t-r">{formatNumber(item.stock, 2)}</div>
                </Td>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ModalStock;
