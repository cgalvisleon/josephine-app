import React from "react";
import Spinner from "../components/spinner";
import Alert from "../components/alert";
import { OutLoading } from "../components/utilities";
import { connect } from "react-redux";

class Layout extends React.Component {
  componentDidMount() {
    OutLoading();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading.show !== this.props.loading.show && this.props.loading.show) {
      OutLoading();
    }
  }

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
  return state;
}

export default connect(mapStateToProps)(Layout);
