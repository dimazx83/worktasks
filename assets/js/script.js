/*import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
//import { observer } from "mobx-react"*/

const FooterElem = () => (
    <div id='footer' style={footer}>
        <div id='left' style={flex}>
            <input type="button" value="Add" id="Add" />
            <input type="button" value="Search" id="Search" />
            <input type="button" value="Default" id="Default" />
        </div>
        <div id='right' style={flex}>
            <input type="button" value="All" id="All" />
            <input type="button" value="Active" id="Active" />
            <input type="button" value="Completed" id="Completed" />
        </div>
    </div>
)

const listItems = [0, 1, 2].map((i) =>
    <li key={i.toString()}><label><input id="toggle" type="checkbox" />hfhf</label></li>
);

const style = {
    center: {
        textAlign: 'center'
    },

    ul: {
        margin: '40px',
        fontSize: 'large',
        textAlign: 'left',
        listStyle: 'none'
    },

    // :not(#toggle)
    input: {
        border: 'none',
        border: '1px solid black',
        height: '40px',
        fontSize: 'medium'
    },

    textinput: {
        display: 'block',
        width: '300px',
        height: '50px',
        margin: '0 auto',
        fontSize: 'medium'
    },

    flex: {
        display: 'flex'
    },

    footer: {
        display: 'flex',
        marginTop: '5%',
        justifyContent: 'space-between',
        backgroundColor: 'burlywood'
    }
}

const { center, ul, input, textinput, flex, footer } = style

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
    document.getElementById('app')
)


