import React, { Component } from "react"
import { style } from '../style.js'
import { observer } from "mobx-react"

const { bgColor } = style

@observer
export class InputBehaviour extends React.Component {
    render() {
        return (
            <input type="button" value={this.props.id} id={this.props.id} style={bgColor(this.props.id, this.props.behaviour)} onClick={this.click} />
        )
    }

    click = () => {
        this.props.changeBehaviour(this.props.id)
        this.props.behaviour = this.props.id // костыль

        if (this.props.id == 'All') {
            return this.props.itemsStore.items
        } else if (this.props.id == 'Active') {
            return this.props.itemsStore.getRemainItems()

        } else return this.props.itemsStore.getCompletedItems()
    }
}