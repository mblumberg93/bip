import React, { Component } from 'react';
import Square from './Square';

class Rack extends Component {
    constructor(props) {
        super(props)
        this.state = { };
    }

    render() {
        const squares = this.props.grid.map((position, i) => {
            return (
                <Square key={"square_" + this.props.side + i}
                        index={i}
                        side={this.props.side}
                        row={position.row}
                        column={position.column}
                        hasCup={position.hasCup}
                        turn={this.props.turn}>
                </Square>
            );
        })

        return (
            <div className={"rack rack-" + this.props.side}>
                { squares }
            </div>
        );
    }
}

export default Rack;