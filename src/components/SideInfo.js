import React, { Component } from 'react';

class SideInfo extends Component {
    constructor(props) {
        super(props)
    }

    handleStart() {
        this.props.handleStart();
    }

    handleEndTurn() {
        this.props.handleEndTurn(this.props.side);
    }

    render() {
        return (
            <div className={"side-info side-info-" + this.props.side}>
                { !this.props.currentTurn &&
                    <button className={"side-start-" + this.props.side}
                            onClick={() => this.handleStart()}>{this.props.side} start</button>
                }
                { (this.props.currentTurn === this.props.side) &&
                    <div>
                        <h4 className={"side-info-head side-info-head-" + this.props.side}>{this.props.side}'s turn</h4>
                        { this.props.myTurn &&
                            <button onClick={() => this.handleEndTurn()}>end turn</button>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default SideInfo;