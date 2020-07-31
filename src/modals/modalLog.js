import React from "react";
import ReactDOM from "react-dom";
import "../styles/modal.scss";
import { Loading, showModal, hideModal, formatDateTime, genId } from "../components/utilities";
import ModalHeader from "../components/modalHeader";
import { Button, Input, Textarea } from "../components/inputs";
import { Api as Log } from "../api/log";

class ModalLog extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    const data = this.handleScheme();
    this.state = {
      _id: "__modalLog",
      title: "Log",
      show: false,
      old: data,
      data: data,
      change: false
    };
  }

  handleScheme = e => {
    return {
      _id: genId("-1"),
      level: "",
      app: "",
      context: "",
      date: new Date(),
      content: {}
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
    this.setState({ show: true });
  };

  handleClose = () => {
    if (this.state.change) {
      this.setState({ data: this.state.old, change: false });
    }
    this.handleHide();
  };

  handleOk = e => {
    this.handleHide();
  };

  handleDelete = e => {
    const id = this.state.data._id;
    Log.delete(id).then(result => {
      if (result.msg === "") {
        this.handleExecute(result.data);
      }
    });
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show !== this.state.show && this.state.show) {
      if (this.props.isNew) {
        this.handleNew();
      } else {
        this.handleData();
      }
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
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <ModalHeader title={this.state.title} handleClose={this.handleClose} />
                  <div className="modal-body">
                    <div className="modal-box">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group input-group-sm row">
                            <label className="col-2 col-form-label-sm">Date</label>
                            <div className="col-10">
                              <Input
                                id={`${this.state._id}_caption`}
                                type="texty"
                                className="form-control form-control-sm"
                                readOnly
                                placeholder="Date"
                                name="date"
                                _state="0"
                                value={formatDateTime(this.state.data.date, "d MMM yyyy h:mm a")}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="form-group input-group-sm row">
                            <label className="col-2 col-form-label-sm">Level</label>
                            <div className="col-10">
                              <Input
                                type="texty"
                                className="form-control form-control-sm"
                                readOnly
                                placeholder="Level"
                                name="level"
                                _state="0"
                                value={this.state.data.level}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="form-group input-group-sm row">
                            <label className="col-2 col-form-label-sm">Context</label>
                            <div className="col-10">
                              <Input
                                type="texty"
                                className="form-control form-control-sm"
                                readOnly
                                placeholder="Context"
                                name="context"
                                _state="0"
                                value={this.state.data.context}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="form-group input-group-sm row">
                            <label className="col-2 col-form-label-sm">Content</label>
                            <div className="col-10">
                              <Textarea
                                className="form-control notresize"
                                readOnly
                                rows={16}
                                name="content"
                                value={JSON.stringify(this.state.data.content)}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="float-left">
                      <Button className="btn btn-outline-secondary btn-sm" onClick={this.handleDelete}>
                        Borrar
                      </Button>
                    </div>
                    <Button className="btn btn-outline-secondary btn-sm" onClick={this.handleClose}>
                      Cerrar
                    </Button>
                    <Button className="btn btn-primary btn-sm" _state={this.state.data._state} onClick={this.handleOk}>
                      Aceptar
                    </Button>
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

export default ModalLog;
