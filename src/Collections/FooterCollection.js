import React, {Component} from "react"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { makeObservable, observable, computed, action } from "mobx"

export class FooterCollection extends React.Component {
    @observable state = {
        activeMode: 'Add',
        activeBehaviour: 'All'
    }

    changeMode = (event) => {
        this.state.activeMode = event.target.id
    }

    changeBehaviour = (event) => {
        this.state.activeBehaviour = event.target.id
    }
}