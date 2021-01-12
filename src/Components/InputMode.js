import React from "react";
import { observer } from "mobx-react";
import { style } from "../style.js";

const { bgColor, input } = style;

@observer
export class InputMode extends React.Component {
  render() {
    return (
      <input
        type="button"
        value={this.props.id}
        id={this.props.id}
        style={{
          ...bgColor(this.props.id, this.props.mode.state.activeMode),
          ...input
        }}
        onClick={this.click}
      />
    );
  }

  click = () => {
    this.props.changeMode(this.props.id);
    this.props.headerStoreKeyword.state.keyword = "";
  };
}
