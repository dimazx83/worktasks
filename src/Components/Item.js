import { observable, action,computed } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { render } from "react-dom";
import { style } from '../style.js'

const { cross } = style;

@observer
export class Item extends React.Component {
    toggle() {
        const item = this.props.item
        item.complete = !item.complete
        console.log(item)
    }

    render() {
        const item = this.props.item
        console.log(item)
        return (
            <li style={cross(item.complete)}>
                <label>
                    <input id="toggle" type="checkbox" checked={item.complete} onClick={() => this.toggle()} />
                    {item.title}
                </label>
            </li>
        )
    }
}

/*
export const Item = observer(({ item }) =>
    <li style={cross(item.complete)}>
        <label>
            <input id="toggle" type="checkbox" checked={item.complete} onClick={() => item.complete = !item.complete} />
            {item.title}
        </label>
    </li>
)*/