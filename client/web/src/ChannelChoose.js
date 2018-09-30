import React from 'react';


class ChannelDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: "" };
  }

  render() {
        return <select> <option>Paddle 2 Amps</option><option>Paddle 2 RPM</option><option>C3 Torque</option></select>
  }
}

export default ChannelDropDown;