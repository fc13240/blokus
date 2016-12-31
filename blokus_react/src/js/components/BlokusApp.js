var React = require('react');
var ReactDOM = require('react-dom');
require('babel-core');
require('./player');
require('./board-table');
require('../services/SessionProvider');


var dt = new  Date();
var i = 0;
var BlokusApp = React.createClass({
    getInitialState: function() {

      console.log("Route props " + this.props.params);
      SessionProvider.loadSession(this.props.params.playerId).then(function(data) {
        //browserHistory.push('/play/' + data.gameId + "/" + data.id);
        this.setState({session:SessionProvider.parseTurn(data)});
      }.bind(this));
      return {session:SessionProvider.createNewSession()};
    },
    endCurrentTurn : function(){
      var sess = this.state.session.game.nextTurn();
      SessionProvider.saveSession(sess);
      this.setState({session:sess});
    },
    shapePlayed : function(s){
      var player = this.state.session.game.getPlayer(s.colour);
      var newGame = this.state.session.game.updatePlayer(player.shapePlayed(s));
      var newTurn = this.state.session.setGame(newGame);
      this.setState({session:newTurn});
    },
    loadSession : function(){
      var sess = SessionProvider.loadSession();
      this.setState({session:sess});
    },
    render: function() {
      return (
      <div>
        <div>
          <button onClick={this.loadSession}>Load Game</button>
          </div>
        <BoardTable session={this.state.session} shapePlayed={this.shapePlayed} endTurnHandler={this.endCurrentTurn}/>
      </div>
      );
    }
});



window.BlokusApp = BlokusApp;
