import React from "react";
import Spinner from "../components/spinner";
import Alert from "../components/alert";
import { OnLoading, OutLoading, OnAlert } from "../components/utilities";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tag: "",
      alert: {
        show: false,
        message: "",
        type: ""
      }
    };
  }

  eventLoading(value) {
    if (this.state.loading !== value.loading) {
      if (value.loading) {
        this.setState({ loading: value.loading, tag: value.tag });
      } else if (this.state.tag === value.tag) {
        setTimeout(() => {
          this.setState({ loading: value.loading, tag: value.tag });
        }, 1000);
      }
    }
  }

  eventAlert(value) {
    if (this.state.alert.show !== value.show) {
      if (value.show) {
        this.setState({ alert: value });
      } else {
        this.setState({ alert: { show: false, message: "", type: "" } });
      }
    }
  }

  componentDidMount() {
    OnLoading(event => this.eventLoading(event));
    OnAlert(event => this.eventAlert(event));
    OutLoading();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading !== this.state.loading && this.state.loading) {
      OutLoading();
    }
  }

  render() {
    return (
      <React.Fragment>
        <Alert alert={this.state.alert} />
        <Spinner loading={this.state.loading} />
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default Layout;
