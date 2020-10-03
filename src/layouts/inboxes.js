import React from "react";
import { Redirect } from "react-router-dom";
import "../styles/inboxes.scss";
import { App, Subscribe, UnSubscribe, css } from "../components/utilities";
import SideBar from "../components/sidebar";
import Chatbox from "../components/chatbox";
import { Actions as Sistem } from "../services/actions/sistem";
import { connect } from "react-redux";

class Inboxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      talking: false
    };
  }

  eventSignOut = e => {
    Sistem.signout();
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

  handleProject = e => {
    const project = e.project;
    this.setState({ project: project });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleScreenSize, true);
    Subscribe(`match360/signout/${this.props.token}`, event => this.eventSignOut(event));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.token !== this.props.token) {
      console.log(`match360/signout/${this.props.token}`);
      UnSubscribe(`match360/signout/${prevProps.token}`, event => this.eventSignOut(event));
      Subscribe(`match360/signout/${this.props.token}`, event => this.eventSignOut(event));
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleScreenSize);
    UnSubscribe(`match360/signout/${this.props.token}`, event => this.eventSignOut(event));
  }

  render() {
    if (!this.props.signin) {
      return <Redirect to="/signin" push={true} />;
    }
    return (
      <React.Fragment>
        <div className="inboxes">
          <div className="inboxes-menu">
            <SideBar />
          </div>
          <div className="inboxes-detail">
            <div className={!this.state.talking ? "inboxes-detail-content" : "inboxes-detail-content talking"}>
              <div className="inboxes-detail-content-main">{this.props.children}</div>
              <div className={this.state.talking ? "inboxes-detail-content-tool d-block" : "inboxes-detail-content-tool d-none"}>
                <Chatbox />
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

function mapStateToProps(state) {
  return {
    signin: state.sistem.signin,
    token: state.sistem.token,
    user_id: state.sistem.profile._id,
    project_id: state.sistem.project._id
  };
}

export default connect(mapStateToProps)(Inboxes);
