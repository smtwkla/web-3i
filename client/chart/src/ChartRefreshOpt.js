import * as React from "react";
import Form from "react-bootstrap/lib/Form";
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Checkbox from "react-bootstrap/lib/Checkbox";
import './Refresh.css'
class ChartRefreshOpt  extends React.Component {

    constructor(props) {
        super(props);

        this.state = {auto_on : this.props.refresh_int > 0, prev_int: 0};
        this.handleClick = this.handleClick.bind(this);
        this.handle_intChange = this.handle_intChange.bind(this);
    }

    handleClick(e){ // Check box Clicked, load initial settings.
        if(e.target.checked) {
            this.setState({auto_on : true});
            this.props.handleRefIntChange(this.state.prev_int); // Load previous textbox value
        }
        else {
            this.setState({prev_int: this.props.refresh_int}) // Auto off, save value in text box
            this.setState({auto_on : false});
            this.props.handleRefIntChange(0);
        }
    }

    handle_intChange(e){
        let val = parseInt(e.target.value);
        if (val < 0) val = Math.abs(val);
        this.props.handleRefIntChange(val);
    }

    getValidationState(){
        const ref_int = this.props.refresh_int;
        if (ref_int >= 10) return 'success';
        else if (ref_int>0) return 'error';
        return null;
    }

    render() {

        let time_input_box = <span> <FormControl id="ref_secs" type={"text"} bsStyle={"small-width"} value={ this.props.refresh_int } onChange={this.handle_intChange} />
            <ControlLabel htmlFor="ref_secs">Secs.</ControlLabel> </span>;


        return (
            <div>
                <Form inline>
                    <div align="left"><h4>Graph Refresh:</h4>
                        <FormGroup  validationState = {this.getValidationState()}>
                            <Checkbox inline checked={this.state.auto_on } onChange ={this.handleClick}>Automatic</Checkbox>
                            { this.state.auto_on ? time_input_box  : null  }
                        </FormGroup>
                    </div>
                </Form>
            </div>
        )
    }

}

export default ChartRefreshOpt;
