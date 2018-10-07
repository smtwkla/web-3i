import React from "react";
import Datetime from "react-datetime";


class ButtonOrDateTimePicker extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        let picker = <div align="left"><Datetime dateFormat={'DD-MM-YYYY'} timeFormat={'HH:mm:ss'}
                                                 onChange={this.props.onTimeChange} value={this.props.value}/></div>;

        return (<div>
                <div align="left">
                    <h4>{this.props.label}:</h4>
                </div>
                <div align="left">
                    <label><input type="checkbox" onChange={this.props.onOptionClick}/>{this.props.option_label}</label>
                </div>
                { this.props.noPicker ? picker : null}
        </div>)
    }
}

export default ButtonOrDateTimePicker;