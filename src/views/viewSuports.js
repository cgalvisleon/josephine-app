import React from "react";
import "../styles/view.scss";
import { Redirect } from "react-router-dom";
import { Loading, Subscribe, UnSubscribe, updateList } from "../components/utilities";
import ViewTop from "../components/viewTop";
import ViewList from "../components/viewList";
import getModal from "../components/modals";
import { Api as Project } from "../services/project";
import { Actions as Sistem } from "../services/actions/sistem";
import { connect } from "react-redux";

class ViewSuports extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      _id: "__ViewSuports",
      title: "Reportes",
      rows: this.props.view_rows,
      field: "",
      data: {
        list: [],
        project_id: "-1",
        state: Sistem.getVar(this.props.project_id, `${this.props._class}_state`, "ALL"),
        search: "",
        int: 0,
        end: 0,
        page: 1,
        rows: 30,
        count: 0,
        all: 0
      },
      printParams: {
        _class: this.props._class,
        single: false
      },
      select: { _id: "-1", caption: "" }
    };
  }

  eventSetData = e => {
    setTimeout(() => {
      this.handleUpdate(e);
    }, 500);
  };

  handleSetData = e => {
    if (!this.props.online) {
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
    const project_id = this.props.project_id;
    const _class = this.props._class;
    const state = this.state.data.state;
    const search = this.state.data.search;
    const rows = this.state.rows;
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
      Project.documents(project_id, _class, state, search, 1, rows, []).then(result => {
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

  handleState = e => {
    const state = Sistem.setVar(this.props.project_id, `${this.props._class}_state`, e);
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
    this.setState({
      data: result
    });
  };

  componentDidMount() {
    Subscribe(`${this.props._class}/${this.props.project_id}`, event => this.eventSetData(event));
    this.handleData(false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps._view === this.props._view && this.props.project_id !== "-1") {
      if (prevProps.project_id !== this.props.project_id || prevProps._class !== this.props._class) {
        UnSubscribe(`${prevProps._class}/${prevProps.project_id}`, event => this.eventSetData(event));
        Subscribe(`${this.props._class}/${this.props.project_id}`, event => this.eventSetData(event));
        this.handleData(false);
      }
    } else if (prevState.data.state !== this.state.data.state) {
      this.handleData(false);
    }
  }

  componentWillUnmount() {
    UnSubscribe(`${this.props._class}/${this.props.project_id}`, event => this.eventSetData(event));
  }

  render() {
    if (this.props._view !== this.props.location.pathname) {
      return <Redirect to={this.props._view} push={true} />;
    }
    let modal = getModal(this.props._class);

    return (
      <React.Fragment>
        <div className={this.state._id}>
          <div className="viewcontainerList">
            <ViewTop
              project_id={this.props.project_id}
              data={this.state.data}
              printParams={this.state.printParams}
              views={[
                { _id: "ALL", caption: "Todos" },
                { _id: "0", caption: "Activos" },
                { _id: "1", caption: "Terminados" },
                { _id: "2", caption: "Cancelados" }
              ]}
              fields={[
                { _id: "code", caption: "Código", field: '"code":"00000001"' },
                { _id: "", caption: "Todos", field: "" }
              ]}
              field={this.state.field}
              Modal={modal}
              onChange={this.handleChange}
              onState={this.handleState}
              onField={this.handleField}
              onSearch={this.handleSearch}
              setData={this.handleSetData}
            />
            <ViewList
              project_id={this.props.project_id}
              _state={this.state.data.state}
              data={this.state.data}
              select={this.state.select}
              Modal={modal}
              onData={this.handleData}
              onSelected={this.handleSelected}
              setData={this.handleSetData}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    signin: state.sistem.signin,
    project_id: state.sistem.project._id || "-1",
    forlder: state.sistem.folder,
    _class: state.sistem.folder._class,
    _view: state.sistem.folder._view || "",
    view_rows: state.sistem.view_rows,
    online: state.sistem.online
  };
}

export default connect(mapStateToProps)(ViewSuports);
