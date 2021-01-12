import { observable, action, makeAutoObservable } from "mobx";

export class HeaderStore {
  constructor() {
    makeAutoObservable(this);
  }

  state = {
    keyword: "",
    mode: "add"
  };

  enter(e, itemsStore, footerStoreMode) {
    // передаём store каждый раз ?
    switch (e.key) {
      case "Enter":
        if (footerStoreMode === "Add")
          this.addItem(this.state.keyword, itemsStore);
        break;
      case "Esc":
      case "Escape":
        this.state.mode = "none";
        break;
      case "Backspace":
        this.state.keyword = this.state.keyword.slice(0, -1);
        break;
      case "Shift":
      case "Control":
      case "Delete":
        break;
      default:
        this.state.keyword += e.key;
    }
  }

  addItem(title, itemsStore) {
    if (!this.validate(title)) {
      this.state.keyword = "";
      return false;
    } else {
      itemsStore.addItem(title);
      this.state.keyword = "";
    }
  }

  validate(str) {
    return !str.trim() == "";
  }
}