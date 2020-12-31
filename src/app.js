import React from "react"
import ReactDOM from "react-dom"
//import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"

import {style} from './style.js';
import {FooterElem} from './FooterElem.js';

const { center, ul, input, textinput} = style

console.log(7)

const listItems = [0, 1, 2].map((i) =>
    <li key={i.toString()}><label><input id="toggle" type="checkbox" />hfhf</label></li>
);

const App = () => (
    <div id='root'>
        <h1 style={center}>THINGS TO DO</h1>
        <input type='text' placeholder='Add New' style={textinput}></input>
        <ul style={ul}>
            {listItems}
        </ul>
        <FooterElem />
    </div>
)

ReactDOM.render(
    <App />,
    document.getElementById('app'),
)


