import React from "react";
import Page404 from "../components/page404";
import { Loading } from "../components/utilities";

class ViewNotfound extends React.Component {
  constructor(props) {
    super(props);
    Loading();
  }

  render() {
    return (
      <React.Fragment>
        <Page404></Page404>
      </React.Fragment>
    );
  }
}

export default ViewNotfound;
