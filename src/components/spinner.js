import React from "react";
import { css } from "@emotion/core";
import { BeatLoader } from "react-spinners";

const override = css`
  grid-column-end: 2;
  grid-column-start: 2;
  grid-row-end: 2;
  grid-row-start: 2;
  margin: auto;
`;

function Spinner(props) {
  const show = props.loading;
  if (show) {
    return (
      <React.Fragment>
        <div className="__spinner">
          <BeatLoader css={override} size={20} color={"rgb(0,151,254)"} loading={props.loading} />
        </div>
      </React.Fragment>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
}

export default Spinner;
