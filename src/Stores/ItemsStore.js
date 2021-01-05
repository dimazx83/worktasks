import { observable, action,computed } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { render } from "react-dom";

export class ItemsStore {
    @observable items = [
        { title: 'Build a React App', complete: false },
        { title: 'Learn React', complete: false },
        { title: 'Learn Javascript', complete: false }
    ]

    @computed get CompletedItems() {
       return this.items.filter(item => item.complete)
    }

    @computed get RemainItems() {
        return this.items.filter(item => !item.complete)
    }

    @action addItem(title) {
        this.items.push({ title: title, complete: false })
    }
}