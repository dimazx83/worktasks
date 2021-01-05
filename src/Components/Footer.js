import React, { Component } from "react"
import { style } from '../style.js'
import { InputBehaviour } from './InputBehaviour.js'
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { makeObservable, observable, computed, action } from "mobx"
import { InputMode } from './InputMode.js'

const { flex, footer } = style;

const inputsBehaviourData = ['All', 'Active', 'Completed'], inputsModeData = ['Add', 'Search'];

@observer
export class Footer extends React.Component {

    render() {
        const footerCollection = this.props.mainStore.footerStore;

        const modeInputs = inputsModeData.map(i => <InputMode key={i} id={i} itemsStore = {this.props.itemsStore} mode={footerCollection.state.activeMode} changeMode={footerCollection.changeMode} />)
        const behaviourInputs = inputsBehaviourData.map(i => <InputBehaviour key={i} id={i} itemsStore = {this.props.itemsStore} behaviour={footerCollection.state.activeBehaviour} changeBehaviour={footerCollection.changeBehaviour} />)

        return (
            <footer id='footer' style={footer}>
                <div id='left' style={flex}>
                    {modeInputs}
                    <input type="button" value="Default" id="default" />
                </div>
                <div id='right' style={flex}>
                    {behaviourInputs}
                </div>
            </footer>
        )
    }
}