import React from "react";
import "../styles/view.scss";
import { Redirect } from "react-router-dom";
import {
  Loading,
  getView,
  projectId,
  Event,
  EventUnSubscribe,
  Subscribe,
  UnSubscribe,
  isOnLine,
  updateList
} from "../components/utilities";
import ModalUser from "../modals/modalUser";
import ViewSearch from "../components/viewSearch";
import TabUsers from "../components/tabUsers";
import { Api as Project } from "../api/project";

class ViewUsers extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      _class: "USERS",
      _id: "__ViewUsers",
      name: "users",
      title: "Usuarios",
      _view: getView(),
      data: {
        project_id: projectId(),
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
        project_id: projectId(),
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

  eventSetView = e => {
    if (this.state._view !== e) {
      this.setState({ _view: e });
    } else if (this.state.data.project_id !== projectId()) {
      this.handleData({ scroll: false });
    }
  };

  eventSetData = e => {
    setTimeout(() => {
      this.handleUpdate(e);
    }, 1000);
  };

  handleSetData = e => {
    if (!isOnLine) {
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
    const project_id = projectId();
    const state = this.state.data.state;
    const search = this.state.data.search;
    const rows = this.state.data.rows;
    if (e.scroll) {
      const move = e.move || 1;
      const page = this.state.data.page + move;
      Project.users(project_id, state, search, page, rows, this.state.data.list).then(result => {
        const data = result.data;
        this.setState({ data: data });
      });
    } else {
      Project.users(project_id, state, search, 1, rows).then(result => {
        const data = result.data;
        console.log(data);
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

  componentDidMount() {
    Subscribe(`${this.state.name}/${this.state.data.project_id}`, event => this.eventSetData(event));
    Event("__viewInit", this.eventSetView);
    this.handleData({ scroll: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data.project_id !== this.state.data.project_id) {
      UnSubscribe(`${this.state.name}/${prevState.data.project_id}`, event => this.eventSetData(event));
      Subscribe(`${this.state.name}/${this.state.data.project_id}`, event => this.eventSetData(event));
    } else if (prevState.data.state !== this.state.data.state) {
      this.handleData({ scroll: false });
    }
  }

  componentWillUnmount() {
    UnSubscribe(`${this.state.name}/${this.state.data.project_id}`, event => this.eventSetData(event));
    EventUnSubscribe("__viewInit", this.eventSetView);
  }

  render() {
    if (this.state._view !== this.props.location.pathname) {
      return <Redirect to={this.state._view} push={true} />;
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
                <TabUsers list={this.state.data.list} setData={this.handleSetData} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewUsers;
