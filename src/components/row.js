import React from 'react';

function Row(props) {
  const handleSelect = e => {
    if (typeof props.selected === 'function') {
      props.selected(props.data);
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
        style={{ gridTemplateColumns: props.cols || '' }}
        onClick={handleSelect}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default Row;
