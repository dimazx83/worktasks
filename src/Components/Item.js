import React, { Component } from "react"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { makeObservable, observable, computed, action } from "mobx"
import { style } from '../style.js'

const { cross } = style;
/*
@observer
export class Item extends React.Component {
    
    render() {

        return (
            <li style = {cross(this.props.item.complete) }>
                <label>
                    <input id="toggle" type="checkbox" checked={this.props.item.complete} onChange={() => this.props.toggle(this.props.item.title)} />
                    {this.props.item.title}
                </label>
            </li>
        )
    }
}
*/

export const Item = observer(({item})=>

<li style = {cross(item.complete) }>
                <label>
                    <input id="toggle" type="checkbox" checked={item.complete} onChange={() => item.complete = !this.item.complete} /> {/* вызываем родит метод тогл */}
                    {item.title}
                </label>
            </li>
) 