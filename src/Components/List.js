import React from "react"
import {style} from '../style.js'
const { ul, input} = style;

const listItems = [0, 1, 2].map((i) =>
    <li key={i.toString()}><label><input id="toggle" type="checkbox" />hfhf</label></li>
);

export const List = () => (
    <ul style={ul}>
            {listItems}
    </ul>
)