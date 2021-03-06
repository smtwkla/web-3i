import * as React from "react";
import { Grid, Row, Col } from 'react-bootstrap';
import Button from "react-bootstrap/lib/Button";
import Form from "react-bootstrap/lib/Form";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Datetime from "react-datetime";
import ChannelChooser from "./ChannelChooser";
import DisplayGraph from "./DisplayGraph"
import ChartRefreshOpt from "./ChartRefreshOpt";
import ButtonOrDateTimePicker from "./ButtonOrDateTimePicker";

import './react-datetime.css';

class ChartBuilder extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            formchannel: 0,
            formRefInt: 0,
            formStartTime: '',
            formEndTime: '',
            channel: 0,
            RefInt: 0,
            StartTime: '',
            EndTime: '',
            prevStartTime: '',
            prevEndTime: '',
            generateClickedCount: 0

        };

        this.handleChannelChange = this.handleChannelChange.bind(this);
        this.handleRefIntChange = this.handleRefIntChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleStartOptClick =this.handleStartOptClick.bind(this);
        this.handleEndOptClick =this.handleEndOptClick.bind(this);
        this.loadGraph = this.loadGraph.bind(this);
        this.forceRef = this.forceRef.bind(this);
        this.unmountTimer = this.unmountTimer.bind(this);
    }

    componentWillUnmount(){
        this.unmountTimer();
    }

    handleChannelChange(chn) {
        this.setState({formchannel: chn});
    }

    handleStartTimeChange(e){
        this.setState({formStartTime: e.format('DD-MM-YYYY HH:mm:ss')});
    }
    handleStartOptClick(e){
        if(e.target.checked){
            this.setState({prevStartTime: this.state.formStartTime});
            this.setState({formStartTime: 'today'});
        } else {
            this.setState({formStartTime: this.state.prevStartTime});
        }
    }

    handleEndOptClick(e){
        if(e.target.checked){
            this.setState({prevEndTime: this.state.formEndTime});
            this.setState({formEndTime: 'live'});
        } else {
            this.setState({formEndTime: this.state.prevEndTime});
        }
    }

    handleEndTimeChange(e){
        this.setState({formEndTime: e.format('DD-MM-YYYY HH:mm:ss')});
    }

    handleRefIntChange(val) {
        this.setState({RefInt: val});
        this.unmountTimer();
        if(val>10){
            console.log("Setting timer..." + val);
            this.forceUpdateInterval = setInterval(() => this.forceRef(), val*1000);
        }
    }

    forceRef() {
        console.log("Timer tick...");
        this.setState({generateClickedCount: this.state.generateClickedCount+1});
    }

    unmountTimer(){
        if (typeof this.forceUpdateInterval !== 'undefined'){
            console.log("Clearing timer...");
            clearInterval(this.forceUpdateInterval)
        }

    }
    loadGraph(){
        this.setState(
            {
                channel: this.state.formchannel,
                StartTime: this.state.formStartTime,
                EndTime: this.state.formEndTime,
                generateClickedCount: this.state.generateClickedCount + 1
            }
        );
    }

    render() {
        return <div>
            <Grid className="chart-controls">
                <Row className="show-grid">
                    <Col xs={4} md={4}>
                        <Form inline>
                            <div align="left"><h4>Channel:</h4>{' '}
                                <ChannelChooser channel_id={this.state.channel.id} onChannelChange={this.handleChannelChange} />
                                <h5>{this.state.formchannel.long_name}</h5>
                            </div>
                        </Form>
                    </Col>
                    <Col xs={2} md={2}>
                        <ButtonOrDateTimePicker label={'Start Time'} option_label={"Today"} value={this.state.formStartTime}
                                                noPicker={this.state.formStartTime!=='today'}
                                                onOptionClick={this.handleStartOptClick}
                                                onTimeChange={this.handleStartTimeChange}/>
                    </Col>
                    <Col xs={2} md={2}>
                        <ButtonOrDateTimePicker label={'End Time'} option_label={"Live"} value={this.state.formEndTime}
                                                noPicker={this.state.formEndTime!=='live'}
                                                onOptionClick={this.handleEndOptClick}
                                                onTimeChange={this.handleEndTimeChange}/>
                    </Col>
                    <Col xs={2} md={2}>

                    </Col>
                    <Col xs={2} md={2}>

                    </Col>

                </Row>
                <Row className="show-grid">
                    <Col xs={4} md={4}>
                        {' '}
                    </Col>
                    <Col xs={4} md={4}>
                        <br/><br/><Button  bsStyle="primary" onClick={this.loadGraph}>Generate Graph</Button>
                    </Col>
                    <Col xs={4} md={4}>
                        <ChartRefreshOpt refresh_int={this.state.RefInt} handleRefIntChange={this.handleRefIntChange}/>
                    </Col>
                </Row>
            </Grid>
            <Grid className="chart-box">
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <br/><DisplayGraph channel={this.state.channel} start={this.state.StartTime} end={this.state.EndTime} options={''} refresh={''} clickcount={this.state.generateClickedCount}/>
                    </Col>
                </Row>
            </Grid>
        </div>
    }


}

export default ChartBuilder