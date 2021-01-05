import React, { Component } from "react"
import { style } from '../style.js'
const { bgColor } = style

export class InputMode extends React.Component {
    render() {
        return (
            <input type="button" value={this.props.id} id={this.props.id} style={bgColor(this.props.id, this.props.mode)} onClick={this.click} />
        )
    }

    click = () => {
        this.props.changeMode(this.props.id)
        this.props.mode = this.props.id  // убрать
    }
}