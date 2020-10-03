import React from "react";
import "../styles/view.scss";
import { Redirect } from "react-router-dom";
import { Loading, Subscribe, UnSubscribe, updateList } from "../components/utilities";
import ModalUser from "../modals/modalUser";
import ViewSearch from "../components/viewSearch";
import TabUsers from "../components/tabUsers";
import { Api as Project } from "../services/project";
import { connect } from "react-redux";

class ViewUsers extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      _class: "USERS",
      _id: "__ViewUsers",
      name: "users",
      title: "Usuarios",
      rows: this.props.view_rows,
      data: {
        project_id: "-1",
        int: 0,
        end: 0,
        list: [],
        page: 1,
        rows: 30,
        count: 0,
        state: "0",
        all: 0,
        search: ""
      },
      printParams: {
        _class: "USERS",
        _id: "-1",
        single: false
      }
    };
  }

  handleChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  eventSetData = e => {
    setTimeout(() => {
      this.handleUpdate(e);
    }, 500);
  };

  handleSetData = e => {
    if (!this.props.online) {
      this.handleUpdate(e.data);
    } else if (e.action === "del") {
      const data = e.data;
      const list = this.state.data.list;
      const index = list.findIndex(element => element._id === data._id);
      if (index > -1) {
        list.splice(index, 1);
        this.setState({
          data: {
            ...this.state.data,
            list: list
          }
        });
      }
    }
  };

  handleData = e => {
    const project_id = this.props.project_id;
    const state = this.state.data.state;
    const search = this.state.data.search;
    const rows = this.state.rows;
    if (e.scroll) {
      const move = e.move || 1;
      const page = this.state.data.page + move;
      Project.users(project_id, state, search, page, rows, this.state.data.list).then(result => {
        const data = result.data;
        this.setState({
          data: data
        });
      });
    } else {
      Project.users(project_id, state, search, 1, rows).then(result => {
        const data = result.data;
        this.setState({
          data: data
        });
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

  componentDidMount() {
    Subscribe(`${this.state.name}/${this.props.project_id}`, event => this.eventSetData(event));
    this.handleData({ scroll: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps._view === this.props._view && this.props.project_id !== "-1") {
      if (prevProps.project_id !== this.props.project_id) {
        UnSubscribe(`${this.state.name}/${prevProps.project_id}`, event => this.eventSetData(event));
        Subscribe(`${this.state.name}/${this.props.project_id}`, event => this.eventSetData(event));
        this.handleData({ scroll: false });
      }
    } else if (prevState.data.state !== this.state.data.state) {
      this.handleData({ scroll: false });
    }
  }

  componentWillUnmount() {
    UnSubscribe(`${this.state.name}/${this.props.project_id}`, event => this.eventSetData(event));
  }

  render() {
    if (this.props._view !== this.props.location.pathname) {
      return <Redirect to={this.props._view} push={true} />;
    }
    return (
      <React.Fragment>
        <div className={this.state._id}>
          <div className="viewcontainer">
            <ViewSearch
              title={this.state.title}
              _class={this.state._class}
              single={false}
              data={this.state.data}
              printParams={this.state.printParams}
              Modal={ModalUser}
              handleChange={this.handleChange}
              handleKeyDown={this.handleKeyDown}
              handleSearch={this.handleSearch}
              setData={this.handleSetData}
            />
            <div className="view-scrolling" id={`${this.state._id}_scroll`} onScroll={this.handleScrolling}>
              <div className="row view-boxed">
                <TabUsers data={this.state.data} setData={this.handleSetData} />
              </div>
            </div>
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
    _view: state.sistem.folder._view || "",
    view_rows: state.sistem.view_rows,
    online: state.sistem.online
  };
}

export default connect(mapStateToProps)(ViewUsers);
