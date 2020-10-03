import React from "react";
import ReactDOM from "react-dom";
import "../styles/modal.scss";
import { pdf, xls } from "../components/http";
import { showModal, hideModal, toolTip, getValue, getData, getRowValue } from "../components/utilities";
import DateTime from "../components/dateTime";
import ModalHeader from "../components/modalHeader";
import { Api as System } from "../services/system";
import { connect } from "react-redux";
import environment from "../env/env";
const apiUrl = environment.url;

class ModalPrint extends React.Component {
  constructor(props) {
    super(props);
    const name = "ModalPrint";
    this.state = {
      _id: "__modalPrint",
      name: name,
      params: {},
      prints: [],
      filters: [],
      select: {
        _id: "-1",
        caption: "",
        description: "",
        filter_tp: "-1",
        single: false,
        _data: {
          filters: [],
          url_print: "",
          url_xls: ""
        }
      },
      show: false,
      change: false
    };
    this.result = {};
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
      change: true
    });
  };

  handleExeute = e => {
    if (typeof this.props.onChange === "function") {
      this.props.onChange(e);
    }
  };

  handleHide() {
    hideModal(this.state._id);
    this.setState({ show: false });
  }

  handleShow = e => {
    this.setState({ show: true, change: false });
  };

  handleClose = e => {
    this.handleHide();
  };

  handleFilter = async () => {
    const select = this.state.select;
    const params = this.props.params;
    const filters = this.props.filters;
    console.log(params);
    let project_id = this.props.project_id;
    let _id = getValue(params, "_id", "-1");
    let user_id = this.props.user_id;
    const filter1 = getRowValue(filters, 0, "value", "");
    const filter2 = getRowValue(filters, 1, "value", "");
    const filter3 = getRowValue(filters, 2, "value", "");
    const filter4 = getRowValue(filters, 3, "value", "");
    const filter5 = getRowValue(filters, 4, "value", "");
    let url = getData(select, "url_print", "");
    url = url.replace("$project_id", project_id);
    url = url.replace("$_id", _id);
    url = url.replace("$user_id", user_id);
    url = url.replace("$filter1", filter1);
    url = url.replace("$filter2", filter2);
    url = url.replace("$filter3", filter3);
    url = url.replace("$filter4", filter4);
    url = url.replace("$filter5", filter5);
    return url;
  };

  handlePrint = async e => {
    const url = await this.handleFilter();
    pdf(`${apiUrl}/${url}`);
    this.handleExeute();
    this.handleHide();
  };

  handleExport = async e => {
    const url = await this.handleFilter();
    xls(`${apiUrl}/${url}`);
    this.handleExeute();
    this.handleHide();
  };

  handleSelect = e => {
    this.setState({ select: e });
  };

  handleData = () => {
    const params = this.props.params;
    const project_id = this.props.project_id;
    const _class = getValue(params, "_class", "-1");
    const single = getValue(params, "single", false);
    System.prints(project_id, _class, single).then(result => {
      const msg = getValue(result, "msg", "");
      let data = result.data;
      if (msg !== "") {
        data = [];
      }
      let select = this.state.select;
      if (data.length > 0) {
        select = data[0];
      }
      this.setState({ prints: data, select });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show !== this.state.show && this.state.show) {
      showModal(this.state._id);
      this.handleData();
    }
  }

  componentWillUnmount() {
    hideModal(this.state._id);
  }

  render() {
    toolTip();
    if (!this.state.show) {
      return (
        <React.Fragment>
          <div
            className={this.props.className}
            data-toggle="tooltip"
            data-placement={this.props.placement || "bottom"}
            title={this.props.title}
            onClick={this.handleShow}
          >
            {this.props.children}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div
            className={this.props.className}
            data-toggle="tooltip"
            data-placement={this.props.placement || "bottom"}
            title={this.props.title}
            onClick={this.handleShow}
          >
            {this.props.children}
          </div>
          {ReactDOM.createPortal(
            <div className="modal fade" id={this.state._id} role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <ModalHeader title="Imprimir o exportar" handleClose={this.handleClose} />
                  <div className="modal-body">
                    <div className="modalPrint">
                      <div className="grid-1">
                        <div className="modalListBody modalPrintList">
                          {this.state.prints.map((item, i) => {
                            return (
                              <div
                                key={i}
                                className={this.state.select._id === item._id ? "modalLisRow b-none active" : "modalLisRow b-none"}
                                onClick={() => this.handleSelect(item)}
                              >
                                <div className="grid-1 td bb-0">{item.caption}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="modalPrintParams">
                        <div className="modalPrintTitle">{this.state.select.description}</div>
                        <div className="modalPrintParam">
                          {getData(this.state.select, "filters", []).map((item, i) => {
                            if (getValue(item, "type", "") === "list") {
                              return (
                                <div key={i} className="form-group row mb-2">
                                  <label className="col-sm-4 col-form-label">{getValue(item, "caption", "")}</label>
                                  <div className="col-sm-8 input-group input-group-sm mb-1">
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="nope"
                                      placeholder="Recipient's username"
                                    ></input>
                                    <div className="input-group-append">
                                      <span className="input-group-text">
                                        <i className="fa fa-ellipsis-h"></i>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            } else if (getValue(item, "type", "") === "dateTime") {
                              return (
                                <div key={i} className="form-group row mb-2">
                                  <label className="col-sm-4 col-form-label">{getValue(item, "caption", "")}</label>
                                  <div className="col-sm-8 input-group-sm mb-1">
                                    <DateTime
                                      type="text"
                                      className="form-control form-control-sm"
                                      placeholder="Recipient's username"
                                      showTimeSelect
                                      timeFormat="hh:mm aa"
                                      timeIntervals={5}
                                      _state="0"
                                      timeCaption="Hora"
                                      dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                  </div>
                                </div>
                              );
                            } else {
                              return <div key={i} className="form-group row mb-2"></div>;
                            }
                          })}
                        </div>
                        <div className={this.state.prints.length === 0 ? "modalPrintDescription" : "d-none"}>
                          ¡No hay impresiones asignadas!
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="float-left">
                      <button
                        type="button"
                        className={getData(this.state.select, "url_xls", "") === "" ? "d-none" : "btn btn-outline-success btn-sm"}
                        onClick={this.handleExport}
                      >
                        Exportar
                      </button>
                    </div>
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.handleClose}>
                      Cerrar
                    </button>
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.handlePrint}>
                      Imprimir
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
    _class: state.sistem.folder._class,
    _view: state.sistem.folder._view || "",
    user_id: state.sistem.profile._id || "-1"
  };
}

export default connect(mapStateToProps)(ModalPrint);
