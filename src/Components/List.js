import { observable, action,computed } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { render } from "react-dom";import { style } from '../style.js'

import { Item } from './Item.js'
const { ul, input } = style;

/*export default (() => ({
  get: () => JSON.parse(localStorage.getItem('todos')),
  set: (todos) => { localStorage.setItem('todos', JSON.stringify(todos)) }
}))()*/
// @flow
//let x: number = 'k'
/* destruct
const Greetings = ({ firstName, lastName }) => <div>Hey you! {firstName} {lastName}!</div>;
const { firstNameError, firstName } = this.state;
const date = new Date() {date.getHours() % 12}
*/


export class List extends React.Component {

    // условный рендер по актив кнопке
    render() {
        let collection = []
        let activeFilter = this.props.mainStore.footerStore.state.activeBehaviour

        if (activeFilter == 'All') collection = this.props.mainStore.itemsStore.items
        else if (activeFilter == 'Active') collection = this.props.mainStore.itemsStore.RemainItems()
        else collection = this.props.mainStore.itemsStore.CompletedItems()

        return (
            <ul style={ul}>
                {collection.map(i => <Item key={i.title} item={i} />)}
            </ul>
        )
    }
}



