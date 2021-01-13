//@flow

import * as React from "react";
import { render } from "react-dom";
import { MainComponent } from "./Components/MainComponent.js";
import { MainStore } from "./Stores/MainStore.js";

render(
  <MainComponent mainStore={(new MainStore(): MainStore)} />,
  document.getElementById("root")
);
