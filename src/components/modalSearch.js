import React from 'react';

function ModalSearch(props) {
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
        </div>
      </div>
    </React.Fragment>
  );
}

export default ModalSearch;
