import * as React from "react";
import { Grid, Row, Col } from 'react-bootstrap';
import Button from "react-bootstrap/lib/Button";
import Datetime from "react-datetime";
import ChannelChooser from "./ChannelChooser";
import DisplayGraph from "./DisplayGraph"

import './react-datetime.css';

class ChartBuilder extends React.Component{

    constructor(props) {
        super(props);
        this.handleChannelChange = this.handleChannelChange.bind(this);
        this.state = { channel: 0 };
    }

    handleChannelChange(chn) {
        this.setState({channel: chn});
    }


    render() {
        return <div>
            <Grid className="chart-controls">
                <Row className="show-grid">
                    <Col xs={4} md={4}>
                        <ChannelChooser channel_id={this.state.channel.id} onChannelChange={this.handleChannelChange} />
                    </Col>
                    <Col xs={4} md={4}>
                        Start: <Datetime dateFormat={'DD-MM-YYYY'} timeFormat={'HH:mm:ss'}/>
                    </Col>
                    <Col xs={4} md={4}>
                        End: <Datetime dateFormat={'DD-MM-YYYY'} timeFormat={'HH:mm:ss'}/>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={4} md={4}>
                        Color Options, Line
                    </Col>
                    <Col xs={4} md={4}>
                        Scale
                    </Col>
                    <Col xs={4} md={4}>
                        Refresh Control
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <Button  bsStyle="primary">Generate Graph</Button>
                    </Col>
                </Row>
            </Grid>
            <Grid className="chart-box">
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <DisplayGraph channel={this.state.channel} start={'2018-10-06T12:00:00'} end={'2018-10-06T23:59:59'} options={''} refresh={''} />
                    </Col>
                </Row>
            </Grid>
        </div>
    }
}

export default ChartBuilder