import React, { Component } from 'react';

class Cup extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            active: true
        };
    }

    handleClick() {
        if (this.props.turn !== this.props.side) {
            this.setState({ active: !this.state.active });
            this.props.handleClick(this.state.active);
        }
    }

    render() {
        return (
            <div key={"square_" + this.props.side + this.props.index}
                 className={"cup cup-" + this.props.side + (this.state.active ? "" : " cup-inactive")}
                 onClick={() => this.handleClick()}
                 ></div>
        );
    }
}

export default Cup;