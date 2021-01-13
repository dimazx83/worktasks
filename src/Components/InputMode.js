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
        changeMode: (id: string) => void
};

@observer
export class InputMode extends React.Component<Props> {

  constructor(){
    super()
    //self = this;
  }

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

  /* click(): void{
    self.props.changeMode(self.props.id);
    self.props.headerStoreKeyword.state.keyword = "";
  }
 */
  click = (): void => {
    this.props.changeMode(this.props.id);
    this.props.headerStoreKeyword.state.keyword = "";
  };
}
