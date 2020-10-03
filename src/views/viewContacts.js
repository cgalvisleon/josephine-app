import React from "react";
import "../styles/view.scss";
import { Redirect } from "react-router-dom";
import { Loading, Subscribe, UnSubscribe, updateList } from "../components/utilities";
import ModalContact from "../modals/modalContact";
import ViewNavbar from "../components/viewNavbar";
import TabContacts from "../components/tabContacts";
import { Api as Project } from "../services/project";
import { connect } from "react-redux";

class ViewContacts extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      _class: "CONTACT",
      _id: "__ViewContacts",
      name: "contacts",
      title: "Contactos",
      rows: 30,
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
        _class: "CONTACT",
        _id: "-1",
        single: false
      }
    };
  }

  eventSetData = e => {
    console.log({ function: "eventSetData", e });
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

  handleData = scroll => {
    const project_id = this.props.project_id;
    const state = this.state.data.state;
    const search = this.state.data.search;
    const rows = this.state.rows;
    if (scroll) {
      const move = 1;
      const page = this.state.data.page + move;
      Project.contacts(project_id, state, search, page, rows, this.state.data.list).then(result => {
        const data = result.data;
        this.setState({
          data: data
        });
      });
    } else {
      Project.contacts(project_id, state, search, 1, rows).then(result => {
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
      this.handleData(true);
    }
  };

  handleSearch = () => {
    this.handleData(false);
  };

  handleState = e => {
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
    Subscribe(`${this.state.name}/${this.props.project_id}`, event => this.eventSetData(event));
    this.handleData(false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps._view === this.props._view && this.props.project_id !== "-1") {
      if (prevProps.project_id !== this.props.project_id) {
        UnSubscribe(`${this.state.name}/${prevProps.project_id}`, event => this.eventSetData(event));
        Subscribe(`${this.state.name}/${this.props.project_id}`, event => this.eventSetData(event));
        this.handleData(false);
      }
    } else if (prevState.data.state !== this.state.data.state) {
      this.handleData(false);
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
              onChange={this.handleChange}
              onState={this.handleState}
              onSearch={this.handleSearch}
              setData={this.handleSetData}
            />
            <div className="view-scrolling" id={`${this.state._id}_scroll`} onScroll={this.handleScrolling}>
              <div className="row view-boxed">
                <TabContacts data={this.state.data} setData={this.handleSetData} talking={this.state.talking} />
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

export default connect(mapStateToProps)(ViewContacts);
