import React, { Component } from 'react';
import PubNubReact from 'pubnub-react';
import Game from './components/Game';
import Lobby from './components/Lobby';
import './App.css';
import { PUBNUB_PUBLISH_KEY, PUBNUB_SUBSCRIBE_KEY } from './secrets';

class App extends Component {
  constructor(props) {  
    super(props);

    this.pubnub = new PubNubReact({
      publishKey: PUBNUB_PUBLISH_KEY, 
      subscribeKey: PUBNUB_SUBSCRIBE_KEY  
    });
    
    this.state = {
      currentTurn: null, // left or right
      myPlayer: null, // left or right
      myTurn: false,
      isPlaying: false, // Set to true when 2 players are in a channel
      isRoomCreator: false,
      createDisabled: false, // whether the create button is disabled
      myName: "",
      opponentsName: ""
    };

    this.lobbyChannel = null; // Lobby channel
    this.gameChannel = null; // Game channel
    this.roomId = null; // Unique id when player creates a room
    this.pubnub.init(this);
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels : [this.lobbyChannel, this.gameChannel]
    });
  }

  componentDidUpdate() {
    // Check that the player is connected to a channel
    if (this.lobbyChannel != null) {
      this.pubnub.getMessage(this.lobbyChannel, (msg) => {
        if (msg.message.startGame) {
          // Create a different channel for the game
          this.gameChannel = 'bipgame--' + this.roomId;

          this.pubnub.subscribe({
            channels: [this.gameChannel]
          });

          if (this.state.isRoomCreator) {
            this.setState({opponentsName: msg.message.playerName});
            alert("You opponent is " + msg.message.playerName);
            this.sendCreatorName();
          } else {
            this.setState({myName: msg.message.playerName});
            this.setState({myPlayer: 'right'})
          }

          this.setState({
            isPlaying: true,
            createDisabled: true
          });
        }
        if (msg.message.startSide) {
          this.setState({ 
            currentTurn: msg.message.startSide,
            myTurn: this.state.myPlayer === msg.message.startSide
          });
        }
        if (msg.message.newSide) {
          this.setState({ 
            currentTurn: msg.message.newSide,
            myTurn: this.state.myPlayer === msg.message.newSide
          });
        }
        if (msg.message.endGame && msg.message.side !== this.state.myPlayer) {
          alert("The Game Has Ended");
        }
        if (msg.message.creatorNameUpdate && !this.state.isRoomCreator) {
          this.setState({opponentsName: msg.message.playerName });
          alert("You opponent is " + msg.message.playerName);
        }
      }); 
    }
  }

  sendCreatorName() {
    this.pubnub.publish({
      message: {
        creatorNameUpdate: true,
        playerName: this.state.myName
      },
      channel: this.lobbyChannel
    });
  }

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  handleCreateRoom(name) {
    // Create a random name for the channel
    this.roomId = this.makeid(5);
    this.lobbyChannel = 'biplobby--' + this.roomId;

    this.pubnub.subscribe({
      channels: [this.lobbyChannel],
      withPresence: true
    });

    this.setState({
      myPlayer: 'left',
      isRoomCreator: true,
      createDisabled: true, // Disable the 'Create' button
      myTurn: false, // Room creator makes the 1st move
      myName: name
    });
  }

  handleJoinRoom(room, name) {
    this.roomId = room;
    this.lobbyChannel = 'biplobby--' + this.roomId;

    // Check the number of people in the channel
    this.pubnub.hereNow({
      channels: [this.lobbyChannel], 
    }).then((response) => { 
        if(response.totalOccupancy < 2){
          this.pubnub.subscribe({
            channels: [this.lobbyChannel],
            withPresence: true
          });
          
          this.setState({
            myPlayer: 'right',
          });
          
          this.pubnub.publish({
            message: {
              startGame: true,
              playerName: name
            },
            channel: this.lobbyChannel
          });
        } 
        else{
          alert("Game in progress. Try another room.");
        }
    }).catch((error) => { 
      console.log(error);
    });
  }

  handleResetTable() {
    this.pubnub.publish({
      message: {
        resetGame: true
      },
      channel: this.gameChannel
    });
  }

  handleChooseStartSide(side) {
    this.setState({ 
      currentTurn: side,
      myTurn: this.state.myPlayer === side
    });
    this.pubnub.publish({
      message: {
        startSide: side
      },
      channel: this.lobbyChannel
    });
  }

  handleEndTurn() {
    const newCurrentTurn = this.state.currentTurn === 'left' ? 'right' : 'left'
    this.pubnub.publish({
      message: {
        newSide: newCurrentTurn
      },
      channel: this.lobbyChannel
    });
  }

  render() {
    return (
      <div className="App">
        <div className="help">
          <a href="https://github.com/mblumberg93/bip" target="_blank" rel="noopener noreferrer">
          click here for instructions on how to play
          </a>
        </div>
        { this.state.isPlaying &&
          <div className={"you-are you-are-" + this.state.myPlayer}>
            <h2>Welcome {this.state.myName}! Your side is <span className="you-are-side">{this.state.myPlayer}</span></h2>
          </div>
        }
        <Lobby roomId={this.roomId}
               isPlaying={this.state.isPlaying}
               isRoomCreator={this.state.isRoomCreator}
               handleCreateRoom={(name) => this.handleCreateRoom(name)}
               handleJoinRoom={(room, name) => this.handleJoinRoom(room, name)}
               handleResetTable={() => this.handleResetTable()}>
        </Lobby>
        <Game currentTurn={this.state.currentTurn}
              myPlayer={this.state.myPlayer}
              myTurn={this.state.myTurn}
              isPlaying={this.state.isPlaying}
              pubnub={this.pubnub}
              gameChannel={this.gameChannel}
              opponentsName={this.state.opponentsName}
              handleChooseStartSide={(side) => this.handleChooseStartSide(side)}
              handleEndTurn={() => this.handleEndTurn()}>
        </Game>
      </div>
    );
    }
  }

  export default App;