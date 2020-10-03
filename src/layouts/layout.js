import React from "react";
import Spinner from "../components/spinner";
import Alert from "../components/alert";
import { connect } from "react-redux";

class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Alert />
        <Spinner />
        {this.props.children}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { loading: state.sistem.loading };
}

export default connect(mapStateToProps)(Layout);
