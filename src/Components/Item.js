//@flow

import { observer } from "mobx-react";
import * as React from "react";
import { style } from "../style.js";
import type { object } from '../Stores/ItemsStore.js'

const { cross } = style;
type Props = {
  item: object
};

@observer
export class Item extends React.Component<Props> {
  toggle(): void {
    const item: object = this.props.item;
    item.complete = !item.complete;
  }

  render(): React.Node {
    const item: object = this.props.item;
    return (
      <li style={cross(item.complete)}>
        <label>
          <input
            id="toggle"
            type="checkbox"
            checked={item.complete}
            onClick={() => this.toggle()}
          />
          {item.title}
        </label>
      </li>
    );
  }
}
