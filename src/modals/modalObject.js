import React from "react";
import ReactDOM from "react-dom";
import "../styles/modal.scss";
import "../styles/suport.scss";
import { showModal, hideModal, ShowInfo, msg, getValue, genId, getRow, getRowData, clone, ShowAlert } from "../components/utilities";
import { ALERT002 } from "../components/msg";
import ModalHeaderSuport from "../components/modalHeaderSuport";
import ModalFooterSuport from "../components/modalFooterSuport";
import Td from "../components/td";
import { connect } from "react-redux";

class ModalObject extends React.Component {
  constructor(props) {
    super(props);
    const data = this.handleScheme();
    this.state = {
      _id: "__modalObject",
      title: "Object",
      name: "object",
      show: false,
      old: data,
      data: data,
      isNew: props.isNew || false,
      change: false,
      printParams: {}
    };
  }

  handleScheme = e => {
    return {
      project_id: this.props.project_id,
      _class: "CONTACT",
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

  handleChangeData = e => {
    this.setState({
      data: {
        ...this.state.data,
        _data: {
          ...this.state.data._data,
          [e.target.name]: e.target.value
        }
      },
      change: true
    });
  };

  handleExecute = e => {
    const _state = this.props._state || "0";
    if (typeof this.props.setData === "function" && _state === "0") {
      this.props.setData(e);
    }
    this.handleHide();
  };

  handleHide = () => {
    hideModal(this.state._id);
    this.setState({ show: false });
  };

  handleShow = () => {
    const _state = this.props._state || "0";
    if (_state === "0") {
      this.setState({
        show: true,
        change: false
      });
    }
  };

  handleClose = e => {
    if (this.state.change && e) {
      this.handleOk();
    } else {
      this.handleHide();
    }
  };

  handleOk = () => {
    if (this.state.change) {
      /*
      const id = this.state.data._id;
      const params = this.state.data;
      Api.set(id, params).then(result => {
        if (result.msg === '') {
          const data = result.data;
          this.setState({ old: data, data: data, change: false, isNew: false });
          this.handleExecute(data);
        }
      });*/
    } else {
      this.handleHide();
    }
  };

  handleState = e => {
    if (this.state.change) {
      ShowAlert(ALERT002);
    } else {
      const _state = getValue(this.state.data, "_state");
      if (_state !== e) {
        /*
      const id = getValue(this.state.data, '_id');
      Api.state(id, e).then(result => {
        if (result.msg === '') {
          const data = clone(result.data);
          this.setState({ old: result.data, data: data, change: false });
          this.handleExecute(data);
        }
      });*/
      }
    }
  };

  handleFind = id => {
    if (this.state.change) {
      ShowInfo(msg("MSG-CHANGE"));
    } else if (id !== "-1") {
      /*
      Api.get(id, this.props.project_id).then(result => {
        if (result.msg === '') {
          const data = result.data;
          this.setState({ old: data, data: data, change: false, isNew: false });
          this.handleOperations(false);
        } else {
          this.handleHide();
        }
      });*/
    }
  };

  handlePrior = e => {
    const _id = getValue(this.state.data, "prior_id", "-1");
    if (_id === "-1") {
      ShowInfo(msg("MSG-FIRST-ROW"));
    } else {
      this.handleFind(_id);
    }
  };

  handleNext = e => {
    const _id = getValue(this.state.data, "next_id", "-1");
    if (_id === "-1") {
      ShowInfo(msg("MSG-END-ROW"));
    } else {
      this.handleFind(_id);
    }
  };

  handleSetData = e => {
    this.setState({
      old: e.data,
      data: e.data,
      change: e.change,
      isNew: e.isNew,
      printParams: {
        project_id: e.data.project_id,
        _class: e.data._class,
        single: true
      }
    });
    showModal(this.state._id);
  };

  handleData = () => {
    const data = clone(this.props.data);
    this.handleSetData({ data, isNew: false, change: false });
  };

  handleNew = () => {
    const data = this.handleScheme();
    this.handleSetData({ data, isNew: true, change: true });
  };

  handlePrintDetails = e => {
    const items = this.state.data.detail || [];
    let result = [];

    for (let i = 0; i < e; i++) {
      const item = getRow(items, i);
      result.push(
        <Td key={i} className="suport-item" cols="25px 145px 75px auto 250px">
          <div className="suport-td t-c">{i + 1}</div>
          <div className="suport-td t-l">{getRowData(items, i, "clase", "")}</div>
          <div className="suport-td t-c">{getRowData(items, i, "code", "")}</div>
          <div className="suport-td t-l">{getRowData(items, i, "type", "")}</div>
          <div className="suport-td bt">
            {getRowData(items, i, "sitio", "")}
            <div
              className="input-group-text sp"
              project_id={this.props.project_id}
              report_id={this.state.data._id}
              _state={this.state.data._state}
              index={i}
              data={item}
              setData={this.handleChangeAsset}
            >
              <i className="fa fa-ellipsis-h"></i>
            </div>
          </div>
        </Td>
      );
    }
    return result;
  };

  handleDetail = e => {
    if (e.scroll) {
    } else {
    }
  };

  handleScrolling = e => {
    const h = e.target.scrollTop + e.target.clientHeight;
    if (e.target.id === `${this.state._id}_individual_scrooll` && h === e.target.scrollHeight) {
      this.handleDetail({ scroll: true });
    }
  };

  handleSearch = () => {
    this.handleDetail({ scroll: false });
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
    }
  }

  componentWillUnmount() {
    hideModal(this.state._id);
  }

  render() {
    if (!this.state.show) {
      return (
        <React.Fragment>
          <div className={this.props.className} disabled={!(this.props._state === "0")} onClick={this.handleShow}>
            {this.props.children}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className={this.props.className} disabled={!(this.props._state === "0")} onClick={this.handleShow}>
            {this.props.children}
          </div>
          {ReactDOM.createPortal(
            <div className="modal fade" id={this.state._id} role="dialog">
              <div className="modal-dialog __modalObject sm" role="document">
                <div className="modal-content">
                  <ModalHeaderSuport
                    title={this.state.data.caption}
                    _state={this.state.data._state}
                    isNew={this.state.isNew}
                    authorized={this.state.data.authorized}
                    change={this.state.change}
                    handleClose={this.handleClose}
                    handlePrior={this.handlePrior}
                    handleNext={this.handleNext}
                  />
                  <div className="modal-body-tabs">
                    <nav>
                      <div className="nav nav-tabs" role="tablist">
                        <a
                          className="nav-item nav-link active"
                          id={`${this.state._id}-nav-1-tab`}
                          data-toggle="tab"
                          href={`#${this.state._id}-nav-1`}
                          role="tab"
                          aria-selected="true"
                        >
                          Home
                        </a>
                        <a
                          className="nav-item nav-link"
                          id={`${this.state._id}-nav-2-tab`}
                          data-toggle="tab"
                          href={`#${this.state._id}-nav-2`}
                          role="tab"
                          aria-selected="false"
                        >
                          Profile
                        </a>
                        <a
                          className="nav-item nav-link"
                          id={`${this.state._id}-nav-3-tab`}
                          data-toggle="tab"
                          href={`#${this.state._id}-nav-3`}
                          role="tab"
                          aria-selected="false"
                        >
                          Contact
                        </a>
                      </div>
                    </nav>
                    <div className="tab-content modal">
                      <div
                        className="tab-pane fade show active"
                        id={`${this.state._id}-nav-1`}
                        role="tabpanel"
                        aria-labelledby={`${this.state._id}-nav-1-tab`}
                      >
                        1...
                      </div>
                      <div
                        className="tab-pane fade"
                        id={`${this.state._id}-nav-2`}
                        role="tabpanel"
                        aria-labelledby={`${this.state._id}-nav-2-tab`}
                      >
                        2...
                      </div>
                      <div
                        className="tab-pane fade"
                        id={`${this.state._id}-nav-3`}
                        role="tabpanel"
                        aria-labelledby={`${this.state._id}-nav-3-tab`}
                      >
                        3...
                      </div>
                    </div>
                  </div>
                  <ModalFooterSuport
                    data={this.state.data}
                    change={this.state.change}
                    _state={this.state.data._state}
                    send={false}
                    isNew={this.state.isNew}
                    printParams={this.state.printParams}
                    handleState={this.handleState}
                    handleNew={this.handleNew}
                    handleClose={this.handleClose}
                    handleOk={this.handleOk}
                  />
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
    online: state.sistem.online
  };
}

export default connect(mapStateToProps)(ModalObject);
