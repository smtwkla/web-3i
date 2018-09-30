import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import ChannelDropDown from './ChannelChoose.js'

import './App.css';

class App extends Component {
  render() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12"><h1>DAQ-3i - Industrial IOT Dashboard</h1></div>
            </div>

            <div className="row">
                <div className="col-sm-2">[Menu]<br/>
                    <ChannelDropDown/></div>
                <div className="col-sm-10">[Dashboard]</div>
            </div>

        </div>    );
  }
}

export class AlertDismissable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      show: true
    };
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    if (this.state.show) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
          <h4>Oh snap! You got an error!</h4>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
          <p>
            <Button bsStyle="danger">Take this action</Button>
            <span> or </span>
            <Button onClick={this.handleDismiss}>Hide Alert</Button>
          </p>
        </Alert>
      );
    }

    return <Button onClick={this.handleShow}>Show Alert</Button>;
  }
}


export default App;
