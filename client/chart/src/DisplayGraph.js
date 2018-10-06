import * as React from "react";
import { Chart } from "react-google-charts";
import axios from "axios";


class DisplayGraph extends React.Component{
    constructor(props){
        super(props);

        this.state = { status: 'booting', data: [] };

    }

    componentDidMount(){

        /*if(this.state.status==='loaded' || this.state.status==='booting' ) {
            this.setState({status: 'loading'});

            const chartData = [['Timestamp', this.props.channel.name]]

            axios.get('http://127.0.0.1:5000/channel_data/1')
                .then(res => {
                    console.log(res.data);
                    const data = chartData.concat(res.data);
                    this.setState({status: 'loaded'});
                    this.setState({data});
                });
        }*/
    }

    componentDidUpdate(prevProps){
        if (this.props.channel.id === prevProps.channel.id){}
        else {
            //fetch data
            const chartData = [['Timestamp', this.props.channel.name]]

            axios.get('http://127.0.0.1:5000/channel_data/1')
                .then(res => {
                    console.log(res.data);
                    let record = [];
                    for(let i = 0; i<res.data.length; i++){
                        record.push(
                            [ new Date(res.data[i][0]) , res.data[i][1] ]
                        );
                    }
                    const data = chartData.concat(record);
                    this.setState({status: 'loaded'});
                    this.setState({data});
                });

        }

    }

    render(){
        // Gather Query filter details
        // Prepare query
        // Load JSON data from server DB
        // Render Graph

        if (this.state.status === 'loaded') {
            console.log("Rendering data");
            console.log(this.state.data[1]);
            return (
                <div>Graph here! {this.props.channel.long_name}
                    <Chart           chartType="LineChart"
                                     data={this.state.data}
                                     width="100%"
                                     height="400px"
                    />
                </div>
            )
        } else {
            return (
                <div><h3>Loading data...</h3></div>
            )
        }
    }
}

export default DisplayGraph