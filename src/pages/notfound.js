import React from "react";
import "../styles/notfound.scss";
import { Loading } from "../components/utilities";
import TopBar from "../components/topbar";
import Page404 from "../components/page404";

class NotFound extends React.Component {
  constructor(props) {
    super(props);
    Loading();
  }

  render() {
    return (
      <React.Fragment>
        <TopBar></TopBar>
        <div className="__404Container">
          <Page404></Page404>
        </div>
      </React.Fragment>
    );
  }
}

export default NotFound;
