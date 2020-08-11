import React from "react";
import "../styles/view.scss";
import { Redirect } from "react-router-dom";
import {
  Loading,
  getView,
  Subscribe,
  UnSubscribe,
  formatDateTime,
  Event,
  EventUnSubscribe,
  formatInteger,
  updateList,
  getVar
} from "../components/utilities";
import ModalLog from "../modals/modalLog";
import Row from "../components/row";
import { Api as Logs } from "../api/log";

class ViewLogs extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      _id: "__ViewLogs",
      _view: getView(),
      rows: getVar("view_rows", "views", 30),
      data: {
        int: 0,
        end: 0,
        list: [],
        page: 1,
        rows: 30,
        count: 0,
        all: 0,
        search: ""
      },
      select: { _id: "" }
    };
  }

  eventSetView = e => {
    this.setState({ _view: e });
  };

  eventSetData = e => {
    setTimeout(() => {
      this.handleUpdate(e);
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  handleData = e => {
    const search = this.state.data.search;
    const rows = this.state.rows;
    if (e.scroll) {
      const move = e.move || 1;
      const page = this.state.data.page + move;
      Logs.logs(search, page, rows, this.state.data.list).then(result => {
        const data = result.data;
        this.setState({ data: data });
      });
    } else {
      Logs.logs(search, 1, rows).then(result => {
        const data = result.data;
        this.setState({ data: data });
      });
    }
  };

  handleScrolling = e => {
    const h = e.target.scrollTop + e.target.clientHeight;
    if (e.target.id === `${this.state._id}_scroll` && h === e.target.scrollHeight) {
      this.handleData({ scroll: true });
    }
  };

  handleSearch = () => {
    this.handleData({ scroll: false });
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.handleSearch();
    }
  };

  handleUpdate = e => {
    const result = updateList(this.state.data, e);
    this.setState({ data: result });
  };

  handleSelected = e => {
    this.setState({ select: e });
  };

  componentDidMount() {
    Subscribe("logs", event => this.eventSetData(event));
    Event("__viewInit", this.eventSetView);
    this.handleData({ scroll: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data.project_id !== this.state.data.project_id) {
      this.handleData({ scroll: false });
    } else if (prevState.data.state !== this.state.data.state) {
      this.handleData({ scroll: false });
    }
  }

  componentWillUnmount() {
    UnSubscribe(`logs`, event => this.eventSetData(event));
    EventUnSubscribe("__viewInit", this.eventSetView);
  }

  render() {
    if (this.state._view !== this.props.location.pathname) {
      return <Redirect to={this.state._view} push={true} />;
    }
    return (
      <React.Fragment>
        <div className="__viewLogs">
          <div className="viewcontainer">
            <nav className="navbar navbar-light bg-light view-navbar">
              <div className="navbar-brand view-title">
                Log viewer
                {this.state.data.all > 0 ? ` (${formatInteger(this.state.data.all)})` : ""}
              </div>
              <div className="form-inline">
                <div className="input-group input-group-sm">
                  <input type="text" className="form-control" autoComplete="nope" placeholder="Buscar" />
                  <div className="input-group-append">
                    <button className="btn btn-secondary">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
            <div className="view-container">
              <div className="dtable pb-3">
                <div className="dtable-head">
                  <Row className="dtable-row" cols="60px 110px auto 160px">
                    <div className="dtable-th">Level</div>
                    <div className="dtable-th">Context</div>
                    <div className="dtable-th">Content</div>
                    <div className="dtable-th">Date</div>
                  </Row>
                </div>
                <div className="dtable-details" id={`${this.state._id}_scroll`} onScroll={this.handleScrolling}>
                  {this.state.data.list.map((item, i) => {
                    return (
                      <Row
                        key={i}
                        className={item._state === "-2" ? "dtable-row d-none" : "dtable-row"}
                        cols="60px 110px auto 156px"
                        data={item}
                        _id={item._id}
                        selectedId={this.state.select._id}
                        selected={this.handleSelected}
                      >
                        <div className="dtable-td t-c">{item.level}</div>
                        <div className="dtable-td t-c">{item.context}</div>
                        <ModalLog className="dtable-td link" data={item}>
                          {JSON.stringify(item.content)}
                        </ModalLog>
                        <div className="dtable-td t-c">{formatDateTime(item.date, "d MMM yyyy h:mm a")}</div>
                      </Row>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewLogs;
