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

    handleEndTurn() {
        this.props.handleEndTurn();
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
                                  myPlayer={this.props.myPlayer}
                                  handleStart={() => this.handleChooseStartSide("left")}
                                  handleEndTurn={() => this.handleEndTurn()}>
                        </SideInfo>
                        <SideInfo key="sideinforight"
                                  side="right"
                                  currentTurn={this.props.currentTurn}
                                  myTurn={this.props.myTurn}
                                  myPlayer={this.props.myPlayer}
                                  handleStart={() => this.handleChooseStartSide("right")}
                                  handleEndTurn={() => this.handleEndTurn()}>
                        </SideInfo>
                    </React.Fragment>
                }
                <Table left_formation={this.state.left_formation}
                       right_formation={this.state.right_formation}
                       isPlaying={this.props.isPlaying}
                       pubnub={this.props.pubnub}
                       gameChannel={this.props.gameChannel}
                       currentTurn={this.props.currentTurn}
                       myPlayer={this.props.myPlayer}>
                </Table>
            </div>
        );
    }
}

export default Game;