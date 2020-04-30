import React, { Component } from 'react';
import Rack from './Rack'

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            left_grid: this.setGrid('left', this.props.left_formation),
            right_grid: this.setGrid('right', this.props.right_formation)
        };
    }

    componentDidUpdate() {
        if (this.gameChannel === null || this.props.pubnub === null) {
            return;
        }

        this.props.pubnub.getMessage(this.props.gameChannel, (msg) => {
            if (msg.message.isMove) {
                this.updateGrid(msg.message.side, msg.message.row, msg.message.column)
            }
        });
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

    handleCupClick(event) {
        if (this.props.currentTurn !== this.props.myPlayer) {
            return;
        }
        if (event.side === this.props.myPlayer){
            return;
        }
        this.props.pubnub.publish({
            message: {
                isMove: true,
                side: event.side,
                row: event.row,
                column: event.column
            },
            channel: this.props.gameChannel
        });
    }


    render() {
        return (
            <div className="table">
                { this.props.isPlaying &&
                    <React.Fragment>
                      <Rack key={"left"} 
                             side={"left"}
                             grid={this.state.left_grid}
                             handleCupClick={(event) => this.handleCupClick(event)}>
                        </Rack>
                        <Rack key={"right"} 
                              side={"right"}
                              grid={this.state.right_grid}
                              handleCupClick={(event) => this.handleCupClick(event)}>
                        </Rack>
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default Table;