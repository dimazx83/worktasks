import React, {Component} from "react"
import { style } from '../style.js'
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { makeObservable, observable, computed, action } from "mobx"
const { center, textinput, display } = style;

export class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            keyword: '',
            mode: 'add'
        }
    }

    enter = (e) => {
        switch (e.key) {
            case 'Enter':
                console.log('enter')
                this.addItem(this.state.keyword)
                break;
            case "Esc":
            case "Escape":
                console.log('esc')
                this.setState({
                    mode: 'none'
                })
                break;
            default:
                console.log(e.key)
        }
    }

    updateKeyword = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }

    addItem(title) {
        console.log(title)
        if (!validate(title)) return false
    }

    render() {
        return (
            <header id='header'>
                <h1 style={center}>THINGS TO DO</h1>
                <input type='text' placeholder='Add New' style={display(this.state.mode)} onKeyDown={this.enter} onChange={this.updateKeyword}></input>
                <p>{this.state.keyword}</p>
            </header>
        )
    }
}

function validate(str) {
    return !str.trim() == ''
}
