//@flow
import * as React from 'react'
import { observer } from "mobx-react";
import { style } from "../style.js";

const { bgColor, input } = style;
type Props = {
        id: string,
        itemsStore: any,
        headerStoreKeyword: any,
        mode: any,
        changeMode: void
};

@observer
export class InputMode extends React.Component<Props> {
  render(): React.Node {
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
