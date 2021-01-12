//@flow

import { makeAutoObservable } from "mobx";

export class FooterStore {
  constructor() {
    makeAutoObservable(this);
  }

  state: {activeMode: string, activeBehaviour: string} = {
    activeMode: "Add",
    activeBehaviour: "All"
  };

  changeMode(id: string) {
    if (this.mode.state.activeMode === id) this.mode.state.activeMode = "none";
    else this.mode.state.activeMode = id;
  }

  changeBehaviour(id: string) {
    this.behaviour.state.activeBehaviour = id;
  }
}