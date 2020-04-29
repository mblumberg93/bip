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
                grid.push({row: r, column: c, hasCup: hasCup});
            });
        });
        return grid;
    }

    render() {
        return (
            <div className="table">
                { this.props.isPlaying &&
                    <React.Fragment>
<                       Rack key={"left"} 
                             side={"left"}
                             grid={this.state.left_grid}
                             turn={this.props.turn}>
                        </Rack>
                        <Rack key={"right"} 
                              side={"right"}
                              grid={this.state.right_grid}
                              turn={this.props.turn}>
                        </Rack>
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default Table;