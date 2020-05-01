import React, { Component } from 'react';

class Lobby extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newRoom: '',
        }
    }

    handleCreateRoom() {
        this.props.handleCreateRoom();
    }

    handleJoinRoom() {
        this.props.handleJoinRoom(this.state.newRoom);
    }

    handleEndGame() {
        this.props.handleEndGame();
    }
    
    handleNewRoomChange(e) {
        this.setState({ newRoom: e.target.value });
    }

    render() {
        return (
            <div className="lobby">
                <h3>BIP - BEER[INTERNET]PONG</h3>
                <div>
                    { !this.props.isPlaying && !this.props.isRoomCreator &&  
                        <React.Fragment>
                            <div className="lobby-section lobby-section-create">
                                <button onClick={() => this.handleCreateRoom()}>Create Game</button>
                            </div>
                            <div className="lobby-section lobby-section-join">
                                <label>
                                    Enter Game Code:
                                    <input type="text" onChange={(e) => this.handleNewRoomChange(e)}></input>
                                </label>
                                <button onClick={() => this.handleJoinRoom()}>Join Game</button>
                            </div>
                        </React.Fragment>
                    }
                    { this.props.isPlaying && 
                    <div className="lobby-section lobby-section-end">
                        <button onClick={() => this.handleEndGame()}>End Game</button>
                    </div>
                    }
                    { this.props.isRoomCreator && !this.props.isPlaying && 
                        <div className="lobby-section lobby-section-room">
                            <b>Share This Game Code With Your Opponent: {this.props.roomId}</b>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Lobby;