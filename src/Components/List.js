import React, {Component} from "react"
import { style } from '../style.js'
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { makeObservable, observable, computed, action } from "mobx"
import { Item } from './Item.js'
import {ItemsCollection} from '../Collections/ItemsCollection.js'
const { ul, input } = style;

/*export default (() => ({
  get: () => JSON.parse(localStorage.getItem('todos')),
  set: (todos) => { localStorage.setItem('todos', JSON.stringify(todos)) }
}))()*/


// @flow
let x: number = 'k'

const itemsCollection = new ItemsCollection()

/*
const Greetings = ({ firstName, lastName }) => <div>Hey you! {firstName} {lastName}!</div>;
render() {
    const { firstNameError, firstName } = this.state;
    const date = new Date()
        {date.getHours() % 12}
*/
@observer
export class List extends React.Component {
    render() {
        const listItems = itemsCollection.items.map(i => <Item key={i.title} item={i} toggle={itemsCollection.toggle} />)
        return (
            <ul style={ul}>
                {listItems}
            </ul>
        )
    }
}

