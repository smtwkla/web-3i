import * as React from "react";
import { Grid, Row, Col } from 'react-bootstrap';
import Button from "react-bootstrap/lib/Button";

import ChannelChooser from "./ChannelChooser";
import DisplayGraph from "./DisplayGraph"


class ChartBuilder extends React.Component{

    constructor(props) {
        super(props);
        this.handleChannelChange = this.handleChannelChange.bind(this);
        this.handleChannelNameChange = this.handleChannelNameChange.bind(this);
        this.state = { channel_id: 1, channel_name: "Chl1"};
    }

    handleChannelChange(chn) {
        this.setState({channel_id: chn});
    }

    handleChannelNameChange(chn) {
        this.setState({channel_name: chn});
    }


    render() {
        return <div>
            <Grid className="chart-controls">
                <Row className="show-grid">
                    <Col xs={4} md={4}>
                        <ChannelChooser channel={this.state.channel} onChannelChange={this.handleChannelChange} onChannelNameChange={this.handleChannelNameChange}/>
                    </Col>
                    <Col xs={4} md={4}>
                        Start
                    </Col>
                    <Col xs={4} md={4}>
                        End
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
                        <DisplayGraph channel_id={this.state.channel_id}/>
                    </Col>
                </Row>
            </Grid>
        </div>
    }
}

export default ChartBuilder