import React, {Component} from "react"
import { style } from '../style.js'
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { makeObservable, observable, computed, action } from "mobx"
const { center, textinput, display } = style;

@observer export class Header extends React.Component {
    render() {
        const headerStore = this.props.mainStore.headerStore
        const footerStoreMode = this.props.mainStore.footerStore.state.activeMode
        let placeholder = footerStoreMode == 'Add' ? 'Add New Item' : 'Search'

        return (
            <header id='header'>
                <h1 style={center}>THINGS TO DO</h1>
                <input type='text' placeholder={placeholder} style={display(headerStore.state.mode)} onKeyDown={headerStore.enter} /*onChange={headerStore.updateKeyword}*/></input>
                <p>{headerStore.state.keyword}</p>
            </header>
        )
    }
}
