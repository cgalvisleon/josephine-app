import React from "react";
import { Redirect } from "react-router-dom";
import { Loading, getView, Event, EventUnSubscribe } from "../components/utilities";

class ViewDefault extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      _view: getView()
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
      return <Redirect to={this.state._view} push={true} />;
    }
    return <React.Fragment></React.Fragment>;
  }
}

export default ViewDefault;
