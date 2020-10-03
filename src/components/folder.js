import React from "react";
import { Link } from "react-router-dom";
import { minicount, Subscribe, UnSubscribe } from "./utilities";
import { Actions as Sistem } from "../services/actions/sistem";
import { connect } from "react-redux";

class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _count: this.props.folder._count
    };
  }

  eventCounted = e => {
    if (e.project_id === this.props.project_id && this.props.folder._class === e._class && e._state === "0") {
      this.setState({ _count: e.count });
    }
  };

  componentDidMount() {
    Subscribe(`counts/${this.props.project_id}`, event => this.eventCounted(event));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.project_id !== this.props.project_id) {
      UnSubscribe(`counts/${prevProps.project_id}`, event => this.eventCounted(event));
      Subscribe(`counts/${this.props.project_id}`, event => this.eventCounted(event));
    }
    if (prevProps.folder._count !== this.props.folder._count) {
      this.setState({ _count: this.props.folder._count });
    }
  }

  componentWillUnmount() {
    UnSubscribe(`counts/${this.props.project_id}`, event => this.eventCounted(event));
  }

  render() {
    if (this.props.dropdow) {
      return (
        <div className={this.props.select_id === this.props.folder._id ? "item active" : "item"} to={this.props.folder._view}>
          <div
            className="item-chevron"
            onClick={() => Sistem.setFolderDisplay(this.props.project_id, this.props.folder._id, this.props.dropdowId)}
          >
            <i
              id={`${this.props.folder._id}__dopdown_icon`}
              className={this.props.display ? "fa fa-chevron-down" : "fa fa-chevron-right"}
            ></i>
          </div>
          <Link className="item-content" to={this.props.folder._view || ""} onClick={() => Sistem.setFolder(this.props)}>
            <div className="item-icon">
              <i className={`${this.props.folder.icon || ""}`}></i>
            </div>
            <div className="item-label">{this.props.folder.caption || ""}</div>
            <div className="item-right">{minicount(this.state._count)}</div>
          </Link>
        </div>
      );
    } else {
      return (
        <Link
          className={this.props.select_id === this.props.folder._id ? "item active" : "item"}
          to={this.props.folder._view}
          onClick={() => Sistem.setFolder(this.props)}
        >
          <div className="item-content" to={this.props.folder._view || ""}>
            <div className="item-icon">
              <i className={`${this.props.folder.icon || ""}`}></i>
            </div>
            <div className="item-label">{this.props.folder.caption || ""}</div>
            <div className="item-right">{minicount(this.state._count)}</div>
          </div>
        </Link>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    project_id: state.sistem.project._id,
    folders: state.sistem.folders,
    select_id: state.sistem.folder._id || "-1"
  };
}

export default connect(mapStateToProps)(Folder);
