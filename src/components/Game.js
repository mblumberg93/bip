import React, { Component } from 'react';
import Table from './Table';
import SideInfo from './SideInfo';
import { STANDARD, FORMATIONS }from '../formations';

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            left_cups_remaining: 10,
            right_cups_remaining: 10,
            left_grid: this.setGrid('left', STANDARD.formation),
            right_grid: this.setGrid('right', STANDARD.formation),
            left_formation_options: this.setFormationOptions(10),
            right_formation_options: this.setFormationOptions(10)
        };
    }

    componentDidUpdate() {
        if (this.props.gameChannel === null || this.props.pubnub === null) {
            return;
        }

        this.props.pubnub.getMessage(this.props.gameChannel, (msg) => {
            if (msg.message.isMove) {
                this.updateGrid(msg.message.side, msg.message.row, msg.message.column)
            }
            if (msg.message.rerack) {
                this.rerack(msg.message.side, msg.message.value);
            }
            if (msg.message.resetGame) {
                this.setState({
                    left_cups_remaining: 10,
                    right_cups_remaining: 10,
                    left_grid: this.setGrid('left', STANDARD.formation),
                    right_grid: this.setGrid('right', STANDARD.formation),
                    left_formation_options: this.setFormationOptions(10),
                    right_formation_options: this.setFormationOptions(10)
                })
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
        const formation = FORMATIONS.filter(formation => formation.value === parseInt(value))[0];
        this.updateCupCount(side, formation.cups);
        const grid = this.setGrid(sideToSet, formation.formation);
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
                this.addOrRemoveCups((side === "left" ? "right" : "left"), (position.active ? 1 : -1));
            }
        });
        if (side === "left") {
            this.setState({ left_grid: grid });
        } else {
            this.setState({ right_grid: grid });
        }
    }

    addOrRemoveCups(side, change) {
        if (side === "left") {
            const cups = this.state.left_cups_remaining + change;
            this.setState({ 
                left_cups_remaining: cups,
                left_formation_options: this.setFormationOptions(cups)
            });
        } else {
            const cups = this.state.right_cups_remaining + change;
            this.setState({ 
                right_cups_remaining: cups,
                right_formation_options: this.setFormationOptions(cups)
            });
        }
    }


    updateCupCount(side, value) {
        if (side === "left") {
            this.setState({ 
                left_cups_remaining: value,
                left_formation_options: this.setFormationOptions(value)
            });
        } else {
            this.setState({ 
                right_cups_remaining: value,
                right_formation_options: this.setFormationOptions(value)
            });
        }
    }

    setFormationOptions(cups) {
        const options = FORMATIONS.filter(formation => formation.cups === cups).map((formation) => {
            return {value: formation.value, name: formation.name}
        });
        return options;
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
                                  opponentsName={this.props.opponentsName}
                                  cupsRemaining={this.state.left_cups_remaining}
                                  formationOptions={this.state.left_formation_options}
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
                                  opponentsName={this.props.opponentsName}
                                  cupsRemaining={this.state.right_cups_remaining}
                                  formationOptions={this.state.right_formation_options}
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