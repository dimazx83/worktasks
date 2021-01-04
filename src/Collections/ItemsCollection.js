import React, {Component} from "react"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { makeObservable, observable, computed, action } from "mobx"

export class ItemsCollection {
    @observable items = [
        { title: 'Build a React App', complete: false },
        { title: 'Learn React', complete: false },
        { title: 'Learn Javascript', complete: false }
    ]

    toggle(key) {
        this.item.complete = !this.item.complete
      /*  this.items = this.items.map(i => {
            if (i.title === key) i.complete = !i.complete
            return i
        })*/
    }

 /*   @action toggle(key) {
        itemsCollection.items = itemsCollection.items.map(i => { // само себя?
            if (i.title === key) i.complete = !i.complete
            return i
        })
    }*/

    @computed getCompletedItems() {
        return this.items.filter(item => item.completed) // или Item data
    }

    @computed getRemainItems() {
        return this.items.filter(item => !item.completed)
    }

    @computed addItem(title) {
        this.items.push({ title: title, complete: false })
    }
}