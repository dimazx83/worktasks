import { observer } from "mobx-react";
import * as React from "react";
import { style } from "../style.js";
import { Item } from "./Item.js";

const { ul } = style;

// @flow
//let x: number = 'k'

@observer
export class List extends React.Component {
  // условный рендер по актив кнопке
  render() {
    let collection = [];
    let activeMode = this.props.mainStore.footerStore.state.activeMode;
    let activeFilter = this.props.mainStore.footerStore.state.activeBehaviour;
    let keyword = this.props.mainStore.headerStore.state.keyword;

    if (activeFilter === "All")
      collection = this.props.mainStore.itemsStore.items;
    else if (activeFilter === "Active")
      collection = this.props.mainStore.itemsStore.getRemainItems();
    else collection = this.props.mainStore.itemsStore.getCompletedItems();

    if (activeMode === "Search") {
      collection = this.props.mainStore.itemsStore.filtration(
        keyword,
        collection
      );
    }

    localStorage.setItem(
      "todos",
      JSON.stringify(this.props.mainStore.itemsStore.items)
    );

    return (
      <ul style={ul}>
        {collection.map((i) => (
          <Item key={i.title} item={i} />
        ))}
      </ul>
    );
  }
}
