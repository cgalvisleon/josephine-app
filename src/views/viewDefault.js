import React from "react";
import { Redirect } from "react-router-dom";
import NotProject from "../pages/notproject";
import { Loading } from "../components/utilities";
import { connect } from "react-redux";

class ViewDefault extends React.Component {
  constructor(props) {
    super(props);
    Loading();
  }

  render() {
    if (this.props._view !== "" && this.props._view !== this.props.location.pathname) {
      return <Redirect to={this.props._view || ""} push={true} />;
    } else {
      return (
        <React.Fragment>
          <NotProject></NotProject>
        </React.Fragment>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    signin: state.sistem.signin,
    _view: state.sistem.folder._view || ""
  };
}

export default connect(mapStateToProps)(ViewDefault);
