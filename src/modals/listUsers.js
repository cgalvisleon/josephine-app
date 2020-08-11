import React from "react";
import ReactDOM from "react-dom";
import "../styles/modal.scss";
import {
  Loading,
  showModal,
  hideModal,
  Subscribe,
  UnSubscribe,
  isOnLine,
  getValue,
  emptyValue,
  updateList,
  getVar
} from "../components/utilities";
import ModalHeaderList from "../components/modalHeaderList";
import ModalSearch from "../components/modalSearch";
import ModalList from "../components/modalList";
import ModalSelect from "../components/modalSelect";
import ModalUser from "./modalUser";
import ModalFooterList from "../components/modalFooterList";
import { Api as Project } from "../api/project";

class ListUsers extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      _id: "__listUsers",
      title: "Usuarios",
      name: "users",
      show: false,
      rows: getVar("view_rows", "views", 30),
      data: {
        list: [],
        state: getValue(props, "state", "0"),
        search: getValue(props, "search", ""),
        page: 1,
        rows: 30,
        int: 0,
        end: 0,
        count: 0,
        all: 0
      },
      select: { _id: "-1", caption: "" },
      change: false
    };
  }

  eventSetData = e => {
    setTimeout(() => {
      this.handleUpdate(e);
    }, 1000);
  };

  handleSetData = e => {
    if (!isOnLine) {
      this.handleUpdate(e);
    }
    this.handleSelect(e);
  };

  handleChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
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
    if (this.props._state === "0") {
      this.setState({
        data: {
          ...this.state.data,
          search: ""
        },
        show: true
      });
    }
  };

  handleClose = () => {
    this.handleHide();
  };

  handleOk = () => {
    if (this.state.change) {
      this.handleExecute(this.state.select);
    } else {
      this.handleHide();
    }
  };

  handleRemove = () => {
    this.handleSelect({});
    this.handleExecute({});
    this.handleHide();
  };

  handleData = scroll => {
    const project_id = this.props.project_id;
    const state = this.state.data.state;
    const search = this.state.data.search;
    const rows = this.state.rows;
    if (scroll) {
      const page = this.state.data.page + 1;
      Project.users(project_id, state, search, page, rows, this.state.data.list).then(result => {
        const data = result.data;
        this.setState({
          data: {
            ...this.state.data,
            list: data.list,
            state: data.state,
            search: data.search,
            page: data.page,
            rows: data.rows,
            int: data.int,
            end: data.end,
            count: data.count,
            all: data.all
          }
        });
      });
    } else {
      Project.users(project_id, state, search, 1, rows, [this.state.select]).then(result => {
        const data = result.data;
        this.setState({
          data: {
            ...this.state.data,
            list: data.list,
            state: data.state,
            search: data.search,
            page: data.page,
            rows: data.rows,
            int: data.int,
            end: data.end,
            count: data.count,
            all: data.all
          },
          change: false
        });
      });
    }
  };

  handleInit = () => {
    const _id = getValue(this.props.select, "_id", "-1");
    if (_id === "-1") {
      this.handleData(false);
    } else {
      Project.user(_id, this.props.project_id).then(result => {
        const data = emptyValue(result, "data", { _id: "-1", caption: "" });
        this.setState({ select: data, change: false });
        this.handleData(false);
      });
    }
  };

  handleSearch = () => {
    this.handleData(false);
  };

  handleSelect = e => {
    this.setState({ select: e, change: true });
  };

  handleUpdate = e => {
    const result = updateList(this.state.data, e);
    this.setState({ data: result, change: true });
  };

  componentDidMount() {
    Subscribe(`${this.state.name}/${this.props.project_id}`, event => this.eventSetData(event));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show !== this.state.show && this.state.show) {
      this.handleInit();
      showModal(this.state._id);
    }
  }

  componentWillUnmount() {
    UnSubscribe(`${this.state.name}/${this.props.project_id}`, event => this.eventSetData(event));
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
              <div className="modal-dialog __modalSingleList" role="document">
                <div className="modal-content">
                  <ModalHeaderList
                    title={this.state.title}
                    handleClose={this.handleClose}
                    state={this.state.data.state}
                    rows={this.state.data.end}
                    all={this.state.data.all}
                  />
                  <div className="modal-body">
                    <div className="modalList">
                      <div className="modalListFind">
                        <ModalSearch
                          name="search"
                          value={this.state.data.search}
                          onChange={this.handleChange}
                          onSearch={this.handleSearch}
                        ></ModalSearch>
                      </div>
                      <div className="modalListList">
                        <ModalList
                          id={`${this.state._id}_scroll`}
                          _state={this.state.data.state}
                          list={this.state.data.list}
                          select={this.state.select}
                          getData={this.handleData}
                          onSelect={this.handleSelect}
                        />
                      </div>
                      <div className="modalListSelect">
                        <ModalSelect
                          project_id={this.props.project_id}
                          select={this.state.select}
                          setData={this.handleSetData}
                          Modal={ModalUser}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <ModalFooterList
                      project_id={this.props.project_id}
                      _state={this.state.data._state}
                      onRemove={this.handleRemove}
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

export default ListUsers;
