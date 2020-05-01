import React, { Component } from 'react';
import Table from './Table';
import SideInfo from './SideInfo';
import { STANDARD, FORMATIONS }from '../formations';

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            left_grid: this.setGrid('left', STANDARD.formation),
            right_grid: this.setGrid('right', STANDARD.formation)
        };
    }

    componentDidUpdate() {
        if (this.props.gameChannel === null || this.props.pubnub === null) {
            return;
        }

        this.props.pubnub.getMessage(this.props.gameChannel, (msg) => {
            console.log(msg);
            if (msg.message.isMove) {
                this.updateGrid(msg.message.side, msg.message.row, msg.message.column)
            }
            if (msg.message.rerack) {
                this.rerack(msg.message.side, msg.message.value);
            }
        });
    }

    handleChooseStartSide(side) {
        this.props.handleChooseStartSide(side);
    }

    handleEndTurn() {
        this.props.handleEndTurn();
    }

    rerack(side, value) {
        const sideToSet = side === "left" ? "right" : "left"
        const formation = FORMATIONS.filter(formation => formation.value === parseInt(value))[0].formation;
        const grid = this.setGrid(sideToSet, formation);
        if (sideToSet === "left") {
            this.setState({ left_grid: grid });
        } else {
            this.setState({ right_grid: grid });
        }
    }

    squareHasCup(formation, row, column) {
        for (const position of formation) {
            if (position.row === row && position.column === column) {
                return true;
            }
        }
        return false;
    }

    setGrid(side, formation) {
        const size = [...Array(7).keys()];
        const grid = [];
        size.forEach((_, row) => {
            size.forEach((_, column) => {
                const r = side === 'left' ? row : 6 - row;
                const c = side === 'left' ? column : 6 - column;
                const hasCup = this.squareHasCup(formation, r, c);
                grid.push({
                    row: r, 
                    column: c, 
                    hasCup: hasCup,
                    active: hasCup
                });
            });
        });
        return grid;
    }

    updateGrid(side, row, column) {
        const grid = side === "left" ? this.state.left_grid : this.state.right_grid;
        grid.forEach((position) => {
            if (position.row === row && position.column === column) {
                position.active = !position.active;
            }
        });
        if (side === "left") {
            this.setState({ left_grid: grid });
        } else {
            this.setState({ right_grid: grid });
        }
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
                                  pubnub={this.props.pubnub}
                                  gameChannel={this.props.gameChannel}
                                  handleStart={() => this.handleChooseStartSide("left")}
                                  handleEndTurn={() => this.handleEndTurn()}>
                        </SideInfo>
                        <SideInfo key="sideinforight"
                                  side="right"
                                  currentTurn={this.props.currentTurn}
                                  myTurn={this.props.myTurn}
                                  myPlayer={this.props.myPlayer}
                                  pubnub={this.props.pubnub}
                                  gameChannel={this.props.gameChannel}
                                  handleStart={() => this.handleChooseStartSide("right")}
                                  handleEndTurn={() => this.handleEndTurn()}>
                        </SideInfo>
                    </React.Fragment>
                }
                <Table left_formation={this.state.left_formation}
                       right_formation={this.state.right_formation}
                       left_grid={this.state.left_grid}
                       right_grid={this.state.right_grid}
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