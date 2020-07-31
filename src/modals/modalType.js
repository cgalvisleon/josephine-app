import React from "react";
import ReactDOM from "react-dom";
import "../styles/modal.scss";
import { Loading, showModal, hideModal, projectId, ShowInfo, msg, getValue, genId } from "../components/utilities";
import ModalHeader from "../components/modalHeader";
import { Textarea, Section } from "../components/inputs";
import ModalFooter from "../components/modalFooter";
import { Api as Project } from "../api/project";

class ModalType extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    const data = this.handleScheme(props.data);
    this.state = {
      _id: "__modalType",
      title: "Tipo",
      show: false,
      old: data,
      data: data,
      change: false
    };
  }

  handleScheme = data => {
    return {
      project_id: projectId(),
      _class: getValue(data, "_class", "-1"),
      _state: "0",
      _id: genId("-1"),
      caption: "",
      description: ""
    };
  };

  handleChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      },
      change: true
    });
  };

  handleExecute = e => {
    if (typeof this.props.setData === "function") {
      this.props.setData(e);
    }
    this.handleHide();
  };

  handleHide = () => {
    hideModal(this.state._id);
    this.setState({ show: false });
  };

  handleShow = () => {
    if (this.props.isFind) {
      if (this.props._id !== "-1") {
        this.setState({ show: true, change: false });
      }
    } else {
      this.setState({ show: true, change: false });
    }
  };

  handleClose = () => {
    if (this.state.change) {
      this.setState({ data: this.state.old, change: false });
    }
    this.handleHide();
  };

  handleOk = () => {
    if (this.state.change) {
      const id = this.state.data._id;
      const params = this.state.data;
      Project.setType(id, params).then(result => {
        if (result.msg === "") {
          this.handleExecute(result.data);
        }
      });
    } else {
      this.handleHide();
    }
  };

  handleFinish = e => {
    if (e) {
      const id = this.state.data._id;
      Project.stateType(id, "1").then(result => {
        if (result.msg === "") {
          this.handleExecute(result.data);
        }
      });
    }
  };

  handleRestore = e => {
    if (e) {
      const id = this.state.data._id;
      Project.stateType(id, "0").then(result => {
        if (result.msg === "") {
          this.handleExecute(result.data);
        }
      });
    }
  };

  handleSetData = e => {
    this.setState({
      old: e.data,
      data: e.data,
      isNew: e.isNew,
      change: e.change
    });
    showModal(this.state._id);
  };

  handleData = () => {
    const data = this.props.data;
    this.handleSetData({ data, isNew: false, change: false });
  };

  handleNew = () => {
    const data = this.handleScheme();
    this.handleSetData({ data, isNew: true, change: true });
  };

  handleFind = id => {
    if (this.state.change) {
      ShowInfo(msg("MSG-CHANGE"));
    } else if (id !== "-1") {
      Project.type(id).then(result => {
        if (result.msg === "") {
          const data = result.data;
          this.handleSetData({ data, isNew: false, change: false });
        } else {
          this.handleHide();
        }
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show !== this.state.show && this.state.show) {
      if (this.props.isNew) {
        this.handleNew();
      } else if (this.props.isFind) {
        this.handleFind(this.props._id);
      } else {
        this.handleData();
      }
      showModal(this.state._id);
    }
  }

  componentWillUnmount() {
    hideModal(this.state._id);
  }

  render() {
    if (!this.state.show) {
      return (
        <React.Fragment>
          <div className={this.props.className} onClick={this.handleShow} disabled={!(this.props._state === "0")}>
            {this.props.children}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className={this.props.className} onClick={this.handleShow} disabled={!(this.props._state === "0")}>
            {this.props.children}
          </div>
          {ReactDOM.createPortal(
            <div className="modal fade" id={this.state._id} role="dialog">
              <div className="modal-dialog xs" role="document">
                <div className="modal-content">
                  <ModalHeader title={this.state.title} handleClose={this.handleClose} />
                  <div className="modal-body">
                    <div className="modal-box">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group input-group-sm">
                            <label>Nombre</label>
                            <Section
                              type="text"
                              id={`${this.state._id}_caption`}
                              className="form-control name"
                              placeholder="Nombre"
                              name="caption"
                              _state={this.state.data._state}
                              value={this.state.data.caption}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group input-group-sm">
                            <label>Descripción</label>
                            <Textarea
                              className="form-control notresize"
                              placeholder="Descripción"
                              rows={3}
                              _state={this.state.data._state}
                              name="description"
                              value={this.state.data.description}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group input-group-sm mb-0">
                            <small>{this.state.data.project_id === "-1" ? "Registro del sistema" : ""}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <ModalFooter
                      single="tipo"
                      plural="el tipo"
                      _state={this.state.data._state}
                      isNew={this.props.isNew}
                      onFinish={this.handleFinish}
                      onRestore={this.handleRestore}
                      onClose={this.handleClose}
                      onOk={this.handleOk}
                    />
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

export default ModalType;
