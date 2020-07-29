import React from "react";

function Alert(props) {
  let show = props.alert.show;

  if (show) {
    let theme = "alert alert-primary";
    const type = props.alert.type;
    const message = props.alert.message;

    if (type === "danger") {
      theme = "alert alert-danger";
    } else if (type === "warning") {
      theme = "alert alert-warning";
    } else if (type === "info") {
      theme = "alert alert-info";
    }

    return (
      <React.Fragment>
        <div className="__alert">
          <div className={theme} role="alert">
            {message}
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
}

export default Alert;
