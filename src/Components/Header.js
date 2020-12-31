import React from "react"
import { style } from '../style.js'
const { center, textinput } = style;

export const Header = () => (
    <header id='header'>
        <h1 style={center}>THINGS TO DO</h1>
        <input type='text' placeholder='Add New' style={textinput} onKeyDown={enter}></input>
    </header>
)

function validate(str) {
    return !str.trim() == ''
}

function enter(e) {
    switch (e.key) {
        case 'Enter':
            console.log('enter')
            break;
        case "Esc":
        case "Escape":
            console.log('esc')
            break;
        default:
            console.log(e.key)
    }
}