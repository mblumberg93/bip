import React, { Component } from 'react';
import Cup from './Cup';

class Square extends Component {
    constructor(props) {
        super(props)
        this.state = { };
    }

    handleCupClick(active) {
        //potential do something here down the road
    }

    render() {
        return (
            <div className="square">
                { this.props.hasCup && 
                   <Cup key={"cup_" + this.props.side + this.props.index}
                        side={this.props.side}
                        turn={this.props.turn}
                        index={this.props.index}
                        handleClick={active => this.handleCupClick(active)}>
                   </Cup> 
                }
            </div>
        );
    }
}

export default Square;