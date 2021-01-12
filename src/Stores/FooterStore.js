import { observable, action, makeAutoObservable } from "mobx";

export class FooterStore {
  constructor() {
    makeAutoObservable(this);
  }

  state = {
    activeMode: "Add",
    activeBehaviour: "All"
  };

  changeMode(id) {
    if (this.mode.state.activeMode === id) this.mode.state.activeMode = "none";
    else this.mode.state.activeMode = id;
  }

  changeBehaviour(id) {
    this.behaviour.state.activeBehaviour = id;
  }
}