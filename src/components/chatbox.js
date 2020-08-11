import React from "react";
import "../styles/chatbox.scss";
import {
  Loading,
  userId,
  projectId,
  Subscribe,
  UnSubscribe,
  EventUnSubscribe,
  Event,
  getVar,
  setVar,
  getValue
} from "../components/utilities";
import { Api as Talk } from "../api/talkings";

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      _id: "__Chatbox",
      userId: userId(),
      project_id: "-1",
      rows: getVar("view_rows", "views", 30),
      display: "broadcastList",
      talk: {},
      data: {
        list: [],
        project_id: "-1",
        search: "",
        int: 0,
        end: 0,
        page: 1,
        rows: 30,
        count: 0,
        all: 0
      }
    };
  }

  eventSetProject = e => {
    this.setState({
      data: {
        ...this.state.data,
        project_id: e._id
      }
    });
  };

  eventMessage = e => {
    const data = this.state.data;
    const list = data.list;
    const filter = select => select._id === e.from_id;
    const index = list.findIndex(filter);
    if (index !== -1) {
      const item = list[index];
      const messages = item.messages;
      const all = getValue(messages, "all", 0);
      const end = getValue(messages, "end", 0);
      const count = getValue(messages, "count", 0);
      messages.all = all + 1;
      messages.end = end + 1;
      messages.count = count + 1;
      messages.list.unshift(e);
      item.message = e;
      item.notread = item.notread + 1;
      this.setState({ data: data });
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
    const display = getVar(project_id, "broadcast", "broadcastList");
    if (display === "broadcast") {
    } else {
      const search = this.state.data.search;
      const rows = this.state.rows;
      if (e.scroll) {
        const move = e.move || 1;
        const page = this.state.data.page + move;
        Talk.talkings(project_id, search, page, rows, this.state.data.list).then(result => {
          const data = result.data;
          this.setState({
            project_id: project_id,
            display: display,
            data: data
          });
        });
      } else {
        Talk.talkings(project_id, search, 1, rows).then(result => {
          const data = result.data;
          this.setState({
            project_id: project_id,
            display: display,
            data: data
          });
        });
      }
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

  handleShowBoradcast = e => {
    setVar(this.state.project_id, "broadcast", "broadcast");
    this.setState({ display: "broadcast", talk: e });
  };

  handleShowBoradcastList = e => {
    setVar(this.state.project_id, "broadcast", "broadcastList");
    this.setState({ display: "broadcastList" });
  };

  componentDidMount() {
    Subscribe(`message/${this.state.userId}`, event => this.eventMessage(event));
    Event("__project", this.eventSetProject);
    //this.handleData({ scroll: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data.project_id !== this.state.data.project_id) {
      this.handleData({ scroll: false });
    } else if (prevState.data.display !== this.state.data.display && this.state.data.display === "broadcast") {
      this.handleData({ scroll: false });
    }
  }

  componentWillUnmount() {
    UnSubscribe(`message/${this.state.userId}`, event => this.eventMessage(event));
    EventUnSubscribe("__project", this.eventSetProject);
  }

  render() {
    return (
      <React.Fragment>
        <div className="tab-content broadcastTabContent">
          <div
            className="broadcastTab"
            id="broadcastList"
            style={this.state.display === "broadcastList" ? { display: "block" } : { display: "none" }}
          >
            <div id="broadcastListContacts">
              <nav className="navbar navbar-expand-lg navbar-light bg-light broadcastTop">
                <div className="input-group input-group-sm grid-1">
                  <input
                    type="text"
                    className="form-control"
                    autoComplete="nope"
                    placeholder="Buscar"
                    name="search"
                    value={this.state.data.search}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-secondary">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </nav>
              <div className="broadcastListContacts">
                {this.state.data.list.map((item, i) => {
                  return (
                    <div key={i} className="broadcastItem" onClick={() => this.handleShowBoradcast(item)}>
                      <div className="broadcastItemAvatar">
                        <img className="avatar" src={item.avatar === "" ? "/avatar.svg" : item.avatar} alt="" />
                      </div>
                      <div className="broadcastItemContent">
                        <div className="name">{item.caption}</div>
                        <div className="lastMessage">{getValue(item.message, "message", {}).text}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            className="broadcastTab"
            id="broadcast"
            style={this.state.display === "broadcast" ? { display: "block" } : { display: "none" }}
          >
            <div className="broadcastTalk">
              <nav className="navbar navbar-expand-lg navbar-light bg-light broadcastContact">
                <button className="btn btn-link btn-sm float-left" onClick={this.handleShowBoradcastList}>
                  <i className="fas fa-arrow-left"></i>
                </button>
                <div className="broadcastAvatar">
                  <img
                    className="avatar"
                    src={getValue(this.state.talk, "avatar", "") === "" ? "/avatar.svg" : this.state.talk.avatar}
                    alt=""
                  />
                </div>
                <div className="broadcastName">{this.state.talk.caption}</div>
              </nav>
              <div className="broadcastMessages">
                <div className="broadcastMessage">
                  <div className="broadcastMessageTo">
                    Small chat, mensaje de texto muy grande muy grander
                    <small className="chat-date">02.19.2015</small>
                  </div>
                </div>
                <div className="broadcastMessage">
                  <div className="broadcastMessageFrom">
                    Mick Smith
                    <small className="chat-date">11:24 am</small>
                  </div>
                </div>
              </div>
              <div className="broadcastSend">
                <div className="input-group input-group-sm grid-1">
                  <input type="text" className="form-control" autoComplete="nope" placeholder="Buscar" />
                  <div className="input-group-append">
                    <button className="btn btn-secondary">Enviar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Chatbox;
