import React, { Component } from 'react';
import Select from './Select';

class SideInfo extends Component {
    handleStart() {
        this.props.handleStart();
    }

    handleEndTurn() {
        this.props.handleEndTurn(this.props.side);
    }

    handleFormationChange(value) {
        if (value) {
            this.props.pubnub.publish({
                message: {
                    rerack: true,
                    side: this.props.side,
                    value: value
                },
                channel: this.props.gameChannel
            });
        }
    }

    render() {
        return (
            <div className={"side-info side-info-" + this.props.side}>
                { !this.props.currentTurn &&
                    <button className={"side-start-" + this.props.side}
                            onClick={() => this.handleStart()}>{this.props.side} start</button>
                }
                { (this.props.currentTurn === this.props.side) &&
                    <div className={"side-info-controls side-info-controls-" + this.props.side}>
                        <div className="side-info-controls-sub">
                            <h4 className={"side-info-head side-info-head-" + this.props.side}>
                                {this.props.side === this.props.myPlayer ? "your" : (this.props.opponentsName + "'s") } turn</h4>
                            { this.props.myTurn &&
                                <button onClick={() => this.handleEndTurn()}>end turn</button>
                            }
                        </div>
                        { this.props.myTurn &&
                            <div className="side-info-controls-sub">
                                <Select key={"select" + this.props.side}
                                        label="rerack"
                                        options={this.props.formationOptions}
                                        handleChange={(value) => this.handleFormationChange(value)}></Select>
                            </div>
                        }
                        <div className="side-info-controls-sub">
                            { this.props.cupsRemaining } cup(s) remaining
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default SideInfo;