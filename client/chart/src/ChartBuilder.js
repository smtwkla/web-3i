import * as React from "react";
import { Grid, Row, Col } from 'react-bootstrap';
import Button from "react-bootstrap/lib/Button";

import ChannelChooser from "./ChannelChooser";
import DisplayGraph from "./DisplayGraph"


class ChartBuilder extends React.Component{

    render() {
        return <Grid>
            <Row className="show-grid">
                <Col xs={4} md={4}>
                    <ChannelChooser/>
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
            <Row className="show-grid">
                <Col xs={12} md={12}>
                    <DisplayGraph channel_id={1}/>
                </Col>
            </Row>
        </Grid>
    }
}

export default ChartBuilder