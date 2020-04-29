import React, { Component } from 'react';
import Table from './Table';
import SideInfo from './SideInfo';
import { STANDARD }from '../formations';

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            left_formation: STANDARD,
            right_formation: STANDARD
        };
    }

    handleChooseStartSide(side) {
        this.props.handleChooseStartSide(side);
    }

    handleEndTurn(side) {
        this.props.handleEndTurn(side);
    }

    render() {
        return (
            <div className="game">
                { this.props.isPlaying &&
                    <React.Fragment>
                        <SideInfo key="sideinfoleft"
                                  side="left"
                                  currentTurn={this.props.currentTurn}
                                  myTurn={this.props.myTurn}
                                  mySide={this.props.mySide}
                                  handleStart={() => this.handleChooseStartSide("left")}
                                  handleEndTurn={side => this.handleEndTurn(side)}>
                        </SideInfo>
                        <SideInfo key="sideinforight"
                                  side="right"
                                  currentTurn={this.props.currentTurn}
                                  myTurn={this.props.myTurn}
                                  mySide={this.props.mySide}
                                  handleStart={() => this.handleChooseStartSide("right")}
                                  handleEndTurn={side => this.handleEndTurn(side)}>
                        </SideInfo>
                    </React.Fragment>
                }
                <Table turn={this.state.turn}
                       left_formation={this.state.left_formation}
                       right_formation={this.state.right_formation}
                       isPlaying={this.props.isPlaying}></Table>
            </div>
        );
    }
}

export default Game;