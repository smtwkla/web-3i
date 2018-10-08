import * as React from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import moment from "moment";


class DisplayGraph extends React.Component{
    constructor(props){
        super(props);

        this.state = { status: 'booting', data: [] };
        this.props_changed = this.props_changed.bind(this);
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

    props_changed(prevProps){
        if (this.props.channel.id === prevProps.channel.id && this.props.start === prevProps.start &&
            this.props.end === prevProps.end && this.props.clickcount === prevProps.clickcount)
            return false;
        else return true;
    }

    parse2ISO(st_time){
        var st = moment(st_time, "DD-MM-YYYY HH:mm:ss");
        return st.format("YYYY-MM-DDTHH:mm:ss");
    }

    componentDidUpdate(prevProps){
        if (this.props_changed(prevProps)) {

            if (typeof this.props.channel.id === 'undefined'){
                return null;
            }

            //fetch data
            const chartData = [['Timestamp', this.props.channel.name]]

            let start = null;
            let end = null;

            if(this.props.start === 'today'){
                let cur_t = moment();
                start = cur_t.format('YYYY-MM-DDT00:00:00')
            } else {
                start = this.parse2ISO(this.props.start);
            }

            if(this.props.end==='live'){
                let cur_t = moment();
                end = cur_t.format('YYYY-MM-DDTHH:mm:ss')
            } else {
                end = this.parse2ISO(this.props.end);
            }

            axios.get('http://127.0.0.1:5000/channel_data/' + this.props.channel.id + "?from_ts=" +
                start + '&to_ts='+ end)
                .then(res => {
                    //console.log(res.data);
                    let record = [];
                    if (res.data.length===0) this.setState({status: 'empty'});
                    else {
                        for (let i = 0; i < res.data.length; i++) {
                            record.push(
                                [new Date(res.data[i][0]), res.data[i][1]]
                            );
                        }
                        const data = chartData.concat(record);
                        this.setState({status: 'loaded'});
                        this.setState({data});
                    }
                });

        }

    }

    render(){
        // Gather Query filter details
        // Prepare query
        // Load JSON data from server DB
        // Render Graph

        if (this.state.status === 'loaded') {
            let timing  = this.props.start + " to " + this.props.end;
            return (
                <div>
                    <Chart           chartType="LineChart"
                                     data={this.state.data}
                                     width="100%"
                                     height="500px"
                                     options={{
                                             hAxis: {
                                                 title: 'Time',
                                             },
                                             vAxis: {
                                                 title: this.props.channel.eng_unit,
                                             },
                                         title: this.props.channel.long_name,
                                         legend: { position: 'bottom' },
                                         explorer: {},
                                     }}
                    /> {timing}
                </div>
            )
        }
        else if (this.state.status ==='empty') {
            return (
                <div><h3>No data...</h3></div>
            )

        }
        else{
            return (
                <div><h3>Please choose ...</h3></div>
            )
        }
    }
}

export default DisplayGraph