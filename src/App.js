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
      createDisabled: false // whether the create button is disabled
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
        // Create a different channel for the game
        this.gameChannel = 'bipgame--' + this.roomId;

        this.pubnub.subscribe({
          channels: [this.gameChannel]
        });

        if (!this.state.isRoomCreator) {
          this.state.myPlayer = 'right';
        }

        this.setState({
          isPlaying: true,
          createDisabled: true
        });
      }); 
    }

    if (this.gameChannel != null) {
      this.pubnub.getMessage(this.gameChannel, (msg) => {
        if (msg.message.startSide) {
          this.setState({ 
            currentTurn: msg.message.startSide,
            myTurn: this.state.myPlayer === msg.message.startSide
          });
        }
      });
    }
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

  handleCreateRoom() {
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
    });
  }

  handleJoinRoom(room) {
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
              notRoomCreator: true, //maybe can rename, doesnt seem to be used
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

  handleEndGame() {
    this.setState({
      myPlayer: null,
      isPlaying: false,
      isRoomCreator: false,
      createDisabled: false,
      myTurn: false,
    });

    this.lobbyChannel = null;
    this.gameChannel = null;
    this.roomId = null;  

    this.pubnub.unsubscribe({
      channels : [this.lobbyChannel, this.gameChannel]
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
      channel: this.gameChannel
    });
  }

  handleEndTurn() {
    const newCurrentTurn = this.state.currentTurn === 'left' ? 'right' : 'left'
    this.setState({ 
      currentTurn: newCurrentTurn,
      myTurn: false
    });
    //send a message to the channel
  }

  render() {
    return (
      <div className="App">
        <Lobby roomId={this.roomId}
               isPlaying={this.state.isPlaying}
               isRoomCreator={this.state.isRoomCreator}
               handleCreateRoom={() => this.handleCreateRoom()}
               handleJoinRoom={(room) => this.handleJoinRoom(room)}
               handleEndGame={() => this.handleEndGame()}>
        </Lobby>
        <Game currentTurn={this.state.currentTurn}
              mySide={this.state.mySide}
              myPlayer={this.state.myPlayer}
              myTurn={this.state.myTurn}
              isPlaying={this.state.isPlaying}
              handleChooseStartSide={(side) => this.handleChooseStartSide(side)}>
        </Game>
        <div className="state-view">
          <div><b>Current State</b></div>
          <div>currentTurn: {this.state.currentTurn}</div>
          <div>myPlayer: {this.state.myPlayer}</div>
          <div>myTurn: {this.state.myTurn.toString()}</div>
          <div>isPlaying: {this.state.isPlaying.toString()}</div>
          <div>isRoomCreator: {this.state.isRoomCreator.toString()}</div>
          <div>createDisabled: {this.state.createDisabled.toString()}</div>
        </div>
      </div>
    );
    }
  }

  export default App;