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
  setVar,
  getVar,
  isOnLine,
  updateList
} from "../components/utilities";
import ModalContact from "../modals/modalContact";
import ViewNavbar from "../components/viewNavbar";
import TabContacts from "../components/tabContacts";
import { Api as Project } from "../api/project";

class ViewContacts extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      _class: "CONTACT",
      _id: "__ViewContacts",
      name: "contacts",
      title: "Contactos",
      _view: getView(),
      rows: getVar("view_rows", "views", 30),
      data: {
        project_id: "-1",
        int: 0,
        end: 0,
        list: [],
        page: 1,
        rows: 30,
        count: 0,
        state: "",
        all: 0,
        search: ""
      },
      printParams: {
        project_id: projectId(),
        _class: "CONTACT",
        _id: "-1",
        single: false
      }
    };
  }

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

  handleData = e => {
    const project_id = projectId();
    const state = getVar(project_id, "contacts_state", "0");
    const search = this.state.data.search;
    const rows = this.state.rows;
    if (e.scroll) {
      const move = e.move || 1;
      const page = this.state.data.page + move;
      Project.contacts(project_id, state, search, page, rows, this.state.data.list).then(result => {
        const data = result.data;
        this.setState({ data: data });
      });
    } else {
      Project.contacts(project_id, state, search, 1, rows).then(result => {
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

  handleState = e => {
    setVar(this.state.data.project_id, "contacts_state", e);
    this.setState({
      data: {
        ...this.state.data,
        search: "",
        state: e
      }
    });
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
            <ViewNavbar
              title={this.state.title}
              _class={this.state._class}
              single={false}
              data={this.state.data}
              states={[
                { _state: "0", caption: "Activos" },
                { _state: "1", caption: "Terminados" }
              ]}
              printParams={this.state.printParams}
              Modal={ModalContact}
              handleChange={this.handleChange}
              handleState={this.handleState}
              handleKeyDown={this.handleKeyDown}
              handleSearch={this.handleSearch}
              setData={this.handleSetData}
            />
            <div className="view-scrolling" id={`${this.state._id}_scroll`} onScroll={this.handleScrolling}>
              <div className="row view-boxed">
                <TabContacts list={this.state.data.list} setData={this.handleSetData} talking={this.state.talking} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewContacts;
