import React, { Component } from 'react';
import Cup from './Cup';

class Square extends Component {
    constructor(props) {
        super(props)
        this.state = { };
    }

    handleCupClick() {
        this.props.handleCupClick({
            side: this.props.side,
            row: this.props.row,
            column: this.props.column
        });
    }

    render() {
        return (
            <div className="square">
                { this.props.hasCup && 
                   <Cup key={"cup_" + this.props.side + this.props.index}
                        side={this.props.side}
                        index={this.props.index}
                        active={this.props.active}
                        visible={this.props.hasCup}
                        handleClick={() => this.handleCupClick()}>
                   </Cup> 
                }
            </div>
        );
    }
}

export default Square;