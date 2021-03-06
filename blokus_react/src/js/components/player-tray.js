var React = require('react');
var ReactDOM = require('react-dom');
require('babel-core');
require('./board');
require('./shape-view');
var cx = require("classnames");

var PlayerTray = React.createClass({
    getInitialState: function() {


      return {selected:-1};
    },
    componentWillMount: function () {
      //this.prepareComponentState(this.props);
    },
    componentWillReceiveProps: function (nextProps) {
      this.prepareComponentState(nextProps);
    },
    prepareComponentState: function (props) {
      var sf = new ShapeFactory();

      var shapeSet = sf.buildShapeSet(props.playerData.colour);

      //Filter on the set we have, dont create from scrathc everytime
      //some might have been rotated.
      if(this.state.shapes){
        shapeSet = this.state.shapes;
      }

      //Filter out the played shapes
      shapeSet = shapeSet.filter(function(s){
          return !props.playerData.hasPlayedShape(s);
        }.bind(this))

      this.setState({shapes:shapeSet});
    },
    shapeDropped: function(s) {

      //Filter out the played shapes
      var shapeSet = this.state.shapes.filter(function(s){
          return !this.props.playerData.hasPlayedShape(s);
        }.bind(this))

        this.setState({shapes:shapeSet});
    },
    _createClickHandler : function(){
      return this.props.endTurnHandler;
    },

    _selected : function(id){
      this.setState({selected:id});
    },
    /**
     * The shape needs to be rotated
     * which is a change to the current shape
     * and replace.
     **/
    _rotateShapeRight : function(shape){
      var newShape = shape.rotateRight90().normalise();
      var newShapes = this.state.shapes.replace(function(el){
        return el.equals(shape);
      }.bind(this), newShape);
      this.setState({shapes:newShapes});
    },
    _flipX:function(shape){
      var newShape = shape.flipOverX().normalise();
      var newShapes = this.state.shapes.replace(function(el){
        return el.equals(shape);
      }.bind(this), newShape);
      this.setState({shapes:newShapes});
    },
    _flipY:function(shape){
      var newShape = shape.flipAroundY().normalise();
      var newShapes = this.state.shapes.replace(function(el){
        return el.equals(shape);
      }.bind(this), newShape);
      this.setState({shapes:newShapes});
    },
    render: function() {
      if(!this.state.shapes){
        return (<div></div>);
      }
      var cellClassNames = "";
      if(this.props.playerData.colour!==this.props.currentTurn){
        cellClassNames = "hide";
      }
      cellClassNames = cx(cellClassNames);
      var shapesEl = [];
      var cnter = 0;

      this.state.shapes.forEach(function(el){

        shapesEl.push(<ShapeView  rotateRight={this._rotateShapeRight} flipX={this._flipX} flipY={this._flipY} shapeSelected={this._selected} currentSelected={this.state.selected} shapeDragged={this.props.shapeDragged} shapeDragEnd={this.shapeDropped} shapeId={cnter} key={cnter} shape={el}/>);
        cnter+=1;
      }.bind(this));
      var key = "tray_" + this.props.playerData.colour;
      return (
        <div className={cellClassNames}>
          <span  tabindex="0" className="label label-info"  >
            {this.props.playerData.colour} has pieces to play:
          </span>
          <div>
            {shapesEl}
          </div>
          <input type="button" value="End Turn" className="btn btn-info" onClick={this._createClickHandler()}/>
       </div>
      );
    }
});


window.PlayerTray = PlayerTray;
