import React from "react";
import "../styles/conversation.scss";
import { Loading, Subscribe, UnSubscribe, getValue, updateList } from "./utilities";
import { Message, Tools } from "./inputs";

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      _id: "__Conversation",
      title: "Conversación",
      name: "SUPORT-KEEP-OPERATION",
      chat_id: props.chat_id,
      user_id: props.user_id,
      show: false,
      data: {
        list: [],
        search: getValue(props, "search", ""),
        page: 1,
        rows: 30,
        int: 0,
        end: 0,
        count: 0,
        all: 0
      },
      select: { message_id: "-1", message: "" },
      change: false
    };
  }

  handleUpdate = e => {
    const result = updateList(this.state.data, e);
    this.setState({ data: result });
  };

  handleData = e => {
    console.log(e);
  };

  componentDidMount() {
    Subscribe(`${this.state.chat_id}/${this.state.user_id}`, event => this.eventSetData(event));
    this.handleData(false);
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {
    UnSubscribe(`${this.state.chat_id}/${this.state.user_id}`, event => this.eventSetData(event));
  }

  render() {
    return (
      <React.Fragment>
        <div className="conversation">
          <div className="contacts"></div>
          <div className="messages">
            <div className="tools">
              <Tools _state={this.props._state} />
            </div>
            <div className="list"></div>
            <div className="message">
              <Message _state={this.props._state} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Conversation;
