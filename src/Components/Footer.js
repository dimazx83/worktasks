import React, { Component } from "react"
import { style } from '../style.js'
import { InputBehaviour } from './InputBehaviour.js'
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { makeObservable, observable, computed, action } from "mobx"
import { InputMode } from './InputMode.js'
import {FooterCollection} from '../Collections/FooterCollection.js'

const { flex, footer } = style;

const inputsBehaviourData = ['All', 'Active', 'Completed'], inputsModeData = ['Add', 'Search'];

const footerCollection = new FooterCollection()

@observer
export class Footer extends React.Component {

    render() {
        console.log(footerCollection.state)
        const behaviourInputs = inputsBehaviourData.map(i => <InputBehaviour key={i} id={i} behaviour={footerCollection.state.activeBehaviour} changeBehaviour={footerCollection.changeBehaviour} />)
        const modeInputs = inputsModeData.map(i => <InputMode key={i} id={i} mode={footerCollection.state.activeMode} changeMode={footerCollection.changeMode} />)

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