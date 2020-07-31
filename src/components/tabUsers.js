import React from "react";
import ModalUser from "../modals/modalUser";

function TabUser(props) {
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
          </div>
          <div className="contact-box-footer">
            <div className="btn-group">
              <ModalUser className="btn btn-primary btn-sm" isUpdate={true} data={props.item} setData={props.setData}>
                Editar
              </ModalUser>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function TabUsers(props) {
  return (
    <React.Fragment>
      {props.list.map((item, i) => {
        return <TabUser key={i} item={item} setData={props.setData}></TabUser>;
      })}
    </React.Fragment>
  );
}

export default TabUsers;
