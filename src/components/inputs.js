import React, { useState } from "react";
import { toolTip, getDateDifference, ShowAlert, getValue, section, capitalize, phone, float, number, formatDHM, getRow } from "./utilities";
import ModalUpload from "../modals/modalUpload";
import ListCitys from "../modals/listCitys";
import ListTypes from "../modals/listTypes";
import ListContacts from "../modals/listContacts";
import ListUsers from "../modals/listUsers";
import { Api as Project } from "../services/project";

function Input(props) {
  const handleChange = e => {
    props.onChange(e);
  };

  return (
    <React.Fragment>
      <input
        id={props.id}
        type={props.type}
        className={props.className}
        autoComplete={props.autoComplete || "nope"}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        name={props.name}
        value={props.value || ""}
        onChange={handleChange}
        onKeyDown={props.onKeyDown}
        disabled={!(props._state === "0")}
      />
    </React.Fragment>
  );
}

function Textarea(props) {
  const handleChange = e => {
    props.onChange(e);
  };

  return (
    <React.Fragment>
      <textarea
        className={props.className}
        autoComplete={props.autoComplete || "nope"}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        rows={props.rows || 3}
        name={props.name}
        value={props.value}
        onChange={handleChange}
        disabled={!(props._state === "0")}
      />
    </React.Fragment>
  );
}

function Name(props) {
  const handleChange = e => {
    const old = e.target.value;
    const index = e.target.selectionStart;
    e.target.value = capitalize(e.target.value);
    const n = e.target.value.length - old.length;
    e.target.selectionStart = index + n;
    e.target.selectionEnd = index + n;
    props.onChange(e);
  };

  return (
    <React.Fragment>
      <Input
        id={props.id}
        type={props.type}
        className={props.className}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        name={props.name}
        value={props.value}
        _state={props._state}
        onChange={handleChange}
      />
    </React.Fragment>
  );
}

function Section(props) {
  const handleChange = e => {
    const old = e.target.value;
    const index = e.target.selectionStart;
    e.target.value = section(e.target.value);
    const n = e.target.value.length - old.length;
    e.target.selectionStart = index + n;
    e.target.selectionEnd = index + n;
    props.onChange(e);
  };

  return (
    <React.Fragment>
      <Input
        id={props.id}
        type={props.type}
        className={props.className}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        name={props.name}
        value={props.value}
        _state={props._state}
        onChange={handleChange}
      />
    </React.Fragment>
  );
}

function Phone(props) {
  const handleChange = e => {
    const old = e.target.value;
    const index = e.target.selectionStart;
    e.target.value = phone(e.target.value);
    const n = e.target.value.length - old.length;
    e.target.selectionStart = index + n;
    e.target.selectionEnd = index + n;
    props.onChange(e);
  };

  return (
    <React.Fragment>
      <Input
        id={props.id}
        type={props.type}
        className={props.className}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        _state={props._state}
        name={props.name}
        value={props.value}
        onChange={handleChange}
      />
    </React.Fragment>
  );
}

function Select(props) {
  const list = props.list || [];
  const handleChange = e => {
    const item = list.find(item => item._id === e.target.value);
    const result = {
      target: {
        name: e.target.name,
        value: e.target.value,
        caption: getValue(item, "caption")
      }
    };
    props.onChange(result);
  };
  return (
    <React.Fragment>
      <select
        className={props.className}
        readOnly={props.readOnly}
        name={props.name}
        value={props.value}
        onChange={handleChange}
        disabled={props._state !== "0"}
      >
        {list.map((item, i) => {
          return (
            <option key={i} value={item._id}>
              {item.caption}
            </option>
          );
        })}
      </select>
    </React.Fragment>
  );
}

function Button(props) {
  toolTip();
  const state = props._state || "0";
  return (
    <React.Fragment>
      <button
        type="button"
        className={props.className || "btn btn-outline-secondary btn-sm"}
        data-toggle="tooltip"
        data-placement={props.placement || "bottom"}
        title={props.title}
        disabled={state !== "0"}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </React.Fragment>
  );
}

