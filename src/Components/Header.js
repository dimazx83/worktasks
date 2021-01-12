//@flow

import * as React from 'react'
import { style } from "../style.js";
import { observer } from "mobx-react";
const { center, textinput, display } = style;

type Props = { // дубль
  mainStore: any,
};

@observer
export class Header extends React.Component<Props> {
  render(): React.Node {
    const headerStore: any = this.props.mainStore.headerStore;
    const footerStoreMode: string = this.props.mainStore.footerStore.state.activeMode;
    let placeholder: string = footerStoreMode == "Add" ? "Add New Item" : "Search";

    return (
      <header id="header">
        <h1 style={center}>THINGS TO DO</h1>
        <input
          type="text"
          placeholder={placeholder}
          value={headerStore.state.keyword}
          style={{ ...textinput, ...display(footerStoreMode) }}
          onKeyDown={(event) => {
            headerStore.enter(
              event,
              this.props.mainStore.itemsStore,
              footerStoreMode
            );
          }}
        ></input>
      </header>
    );
  }
}
