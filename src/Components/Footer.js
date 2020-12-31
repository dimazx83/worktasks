import React from "react"
import {style} from '../style.js'
const { flex, footer } = style

export const Footer = () => (
    <footer id='footer' style={footer}>
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
    </footer>
)