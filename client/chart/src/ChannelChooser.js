import {Component} from "react";
import React from "react";
import axios from 'axios';


class ChannelChooser extends Component {
    constructor (props){
        super(props);
        this.state = {
            loaded: false,
            channels : []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:5000/channels')
            .then(res => {
                console.log(res.data[0]);
                const channels = res.data;
                this.setState({loaded: true});
                this.setState({ channels });
            });
    }
    handleChange(e){
        const channel = this.state.channels[e.target.value]; // lookup channel from local state
        //const channel = { id: e.target.value, name: e.target.options[e.target.selectedIndex].text, eng_unit: e.target };
        this.props.onChannelChange(channel);
    }

    render() {
        const channel_id =  this.props.channel_id;
        var obj = this.state.channels;
        return <div>
            <select value={channel_id} onChange={this.handleChange}>
                {
                    obj.map(function(object, i) { return <option key={i} value={i}>{object.name}</option>;})
                }
            </select>
        </div>
    }
}

export default ChannelChooser