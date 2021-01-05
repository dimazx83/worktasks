import { observable, action,computed } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { render } from "react-dom";
import { MainComponent } from './Components/MainComponent.js'
import { MainStore } from './Stores/MainStore.js'

console.log(7)

render(
    <MainComponent mainStore={new MainStore()}/>,
    document.getElementById('app')
)