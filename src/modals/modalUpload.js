import React from "react";
import ReactDOM from "react-dom";
import "../styles/modal.scss";
import { showModal, hideModal, fileUpload, Loading, OutLoading, ShowAlert, getValue } from "../components/utilities";
import ModalHeader from "../components/modalHeader";
import { Api as System } from "../services/system";
import ModalOptions from "./modalOptions";
import { connect } from "react-redux";

class ModalUpload extends React.Component {
  constructor(props) {
    super(props);
    const name = "ModalUpload";
    this.state = {
      _id: "__ModalUpload",
      name: name,
      data: {
        project_id: getValue(props, "project_id", "-1"),
        _class: getValue(props, "_class", "DOCUMENT"),
        main_id: getValue(props, "main_id", "-1"),
        object_id: getValue(props, "object_id", "-1"),
        group_tp: getValue(props, "group_tp", "-1"),
        _state: getValue(props, "_state", "0"),
        caption: getValue(props, "caption", ""),
        description: getValue(props, "description", ""),
        name: getValue(props, "name", ""),
        ext: getValue(props, "ext", ""),
        path: getValue(props, "path", ""),
        file: ""
      },
      show: false,
      change: false
    };
  }

  handleChangeFile = e => {
    if (e.target.files.length > 0) {
      Loading("upload");
      const file = e.target.files[0];
      const name = file.name;
      const ext = name.split(".")[1];
      const size = file.size;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        OutLoading("upload");
        this.setState({
          data: {
            ...this.state.data,
            name: name,
            ext: ext,
            size: size,
            file: reader.result
          },
          change: true
        });
      };
    }
  };

  handleExeute = e => {
    if (typeof this.props.onChange === "function") {
      this.props.onChange(e);
    }
  };

  handleHide = () => {
    hideModal(this.state._id);
    this.setState({ show: false });
  };

  handleShow = e => {
    if (window.FileReader) {
      const _state = this.props._state || "0";
      if (_state === "0") {
        this.setState({
          show: true,
          change: false
        });
      }
    } else {
      ShowAlert("¡Funcionalidad no soportada por el navegador!");
    }
  };

  handleClose = e => {
    this.handleHide();
  };

  handleOk = e => {
    const project_id = getValue(this.state.data, "project_id", "-1");
    const object_id = getValue(this.state.data, "object_id", "-1");
    const group_tp = getValue(this.state.data, "group_tp", "");
    const _class = getValue(this.state.data, "_class", "DOCUMENT");
    const main_id = getValue(this.state.data, "main_id", "-1");
    const caption = getValue(this.state.data, "caption", "");
    const description = getValue(this.state.data, "description", "");
    const name = getValue(this.state.data, "name", "");
    const ext = getValue(this.state.data, "ext", "");
    const size = getValue(this.state.data, "size", 0);
    const base64 = getValue(this.state.data, "file", "");
    const user_id = this.props.user_id;
    System.attachmentsBase64(
      project_id,
      "-1",
      object_id,
      group_tp,
      _class,
      main_id,
      caption,
      description,
      name,
      ext,
      size,
      user_id,
      base64
    ).then(result => {
      this.handleExeute({ data: result, action: "set" });
      this.handleHide();
    });
  };

  handleDelete = e => {
    if (e) {
      const object_id = getValue(this.state.data, "object_id", "-1");
      const main_id = getValue(this.state.data, "main_id", "-1");
      System.attachmentsDel(object_id, main_id).then(result => {
        this.handleExeute({ data: result, action: "del" });
        this.handleHide();
      });
    }
  };

  handleData = params => {
    const data = {
      project_id: getValue(params, "project_id", "-1"),
      _class: getValue(params, "_class", "DOCUMENT"),
      main_id: getValue(params, "main_id", "-1"),
      object_id: getValue(params, "object_id", "-1"),
      _state: getValue(params, "_state", "0"),
      path: getValue(params, "path", ""),
      file: ""
    };
    this.setState({
      ...this.state,
      data: data,
      change: false
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show !== this.state.show && this.state.show) {
      showModal(this.state._id);
      this.handleData(this.props);
    }
  }

  componentWillUnmount() {
    hideModal(this.state._id);
  }

  render() {
    fileUpload();
    if (!this.state.show) {
      return (
        <React.Fragment>
          <div className={this.props.className} style={this.props.style} onClick={this.handleShow}>
            {this.props.children}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className={this.props.className} style={this.props.style} onClick={this.handleShow}>
            {this.props.children}
          </div>
          {ReactDOM.createPortal(
            <div className="modal fade" id={this.state._id} role="dialog">
              <div className="modal-dialog __modalUpload" role="document">
                <div className="modal-content">
                  <ModalHeader title="Adjuntar archivo" handleClose={this.handleClose} />
                  <div className="modal-body" style={{ height: "80px" }}>
                    <div className="modalUploadContent">
                      <div className="input-group input-group-sm custom-file mb-2 pointer">
                        <input
                          type="file"
                          className="custom-file-input pointer"
                          id="customFile"
                          lang="es"
                          accept={getValue(this.state.data, "_class", "DOCUMENT") === "IMAGE" ? "image/*" : "application/*"}
                          onChange={this.handleChangeFile}
                        />
                        <label className="custom-file-label pointer" htmlFor="customFile" data-browse="Elegir">
                          Seleccionar archivo
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="float-left">
                      <ModalOptions
                        className={getValue(this.state.data, "path", "") === "" ? "d-none" : "btn btn-outline-secondary btn-sm"}
                        params={{
                          title: `¿Eliminar ${getValue(this.state.data, "_class", "DOCUMENT") === "IMAGE" ? "imagen" : "documento"}?`,
                          description: `¿Confirma que quiere eliminar ${
                            getValue(this.state.data, "_class", "DOCUMENT") === "IMAGE" ? "la imagen" : "el documento"
                          }? Esa operación no podrá ser reversada.`
                        }}
                        change={true}
                        onClose={this.handleDelete}
                      >
                        Eliminar
                      </ModalOptions>
                    </div>
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.handleClose}>
                      Cerrar
                    </button>
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.handleOk} disabled={!this.state.change}>
                      Adjuntar archivo
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.getElementById("rootModals")
          )}
        </React.Fragment>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    signin: state.sistem.signin,
    project_id: state.sistem.project._id || "-1",
    user_id: state.sistem.profile._id || "-1",
    _view: state.sistem.folder._view || "",
    online: state.sistem.online
  };
}

export default connect(mapStateToProps)(ModalUpload);
