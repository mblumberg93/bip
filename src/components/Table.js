import React, { Component } from 'react';
import Rack from './Rack'

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = { };
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
                             grid={this.props.left_grid}
                             handleCupClick={(event) => this.handleCupClick(event)}>
                        </Rack>
                        <Rack key={"right"} 
                              side={"right"}
                              grid={this.props.right_grid}
                              handleCupClick={(event) => this.handleCupClick(event)}>
                        </Rack>
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default Table;