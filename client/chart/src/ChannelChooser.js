import {Component} from "react";
import React from "react";
import axios from 'axios';


class ChannelChooser extends Component {
    constructor (props){
        super(props);
        this.state = {
            channels : []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:5000/channels')
            .then(res => {
                console.log(res.data[0]);
                const channels = res.data;
                alert("loaded");
                this.setState({ channels });
            });
    }
    handleChange(e){
        const channel_id = e.target.value;
        const channel_name = e.target.options[e.target.selectedIndex].text;
        this.props.onChannelChange(channel_id);
        this.props.onChannelNameChange(channel_name);

    }

    render() {
        const channel =  this.props.channel;
        var obj = this.state.channels;
        return <div>
            <select value={channel} onChange={this.handleChange}>
                {
                    obj.map(function(object, i) { return <option key={object.id} value={object.id}>{object.name}</option>;})
                }
            </select>
        </div>
    }
}

export default ChannelChooser