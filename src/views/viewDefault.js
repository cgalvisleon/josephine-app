import React from "react";
import { Redirect } from "react-router-dom";
import NotProject from "../pages/notproject";
import { Loading, getView, Event, EventUnSubscribe, getProfile, getValue } from "../components/utilities";

class ViewDefault extends React.Component {
  constructor(props) {
    super(props);
    const profile = getProfile();
    Loading();
    this.state = {
      _view: getView(),
      projects: getValue(profile, "projects", [])
    };
  }

  eventSetView = e => {
    this.setState({ _view: e });
  };

  componentDidMount() {
    Event("__viewInit", this.eventSetView);
  }

  componentWillUnmount() {
    EventUnSubscribe("__viewInit", this.eventSetView);
  }

  render() {
    if (this.state._view !== "" && this.state._view !== this.props.location.pathname) {
      return <Redirect to={this.state._view || ""} push={true} />;
    } else if (this.state.projects.length === 0) {
      return (
        <React.Fragment>
          <NotProject></NotProject>
        </React.Fragment>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}

export default ViewDefault;
