import React from "react";
import { Redirect } from "react-router-dom";
import "../styles/inboxes.scss";
import {
  Loading,
  App,
  delStorage,
  Subscribe,
  UnSubscribe,
  setVar,
  getSession,
  getToken,
  isSignIn,
  Event,
  EventUnSubscribe,
  isOnLine,
  OutLine,
  OnLine,
  css,
  ShowAlert,
  Emitter,
  getVar,
  getSends,
  setSessionVar,
  setGlovalVar,
  foldersCount,
  setFolder,
  getValue
} from "../components/utilities";
import { MSG002 } from "../components/msg";
import SideBar from "../components/sidebar";
import Chatbox from "../components/chatbox";
import { Api as Profile } from "../api/profile";

class Inboxes extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      profile: {
        _id: "",
        username: "",
        caption: "",
        avatar: "",
        projects: []
      },
      session: getSession(),
      project: {},
      project_id: "-1",
      folders: [],
      folder: {},
      _view: "",
      online: isOnLine(),
      talking: getVar("-1", "talking", false),
      signout: false
    };
  }

  async getFolder(project_id) {
    return await Profile.folders(project_id).then(result => {
      return result;
    });
  }

  eventOnLine = e => {
    this.setState({ online: e });
  };

  eventSetProject = e => {
    setSessionVar("project", e);
    this.getFolder(e._id).then(result => {
      setVar(e._id, "folder", result.folder);
      setGlovalVar("folder", result.folder);
      this.setState({
        project: e,
        project_id: e._id,
        folders: result.folders,
        folder: result.folder,
        _view: result._view
      });
      Emitter("__viewInit", result._view);
    });
  };

  eventSetFolder = e => {
    setFolder(this.state.project_id, e);
    this.setState({ folder: e, _view: e._view });
  };

  eventSetView = e => {
    this.setState({ _view: e });
  };

  eventChangeSession = e => {
    const token = getToken();
    if (token !== e.token) {
      this.handleExit();
    }
  };

  eventChangeCounted = e => {
    if (e.project_id === this.state.project_id) {
      let folders = foldersCount(this.state.folders, e, "0");
      this.setState({ folders: folders });
    }
  };

  eventSetTalking = e => {
    setVar(this.state.project_id, "talking", e);
    this.setState({ talking: e });
  };

  handleExit = () => {
    delStorage();
    this.setState({ session: "", signout: true });
  };

  handleSignOut = () => {
    const sendCount = getSends().length;
    if (sendCount === 0) {
      delStorage();
      this.setState({ signout: true });
    } else {
      ShowAlert(MSG002.message);
    }
  };

  handleScreenSize = e => {
    if (e.target.innerWidth > 720) {
      css("__sidebarMenu", "display", "block");
      css("__topMenu", "display", "none");
      css("__sidebarTopMenu", "margin-left", "0px");
    } else {
      css("__sidebarMenu", "display", "none");
      css("__topMenu", "display", "block");
      css("__sidebarTopMenu", "margin-left", "0px");
    }
  };

  handleData = () => {
    if (this.state.session === "") {
      this.handleExit();
    } else {
      this.handleProfile();
    }
  };

  handleProfile = () => {
    Profile.profile().then(result => {
      const msg = getValue(result, "msg", "");
      if (msg !== "") {
        this.handleExit();
      } else {
        const profile = getValue(result, "data", {});
        this.getFolder(profile.project_id).then(result => {
          console.log(result);
          this.setState({
            profile: profile.profile,
            projects: profile.projects,
            project: profile.project,
            project_id: profile.project_id,
            folders: result.folders,
            folder: result.folder,
            _view: result._view
          });
          Emitter("__viewInit", result._view);
        });
      }
    });
  };

  handleProject = e => {
    const project = e.project;
    this.setState({ project: project });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleScreenSize, true);
    Subscribe(`tokens/${this.state.session}`, event => this.eventChangeSession(event));
    Subscribe(`counts/${this.state.project_id}`, event => this.eventChangeCounted(event));
    OnLine(event => this.eventOnLine(event));
    Event("__profile", this.handleData);
    Event("__project", this.eventSetProject);
    Event("__folder", this.eventSetFolder);
    Event("__view", this.eventSetView);
    Event("__talking", this.eventSetTalking);
    this.handleData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.project_id !== this.state.project_id) {
      UnSubscribe(`counts/${prevState.project_id}`, event => this.eventChangeSession(event));
      Subscribe(`counts/${this.state.project_id}`, event => this.eventChangeCounted(event));
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleScreenSize);
    UnSubscribe(`tokens/${this.state.session}`, event => this.eventChangeSession(event));
    UnSubscribe(`counts/${this.state.project_id}`, event => this.eventChangeCounted(event));
    OutLine(this.eventOnLine);
    EventUnSubscribe("__profile", this.handleData);
    EventUnSubscribe("__project", this.eventSetProject);
    EventUnSubscribe("__folder", this.eventSetFolder);
    EventUnSubscribe("__view", this.eventSetView);
    EventUnSubscribe("__talking", this.eventSetTalking);
  }

  render() {
    if (!isSignIn()) {
      return <Redirect to="/signin" push={true} />;
    }
    return (
      <React.Fragment>
        <div className="inboxes">
          <div className="inboxes-menu">
            <SideBar
              online={this.state.online}
              talking={this.state.talking}
              profile={this.state.profile}
              project={this.state.project}
              project_id={this.state.project_id}
              folders={this.state.folders}
              folder={this.state.folder}
              handleSignOut={this.handleSignOut}
            />
          </div>
          <div className="inboxes-detail">
            <div className={!this.state.talking ? "inboxes-detail-content" : "inboxes-detail-content talking"}>
              <div className="inboxes-detail-content-main">{this.props.children}</div>
              <div className={this.state.talking ? "inboxes-detail-content-tool d-block" : "inboxes-detail-content-tool d-none"}>
                <Chatbox></Chatbox>
              </div>
              <div className="inboxes-detail-content-footer">
                <div className="footer-content">
                  <div className="footer-copyright">
                    <b>Copyright</b> {App.company} {App.copyright}
                  </div>
                  <div className="footer-platform">
                    Power by <b>Josephine</b> - V{App.version}
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

export default Inboxes;
