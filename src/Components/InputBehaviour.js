import React, { Component } from "react"
import { style } from '../style.js'
const { bgColor } = style

export class InputBehaviour extends React.Component {
    render() {
        return (
            <input type="button" value={this.props.id} id={this.props.id} style={bgColor(this.props.id, this.props.behaviour)} onClick={(event) => this.props.changeBehaviour(event)} />
        )
    }
}