import React from "react";
import ReactDOM from "react-dom";
import "../styles/modal.scss";
import { Loading, showModal, hideModal, emptyValue, getValue, getRow, getVar } from "../components/utilities";
import ModalHeaderList from "../components/modalHeaderList";
import ModalSearch from "../components/modalSearch";
import ModalList from "../components/modalList";
import ModalFooterList from "../components/modalFooterList";
import { Api as Project } from "../api/project";

class ListCitys extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    const name = "ListCitys";
    this.state = {
      _id: "__listCitys",
      title: "Ciudades",
      name: name,
      show: false,
      rows: getVar("view_rows", "views", 30),
      mains: [],
      main_id: "-1",
      data: {
        list: [],
        state: "0",
        search: "",
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

  handleChangeMain = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
    this.setState({ mains: [], main_id: "-1", show: false, change: false });
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

  handleOk = e => {
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
    const main_id = this.state.main_id;
    const search = this.state.data.search;
    const rows = this.state.rows;
    if (scroll) {
      const page = this.state.data.page + 1;
      Project.dpas(main_id, "CITY", "0", search, page, rows, this.state.data.list).then(result => {
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
      Project.dpas(main_id, "CITY", "0", search, 1, rows, [this.state.select]).then(result => {
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
    const _id = emptyValue(this.props, "city_id", "-1");
    Project.dpa(_id).then(result => {
      const select = emptyValue(result, "data", { _id: "-1", caption: "" });
      let main_id = getValue(select, "main_id", "-1");
      Project.dpas("COL", "DEPARTAMENT", "0", "", 1, 100).then(result => {
        const data = result.data;
        const mains = data.list;
        if (main_id === "-1") {
          main_id = getRow(mains, 0, "_id", "-1");
        }
        this.setState({
          mains: mains,
          main_id: main_id,
          data: {
            list: [],
            state: "0",
            search: "",
            page: 1,
            rows: 30,
            int: 0,
            end: 0,
            count: 0,
            all: 0
          },
          select: select,
          change: true
        });
      });
    });
  };

  handleSearch = () => {
    this.handleData(false);
  };

  handleSelect = e => {
    this.setState({ select: e, change: true });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show !== this.state.show && this.state.show) {
      this.handleInit();
      showModal(this.state._id);
    } else if (this.state.show && prevState.main_id !== this.state.main_id) {
      this.handleData(false);
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
                    <div className="modalList master">
                      <div className="modalListMaster input-group-sm">
                        <select className="custom-select" name="main_id" value={this.state.main_id} onChange={this.handleChangeMain}>
                          {this.state.mains.map((item, i) => {
                            return (
                              <React.Fragment key={i}>
                                <option value={item._id}>{item.caption}</option>
                              </React.Fragment>
                            );
                          })}
                        </select>
                      </div>
                      <div className="modalListFind">
                        <ModalSearch
                          name="search"
                          value={this.state.data.search}
                          onChange={this.handleChange}
                          onSearch={this.handleSearch}
                        />
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

export default ListCitys;
