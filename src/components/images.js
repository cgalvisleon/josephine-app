import React from "react";
import ReactGallery from "reactive-blueimp-gallery";
import "../styles/modal.scss";
import { Loading, isOnLine, Subscribe, UnSubscribe, updateList, getValue } from "./utilities";
import { Api as Project } from "../api/project";

class Images extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      _id: "__Images",
      title: "Imagenes",
      name: "IMG",
      show: false,
      object_id: getValue(props, "object_id", "-1"),
      data: {
        list: [
          {
            source: "/gallery/1.jpg",
            thumbnail: "/gallery/1.jpg",
            title: "Bananas"
          },
          {
            source: "/gallery/2.jpg",
            thumbnail: "/gallery/2.jpg",
            title: "Apples"
          },
          {
            source: "/gallery/3.jpg",
            title: "Oranges"
          },
          {
            source: "/gallery/4.jpg",
            title: "Oranges"
          },
          {
            source: "/gallery/5.jpg",
            title: "Oranges"
          },
          {
            source: "/gallery/6.jpg",
            title: "Oranges"
          }
        ],
        _class: "IMG",
        state: "0",
        page: 1,
        rows: 30,
        int: 0,
        end: 0,
        count: 0,
        all: 0
      },
      select: { _id: "-1", caption: "" },
      change: false
    };
  }

  eventSetData = e => {
    setTimeout(() => {
      this.handleUpdate(e);
    }, 1000);
  };

  handleSetData = e => {
    if (!isOnLine) {
      this.handleUpdate(e);
    }
    this.handleSelect(e);
  };

  handleData = scroll => {
    const _id = this.state.object_id;
    const _class = this.state.data._class;
    const state = this.state.data.state;
    const search = this.state.data.search;
    const rows = this.state.data.rows;
    if (scroll) {
      const page = this.state.data.page + 1;
      Project.attachments(_id, _class, state, search, page, rows, this.state.data.list).then(result => {
        const data = result.data;
        this.setState({
          data: data
        });
      });
    } else {
      Project.attachments(_id, _class, state, "", 1, rows, this.state.data.list).then(result => {
        const data = result.data;
        this.setState({
          data: data,
          change: false
        });
      });
    }
  };

  handleUpload = e => {
    console.log(e);
  };

  handleSelect = e => {
    this.setState({ select: e, change: true });
  };

  handleUpdate = e => {
    const data = updateList(this.state.data, e);
    this.setState({ data: data, change: true });
  };

  componentDidMount() {
    Subscribe(`${this.state.name}/${this.props.object_id}`, event => this.eventSetData(event));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.show !== this.props.show && this.props.show) {
      //this.handleData(false);
    }
  }

  componentWillUnmount() {
    UnSubscribe(`${this.state.name}/${this.props.object_id}`, event => this.eventSetData(event));
  }

  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          <h6 className="text">Imagenes</h6>
          <div className="modal_content suport-scroll small" style={{ height: this.props.height || "455px" }}>
            <ReactGallery options={{}}>
              {this.state.data.list.map((item, i) => {
                return <ReactGallery.Slide key={i} thumbnail={item.source}></ReactGallery.Slide>;
              })}
            </ReactGallery>
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default Images;
