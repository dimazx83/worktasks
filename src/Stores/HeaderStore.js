//@flow
import { makeAutoObservable } from "mobx";

export class HeaderStore {
  constructor() {
    makeAutoObservable(this);
  }

  state: { keyword: string, mode: string } = {
    keyword: "",
    mode: "add"
  };

  enter(e: SyntheticKeyboardEvent<>, itemsStore: any, footerStoreMode: string): void {
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
      case "Alt":
        break;
      default:
        this.state.keyword += e.key;
    }
  }

  addItem(title: string, itemsStore: any): void {
    if (this.validateFalse(title)) {
      this.state.keyword = "";
      console.log('Empty title!')
    } else {
      itemsStore.addItem(title);
      this.state.keyword = "";
    }
  }

  validateFalse(str: string): boolean {
    return str.trim() == "";
  }
}