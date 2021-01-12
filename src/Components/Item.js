import { observer } from "mobx-react";
import * as React from "react";
import { style } from "../style.js";

const { cross } = style;

@observer
export class Item extends React.Component {
  toggle() {
    const item = this.props.item;
    item.complete = !item.complete;
  }

  render() {
    const item = this.props.item;
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
