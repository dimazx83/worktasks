//@flow

import * as React from 'react'
import { style } from "../style.js";
import { observer } from "mobx-react";
import type { object } from '../Stores/ItemsStore.js'


const { bgColor, input } = style;

type Props = { // дубль
  id: string,
  itemsStore: any,
  behaviour: any,
  changeBehaviour: void,
};

@observer
export class InputBehaviour extends React.Component<Props> { // метод?
  render(): React.Node  {
    return (
      <input
        type="button"
        value={this.props.id}
        id={this.props.id}
        style={{
          ...bgColor(this.props.id, this.props.behaviour.state.activeBehaviour),
          ...input
        }}
        onClick={this.click}
      />
    );
  }

  click = (): Array<object> => {
    this.props.changeBehaviour(this.props.id);

    if (this.props.id == "All") {
      return this.props.itemsStore.items;
    } else if (this.props.id == "Active") {
      return this.props.itemsStore.getRemainItems();
    } else return this.props.itemsStore.getCompletedItems();
  }
}
