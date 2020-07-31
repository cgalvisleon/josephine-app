import React from "react";
import ModalContact from "../modals/modalContact";

function TabContact(props) {
  return (
    <React.Fragment>
      <div className="col-sm-3">
        <div className="contact-box center-version">
          <div className="contact-detail">
            <img
              alt="avatar"
              className="rounded-circle img-thumbnail"
              src={props.item.avatar === "" ? "/avatar.svg" : props.item.avatar}
            />
            <h6 className="contact-box-name">{props.item.caption}</h6>
            <div className="contact-box-profile">{props.item.profile}</div>
            <address>
              <div className="detail">{props.item.address === "" ? "Sin dirección conocida" : props.item.address}</div>
              <div className="detail-strong">{props.item.email}</div>
              <div className="detail">{props.item.city}</div>
              <div className="detail">{props.item.phone}</div>
              <div className="detail">Cel: {props.item.cellphone}</div>
            </address>
            <div className="state" style={props.item._state === "1" ? { display: "block" } : { display: "none" }}>
              <i className="fas fa-user-times"></i>
            </div>
          </div>
          <div className="contact-box-footer">
            <div className="btn-group">
              <ModalContact className="btn btn-primary btn-sm" data={props.item} setData={props.setData}>
                Editar
              </ModalContact>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function TabContacts(props) {
  return (
    <React.Fragment>
      {props.list.map((item, i) => {
        return <TabContact key={i} item={item} setData={props.setData}></TabContact>;
      })}
    </React.Fragment>
  );
}

export default TabContacts;
