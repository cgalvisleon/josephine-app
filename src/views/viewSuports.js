import React from "react";
import "../styles/view.scss";
import { Redirect } from "react-router-dom";
import {
  Loading,
  getFolder,
  projectId,
  Event,
  EventUnSubscribe,
  Subscribe,
  UnSubscribe,
  setVar,
  getVar,
  isOnLine,
  updateList
} from "../components/utilities";
import ViewTop from "../components/viewTop";
import ViewList from "../components/viewList";
import getModal from "../components/modals";
import { Api as Project } from "../api/project";

class ViewSuports extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    const project_id = projectId();
    const folder = getFolder();
    this.state = {
      _id: "__ViewSuports",
      title: "Reportes",
      project_id: project_id,
      _class: folder._class,
      _view: folder._view,
      field: "",
      data: {
        list: [],
        project_id: project_id,
        state: getVar(project_id, `${folder._class}_state`, "ALL"),
        search: "",
        int: 0,
        end: 0,
        page: 1,
        rows: 30,
        count: 0,
        all: 0
      },
      printParams: {
        project_id: project_id,
        _class: folder._class,
        single: false
      },
      select: { _id: "-1" }
    };
  }

  eventSetView = e => {
    const project_id = projectId();
    if (this.state._view !== e) {
      this.setState({ _view: e, project_id: project_id });
    } else if (this.state.project_id !== project_id) {
      this.setState({ project_id: project_id });
    }
  };

  eventSetFolder = e => {
    if (this.state._class !== e._class && this.state._view === e._view) {
      this.setState({
        _class: e._class,
        printParams: {
          ...this.state.printParams,
          _class: e._class
        }
      });
    }
  };

  eventSetData = e => {
    setTimeout(() => {
      this.handleUpdate(e);
    }, 1000);
  };

  handleSetData = e => {
    if (!isOnLine) {
      this.handleUpdate(e);
    }
  };

  handleChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSelected = e => {
    this.setState({ select: e });
  };

  handleData = scroll => {
    const project_id = this.state.project_id;
    const _class = this.state._class;
    const state = this.state.data.state;
    const search = this.state.data.search;
    const rows = this.state.data.rows;
    if (scroll) {
      const page = this.state.data.page + 1;
      Project.documents(project_id, _class, state, search, page, rows, this.state.data.list).then(result => {
        if (result.msg === "") {
          const data = result.data;
          this.setState({
            data: data,
            printParams: {
              project_id: project_id,
              _class: _class,
              single: false
            }
          });
        }
      });
    } else {
      Project.documents(project_id, _class, state, search, 1, rows).then(result => {
        if (result.msg === "") {
          const data = result.data;
          this.setState({
            data: data,
            printParams: {
              project_id: project_id,
              _class: _class,
              single: false
            }
          });
        }
      });
    }
  };

  handleSearch = () => {
    this.handleData(false);
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.handleSearch();
    }
  };

  handleState = e => {
    const state = setVar(this.state.project_id, `${this.state._class}_state`, e);
    this.setState({
      data: {
        ...this.state.data,
        state: state,
        search: ""
      }
    });
  };

  handleField = e => {
    this.setState({
      field: e._id,
      data: {
        ...this.state.data,
        search: e === "" ? "" : `${e.field}`
      }
    });
  };

  handleUpdate = e => {
    const result = updateList(this.state.data, e);
    this.setState({ data: result });
  };

  componentDidMount() {
    Subscribe(`${this.state._class}/${this.state.project_id}`, event => this.eventSetData(event));
    Event("__viewInit", this.eventSetView);
    Event("__folder", this.eventSetFolder);
    this.handleData(false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState._view === this.state._view && prevState.project_id !== this.state.project_id) ||
      prevState._class !== this.state._class
    ) {
      UnSubscribe(`${prevState._class}/${prevState.project_id}`, event => this.eventSetData(event));
      Subscribe(`${this.state._class}/${this.state.project_id}`, event => this.eventSetData(event));
      this.handleData(false);
    } else if (prevState.data.state !== this.state.data.state) {
      this.handleData(false);
    }
  }

  componentWillUnmount() {
    UnSubscribe(`${this.state._class}/${this.state.project_id}`, event => this.eventSetData(event));
    EventUnSubscribe("__viewInit", this.eventSetView);
    EventUnSubscribe("__folder", this.eventSetFolder);
  }

  render() {
    if (this.state._view !== this.props.location.pathname) {
      return <Redirect to={this.state._view} push={true} />;
    }
    let modal = getModal(this.state._class);

    return (
      <React.Fragment>
        <div className={this.state._id}>
          <div className="viewcontainerList">
            <ViewTop
              project_id={this.state.project_id}
              views={[
                { _id: "ALL", caption: "Todos" },
                { _id: "0", caption: "Activos" },
                { _id: "1", caption: "Terminados" },
                { _id: "2", caption: "Cancelados" }
              ]}
              data={this.state.data}
              printParams={this.state.printParams}
              fields={[
                { _id: "code", caption: "Código", field: '"code":"00000001"' },
                { _id: "", caption: "Todos", field: "" }
              ]}
              field={this.state.field}
              Modal={modal}
              handleChange={this.handleChange}
              handleState={this.handleState}
              handleField={this.handleField}
              handleKeyDown={this.handleKeyDown}
              handleSearch={this.handleSearch}
              setData={this.handleSetData}
            />
            <ViewList
              project_id={this.state.project_id}
              _state={this.state.data.state}
              data={this.state.data}
              select={this.state.select}
              Modal={modal}
              handleData={this.handleData}
              handleSelected={this.handleSelected}
              setData={this.handleSetData}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewSuports;
