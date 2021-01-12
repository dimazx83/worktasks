//@flow

import * as React from 'react'
import { style } from "../style.js";
import { InputBehaviour } from "./InputBehaviour.js";
import { observer } from "mobx-react";
import { InputMode } from "./InputMode.js";

const { flex, footer, input } = style;
const inputsBehaviourData: Array<string> = ["All", "Active", "Completed"],
  inputsModeData: Array<string> = ["Add", "Search"];

type Props = { // дубль
  mainStore: any,
};

@observer
export class Footer extends React.Component<Props> {
  render(): React.Node {
    const footerCollection: any = this.props.mainStore.footerStore;

    const modeInputs = inputsModeData.map((i) => (
      <InputMode
        key={i}
        id={i}
        itemsStore={this.props.mainStore.itemsStore}
        headerStoreKeyword={this.props.mainStore.headerStore}
        mode={footerCollection}
        changeMode={footerCollection.changeMode}
      />
    ));
    const behaviourInputs = inputsBehaviourData.map((i) => (
      <InputBehaviour
        key={i}
        id={i}
        itemsStore={this.props.mainStore.itemsStore}
        behaviour={footerCollection}
        changeBehaviour={footerCollection.changeBehaviour}
      />
    ));

    return (
      <footer id="footer" style={footer}>
        <div id="left" style={flex}>
          {modeInputs}
          <input
            type="button"
            value="Default"
            id="default"
            style={input}
            onClick={() => this.props.mainStore.itemsStore.setDefault()}
          />
        </div>
        <div id="right" style={flex}>
          {behaviourInputs}
        </div>
      </footer>
    );
  }
}
