'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { enabled: false };
    }

    render() {
        const chl = <h1>Channel Name: Value</h1>
        return chl
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(LikeButton), domContainer);