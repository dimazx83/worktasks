//@flow

import { observer } from "mobx-react";
import * as React from "react";
import { style } from "../style.js";
import { Item } from "./Item.js";
import type { object } from '../Stores/ItemsStore.js'


const { ul } = style;
type Props = {
  mainStore: any,
};

@observer
export class List extends React.Component<Props> {
  // условный рендер по актив кнопке
  render(): React.Node  {
    let collection: Array<object> = [];
    let activeMode: string = this.props.mainStore.footerStore.state.activeMode;
    let activeFilter: string = this.props.mainStore.footerStore.state.activeBehaviour;
    let keyword: string = this.props.mainStore.headerStore.state.keyword;

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
    //this.props.mainStore.itemsStore.items

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
