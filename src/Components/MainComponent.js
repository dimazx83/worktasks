import * as React from "react";
import { Header } from "./Header.js";
import { List } from "./List.js";
import { Footer } from "./Footer.js";
import { style } from "../style.js";

const { root } = style;

type Props = {
  mainStore: MainStore,
};

export class MainComponent extends React.Component<Props> {
  render() {
    return (
      <div id="root" style={root}>
        <Header mainStore={this.props.mainStore} />
        <List mainStore={this.props.mainStore} />
        <Footer mainStore={this.props.mainStore} />
      </div>
    );
  }
}
