import React, { Component } from "react"
import { style } from '../style.js'
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { makeObservable, observable, computed, action } from "mobx"
const { ul, input } = style;

const itemsData = [];
['Build a React App', 'Learn React', 'Learn Javascript'].forEach((i) => itemsData.push({ title: i, complete: false }))


function getCompletedItems() {
    return listItems.filter(item => console.log(item.completed)) // или Item data
}

function getRemainItems() {
    return listItems.filter(item => console.log(!item.completed))
}

function addItem() {
    listItems.push({ title, id = title.toString(), complete })
}

function toggle() {
    this.setState(prevState => {
        return {
            count: prevState.count + 1
        }
    })
} // state в компоненте li

//className +=
//class= { state? cross: '' }

/*
const Greetings = ({ firstName, lastName }) => <div>Hey you! {firstName} {lastName}!</div>;
render() {
    const { firstNameError, firstName } = this.state;

    const date = new Date()
        {date.getHours() % 12}*/

const Item = (props) => {
    <li key={props.item.title}>
        <label>
            <input id="toggle" type="checkbox" checked={props.item.complete} onChange={toggle} />
            <p>{props.item.title}</p>
        </label>
    </li>
}

const listItems = itemsData.map((i) => {
    return <Item item={i} />
})

export const List = () => (
    <ul style={ul}>
        {listItems}
    </ul>
)
