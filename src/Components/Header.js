import React from "react"
import {style} from '../style.js'
const { center, textinput} = style;

export const Header = () => (
    <header id='header'>
        <h1 style={center}>THINGS TO DO</h1>
        <input type='text' placeholder='Add New' style={textinput}></input>
    </header>
)