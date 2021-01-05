import { makeObservable, observable, computed, action } from "mobx"

export class FooterStore {
    @observable state = {
        activeMode: 'Add',
        activeBehaviour: 'All'
    }

    @action changeMode = (id) => {
        this.state.activeMode = id
    }

    @action changeBehaviour = (id) => {
        this.state.activeBehaviour = id
    }
}