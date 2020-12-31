import React from "react"
import { Header } from "./Header.js"
import { List } from "./List.js"
import { Footer } from './Footer.js'
import { style } from '../style.js'
const { root } = style;

export const MainComponent = () => (
    <div id='root' style={root}>
        <Header />
        <List />
        <Footer />
    </div>
)