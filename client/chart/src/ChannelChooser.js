import {Component} from "react";
import React from "react";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";


class ChannelChooser extends Component {
    render() {
        return <DropdownButton id={'dropdown-basic-Default'} key={1} bsStyle={'default'} title={'Channel 5'}>
            <MenuItem eventKey={1}>Channel 1</MenuItem>
            <MenuItem eventKey={2}>Channel 2</MenuItem>
            <MenuItem eventKey={3}>Channel 3</MenuItem>
            <MenuItem eventKey={4}>Channel 4</MenuItem>
        </DropdownButton>
    }
}

export default ChannelChooser