function State(props) {
  toolTip();
  const display = props._state !== props.newState;
  const handleChange = e => {
    props.onClick(props.newState);
  };

  return (
    <React.Fragment>
      <div
        type="button"
        className={props.className}
        data-toggle="tooltip"
        data-placement={props.placement || "bottom"}
        title={props.title}
        style={{ display: display ? "block" : "none" }}
        onClick={handleChange}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
}

function ToolTip(props) {
  toolTip();
  const state = props._state === undefined ? "0" : props._state;
  const display = props.display === undefined ? "block" : props.display;

  return (
    <React.Fragment>
      <div
        className={props.className || "btn btn-icon btn-sm"}
        data-toggle="tooltip"
        data-placement={props.placement || "bottom"}
        title={props.title}
        disabled={state !== "0"}
        style={{ display: display }}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
}

function Avatar(props) {
  const path = props.path || "";

  return (
    <React.Fragment>
      <ModalUpload
        project_id={props.project_id || "-1"}
        _class="IMAGE"
        object_id={props.object_id}
        main_id="AVATAR"
        _state={props._state}
        path={props.path || ""}
        onChange={props.onChange}
      >
        <img className={props.className || "rounded-circle img-fluid"} alt="" src={path === "" ? "/avatar.svg" : path} />
      </ModalUpload>
    </React.Fragment>
  );
}

function Image(props) {
  const path = props.path || "";

  return (
    <React.Fragment>
      <ModalUpload
        project_id={props.project_id || "-1"}
        _class="IMAGE"
        object_id={props.object_id}
        main_id={props.main_id || "-1"}
        _state={props._state}
        path={props.path || ""}
        onChange={props.onChange}
      >
        <img className={props.className || "rounded-circle img-fluid"} alt="" src={path === "" ? "/image.svg" : path} />
      </ModalUpload>
    </React.Fragment>
  );
}

function Document(props) {
  const path = props.path || "";

  return (
    <React.Fragment>
      <ModalUpload
        project_id={props.project_id || "-1"}
        _class="DOCUMENT"
        object_id={props.object_id}
        main_id={props.main_id || "-1"}
        _state={props._state}
        path={props.path || ""}
        onChange={props.onChange}
      >
        <img className={props.className || "rounded-circle img-fluid"} alt="" src={path === "" ? "/logo.svg" : path} />
      </ModalUpload>
    </React.Fragment>
  );
}

function Typehead(props) {
  const useIndex = e => {
    const [index, setIndex] = React.useState(0);
    if (index > count) {
      setIndex(0);
    } else if (index < 0) {
      setIndex(0);
    }
    return [index, setIndex];
  };
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [index, setIndex] = useIndex(0);
  const [select, setSelect] = useState(false);
  const _id = getValue(props, "_id", "_id");
  const caption = getValue(props, "caption", "search");

  const handleSelect = e => {
    setList([]);
    setCount(0);
    setSelect(true);
    props.onSelect(e);
  };

  const handleBlur = e => {
    if (!select && count > 0) {
      const item = getRow(list, index);
      handleSelect(item);
    } else {
      setList([]);
      setCount(0);
    }
  };

  const handleKeyDown = e => {
    if (e.key === "ArrowUp") {
      setIndex(index - 1);
    } else if (e.key === "ArrowDown") {
      setIndex(index + 1);
    } else if (e.key === "Enter") {
      const item = getRow(list, index);
      handleSelect(item);
    }
  };

  const hadleSearch = query => {
    props.source(query).then(result => {
      const data = getValue(result, "data", "{}");
      const list = getValue(data, "list", []);
      const count = getValue(data, "count", 0);
      setList(list);
      setCount(count);
      setIndex(0);
    });
  };

  const handleChange = e => {
    if (e.target.value.length >= 2) {
      hadleSearch(e.target.value);
    } else {
      setCount(0);
    }
    props.onChange(e);
  };

  return (
    <React.Fragment>
      <input
        id={props.id}
        type={props.type}
        className={props.className}
        autoComplete={props.autoComplete || "off"}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        name={props.name}
        value={props.value}
        _state={props._state}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={props._state !== "0"}
        onBlur={handleBlur}
      />
      <ul className={count > 0 ? "typeahead dropdown-menu wall show" : "typeahead dropdown-menu wall"}>
        {list.map((item, i) => {
          return (
            <li key={i} onClick={() => handleSelect(item)}>
              <div className={getRow(list, index)[_id] === item[_id] ? "dropdown-item active" : "dropdown-item"}>{item[caption]}</div>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
}

class SelectType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project_id: props.project_id,
      _class: props._class,
      className: props.className || "",
      readOnly: props.readOnly || false,
      name: props.name || "",
      _state: props._state || "0",
      list: []
    };
  }

  handleChange = e => {
    const list = this.state.list;
    const item = list.find(item => item._id === e.target.value);
    const result = {
      target: {
        name: e.target.name,
        value: e.target.value,
        caption: getValue(item, "caption")
      }
    };
    if (typeof this.props.onChange === "function") {
      this.props.onChange(result);
    }
  };

  handleData = e => {
    const project_id = this.state.project_id;
    const _class = this.state._class;
    Project.types(project_id, _class, "0", "", 1, 100, [
      {
        _id: "-1",
        caption: ""
      }
    ]).then(result => {
      const list = result.data.list;
      this.setState({
        list: list
      });
    });
  };

  componentDidMount() {
    this.handleData();
  }

  render() {
    return (
      <React.Fragment>
        <select
          className={this.state.className}
          readOnly={this.state.readOnly}
          name={this.state.name}
          value={this.props.value || "-1"}
          onChange={this.handleChange}
          disabled={this.state._state !== "0"}
        >
          {this.state.list.map((item, i) => {
            return (
              <option key={i} value={item._id}>
                {item.caption}
              </option>
            );
          })}
        </select>
      </React.Fragment>
    );
  }
}

function Type(props) {
  const select = getValue(props, "select", { _id: "-1", caption: "" });

  return (
    <React.Fragment>
      <div className="input-group input-group-sm">
        <input className={props.className || "form-control"} readOnly value={select.caption || ""} />
        <div className="input-group-append">
          <ListTypes
            className={props.classNameBtn || "input-group-text"}
            project_id={props.project_id}
            _class={props._class}
            _state={props._state}
            title={props.title}
            select={select}
            setData={props.onChange}
          >
            <i className="fa fa-ellipsis-h"></i>
          </ListTypes>
        </div>
      </div>
    </React.Fragment>
  );
}

function City(props) {
  return (
    <React.Fragment>
      <div className="input-group input-group-sm">
        <input className={props.className || "form-control"} readOnly value={props.value || ""} />
        <div className="input-group-append">
          <ListCitys
            className={props.classNameBtn || "input-group-text"}
            _state={props._state}
            setData={props.onChange}
            city_id={props.city_id}
          >
            <i className="fa fa-ellipsis-h"></i>
          </ListCitys>
        </div>
      </div>
    </React.Fragment>
  );
}

function Contact(props) {
  const select = getValue(props, "select", { _id: "-1", caption: "" });

  return (
    <React.Fragment>
      <div className="input-group input-group-sm">
        <input className={props.className || "form-control"} readOnly value={select.caption || ""} />
        <div className="input-group-append">
          <ListContacts
            className={props.classNameBtn || "input-group-text"}
            project_id={props.project_id}
            _class={props._class}
            _state={props._state}
            select={select}
            setData={props.onChange}
            disabled={props._state !== "0"}
          >
            <i className="fa fa-ellipsis-h"></i>
          </ListContacts>
        </div>
      </div>
    </React.Fragment>
  );
}

function User(props) {
  const select = getValue(props, "select", { _id: "-1", caption: "" });

  return (
    <React.Fragment>
      <div className="input-group input-group-sm">
        <input className={props.className || "form-control"} readOnly value={select.caption || ""} />
        <div className="input-group-append">
          <ListUsers
            className={props.classNameBtn || "input-group-text"}
            project_id={props.project_id}
            _class={props._class}
            _state={props._state}
            select={select}
            setData={props.onChange}
            disabled={props._state !== "0"}
          >
            <i className="fa fa-ellipsis-h"></i>
          </ListUsers>
        </div>
      </div>
    </React.Fragment>
  );
}

function Group(props) {
  return (
    <React.Fragment>
      <div className="input-group input-group-sm">
        <Input
          id={props.id}
          type="text"
          className="form-control sp ctr-sm"
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          name={props.name}
          value={props.value}
          _state={props._state}
          onChange={props.onChange}
        />
        <span className="input-group-btn">
          <Button type="button" className="btn sp btn-secondary btn-sm" _state={props._state}>
            <i className="fa fa-ellipsis-h"></i>
          </Button>
        </span>
      </div>
    </React.Fragment>
  );
}

function Message(props) {
  return (
    <React.Fragment>
      <div className="input-group input-group-sm">
        <Input
          id={props.id}
          type="text"
          className="form-control ctr-sm"
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          name={props.name}
          value={props.value}
          _state={props._state}
          onChange={props.onChange}
        />
        <span className="input-group-append">
          <Button type="button" className="btn btn-secondary btn-sm" _state={props._state}>
            <i className="fas fa-paper-plane"></i>
          </Button>
        </span>
      </div>
    </React.Fragment>
  );
}

function Tools(props) {
  return (
    <React.Fragment>
      <div className="input-group input-group-sm">
        <Input
          id={props.id}
          type="text"
          className="form-control ctr-sm"
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          name={props.name}
          value={props.value}
          _state={props._state}
          onChange={props.onChange}
        />
        <span className="input-group-append">
          <Button type="button" className="btn btn-secondary btn-sm" _state={props._state}>
            <i className="fa fa-search"></i>
          </Button>
          <Button type="button" className="btn btn-secondary btn-sm" _state={props._state}>
            <i className="fas fa-paperclip"></i>
          </Button>
          <Button type="button" className="btn btn-secondary btn-sm w32" _state={props._state}>
            <i className="fa fa-ellipsis-v"></i>
          </Button>
        </span>
      </div>
    </React.Fragment>
  );
}

function Count(props) {
  const classGroupText = props.classGroupText || "input-group-text";
  const write = props.write === undefined ? true : props.write;
  const max = props.maximum || 0;
  const handleChange = e => {
    e.target.value = float(e.target.value);
    props.handleValue(e.target);
  };
  const handleValue = e => {
    e = number(e);
    if (max > 0 && e > max) {
      ShowAlert(`Cantidad excede el máximo establecido - (${max})`);
      e = max;
    }
    props.handleValue({ name: props.name, value: e });
  };

  if (write) {
    return (
      <React.Fragment>
        <div className={props.className || "input-group input-group-sm"}>
          <div className="input-group-prepend">
            <div className={props.classNameUnity || "input-group-text unity"} disabled={false}>
              {props.unity}
            </div>
          </div>
          <input
            type="text"
            className={props.classNameInput || "form-control number t-r"}
            placeholder={props.placeholder || "Cantidad"}
            autoComplete={props.autoComplete || "nope"}
            disabled={!(props._state === "0")}
            name={props.name}
            value={props.value}
            onChange={handleChange}
          />
          <div className={props.vertical ? "input-group-append vertical" : "input-group-append"}>
            <div
              className={props.vertical ? `${classGroupText} vertical` : `${classGroupText}`}
              disabled={!(props._state === "0")}
              onClick={() => handleValue(props.value + props.increase)}
            >
              <i className="fas fa-plus"></i>
            </div>
            <div
              className={props.vertical ? `${classGroupText} vertical` : `${classGroupText}`}
              disabled={!(props._state === "0")}
              onClick={() => handleValue(props.value - props.increase)}
            >
              <i className="fas fa-minus"></i>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className={props.className || "input-group input-group-sm"}>
          <div className="input-group-prepend">
            <div className={props.classNameUnity || "input-group-text unity"} disabled={false}>
              {props.unity}
            </div>
          </div>
          <div className="form-control number t-r mr-60" name={props.name} value={props.value}>
            {props.value}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function Time(props) {
  const date_int = props.date_int || "date_int";
  const date_end = props.date_end || "date_end";
  const data = props.data || {};
  const time = getDateDifference(data, date_int, date_end, true);
  return <div className="form-control sp ctr-sm t-m-c">{formatDHM(time)}</div>;
}

export {
  Input,
  Textarea,
  Name,
  Section,
  Phone,
  Select,
  Button,
  State,
  ToolTip,
  Avatar,
  Image,
  Document,
  Typehead,
  SelectType,
  Type,
  City,
  Contact,
  User,
  Group,
  Message,
  Tools,
  Count,
  Time
};
