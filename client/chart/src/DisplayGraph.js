import * as React from "react";
import { Chart } from "react-google-charts";


class DisplayGraph extends React.Component{
    render(){
        return <div>Graph here! {this.props.channel_id}
            <Chart           chartType="ScatterChart"
                             data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
                             width="100%"
                             height="400px"
                             legendToggle/>
        </div>
    }
}

export default DisplayGraph