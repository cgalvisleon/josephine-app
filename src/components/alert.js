import React from "react";
import { useSelector } from "react-redux";

function Alert(props) {
  const alert = useSelector(state => {
    return state.sistem.alert;
  });

  if (alert.show) {
    let theme = "alert alert-primary";
    if (alert.type === "danger") {
      theme = "alert alert-danger";
    } else if (alert.type === "warning") {
      theme = "alert alert-warning";
    } else if (alert.type === "info") {
      theme = "alert alert-info";
    }

    return (
      <React.Fragment>
        <div className="__alert">
          <div className={theme} role="alert">
            {alert.message}
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
}

export default Alert;
