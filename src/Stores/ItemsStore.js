//@flow

import { makeAutoObservable } from "mobx";

export type object = {
  title: string,
  complete: boolean
}

export class ItemsStore {
  items: Array<object> = [];

  constructor() {
    makeAutoObservable(this);
    this.setDefault(JSON.parse(localStorage.getItem('key')));
    // || '{}'
  }

  getCompletedItems(): Array<object> {
    return this.items.filter((item) => item.complete);
  }

  getRemainItems(): Array<object> {
    return this.items.filter((item) => !item.complete);
  }

  filtration(word: string, filteredCollection: Array<object>): Array<object> {
    return filteredCollection.filter((todo) => {
      return todo.title.toLowerCase().startsWith(word.toLowerCase());
    });
  }

  setDefault(list: Array<object>): void {
   /*  if (list === '{}') this.items = [
      // если ничего не передано то дефолт список
      { title: "Build a React App", complete: false },
      { title: "Learn React", complete: false },
      { title: "Learn Javascript", complete: false }
    ]
    else this.items = list */

    this.items = list || [
      // если ничего не передано то дефолт список
      { title: "Build a React App", complete: false },
      { title: "Learn React", complete: false },
      { title: "Learn Javascript", complete: false }
    ]
  }

  addItem(title: string): void {
    this.items.unshift({ title: title, complete: false });
  }
}