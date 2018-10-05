import * as React from "react";
import { Chart } from "react-google-charts";


class DisplayGraph extends React.Component{
    render(){
        return <div>Graph here! {this.props.channel.long_name}
            <Chart           chartType="LineChart"
                             data={[["Age", "Weight"], [4, 5.5], [8, 12], [9, 13.5], [ 12, 21] ]}
                             width="100%"
                             height="400px"
                             />
        </div>
    }
}

export default DisplayGraph