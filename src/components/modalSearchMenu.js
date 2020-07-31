import React from 'react';

function ModalSearchMenu(props) {
  const states = props.states || [];
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      props.onSearch();
    }
  };

  return (
    <React.Fragment>
      <div className="input-group input-group-sm grid-1">
        <input
          type="text"
          className="form-control"
          autoComplete="off"
          placeholder="Buscar"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          onKeyDown={handleKeyDown}
        />
        <div className="input-group-append">
          <button className="btn btn-secondary" onClick={props.onSearch}>
            <i className="fa fa-search"></i>
          </button>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fa fa-bars"></i>
          </button>
          <div className="dropdown-menu">
            {states.map((item, i) => {
              return (
                <div
                  key={i}
                  className={
                    props.state === item._state
                      ? 'dropdown-item active'
                      : 'dropdown-item'
                  }
                  onClick={() => props.onState(item._state)}
                >
                  {item.caption}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ModalSearchMenu;
