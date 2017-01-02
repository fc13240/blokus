/**
  * cordinate implementaiton
  **/
  var Coordinate = function(x,y) {
  	this.x=parseInt(x);
  	this.y=parseInt(y);
    this.z=0;
  };

  Coordinate.prototype = {
  	add : function(other){
      return new Coordinate(this.x+other.x, this.y+other.y);
  	},

    _rotate : function(angle){

      var rotM = [[Math.cos(angle), Math.sin(angle),0],
                  [-Math.sin(angle), Math.cos(angle), 0],
                  [0,0,0]];

      return new Coordinate(parseInt((this.x*rotM[0][0]+this.y*rotM[0][1]+this.z*rotM[0][2]).toFixed(0)), parseInt((this.x*rotM[1][0]+this.y*rotM[1][1]+this.z*rotM[1][2]).toFixed(0)));
    },

    rotate90Right : function(){
      var ninety = Math.PI/2;
      return this._rotate(ninety);
    },

    rotate90Left : function(){
      var ninety = -Math.PI/2;
      return this._rotate(ninety);
    },

    equals : function(other){
      return this.x===other.x && this.y===other.y && other.z===this.z;
    },
    /**
     * Return true if the coordinates share
     * a value on any axis.
     **/
    borders : function(other){
      //TODO: Add Z check
      return (Math.abs(this.x-other.x)===1 && (this.y===other.y)) ||
             (Math.abs(this.y-other.y)===1 && (this.x===other.x));
    },
    /**
     * Returns true if the coordinates are offSet
     * by 1 in any dimension.
     **/
     corners : function(other){
       return Math.abs(this.x-other.x)===1 && Math.abs(this.y-other.y)===1;
     },

     /**
      * Get a dto version of this
      **/
      value : function(){
        return {x:this.x, y:this.y, z:this.z};
      }

  };

if(typeof window !== 'undefined'){
  window.Coordinate=Coordinate;
}

  module.exports=Coordinate;
