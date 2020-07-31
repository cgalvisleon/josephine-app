import React from 'react';

function Td(props) {
  const handleClick = e => {
    if (typeof props.onClick === 'function') {
      props.onClick(e);
    }
  };

  return (
    <React.Fragment>
      <div
        className={
          props.selectedId !== undefined && props.selectedId === props._id
            ? `${props.className} active`
            : props.className
        }
        style={{
          gridTemplateColumns: props.cols || '',
          gridColumnGap: props.colgap || 0
        }}
        onClick={() => handleClick(props._id)}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default Td;
