function Player() {

	var gameUI = GameUI.getInstance();
	var canvas = gameUI.getCanvas();
	var ctx = gameUI.getContext();

	var LETTER_A = 65;
	var LETTER_D = 68;
	var LETTER_W = 87;
	var LETTER_S = 83;

	
	this.x;
	this.y;
	this.velX = 1;
	this.velY = 1;

	this.centerX = this.x + this.width / 2;
	this.centerY = this.y + this.height / 2;
	this.playerRotation;
	
	this.initialVelocity = 3;

	var that = this;

	this.setPosition = function(x, y) {
		that.x = x;
		that.y = y;
	}

	this.keyPressed = function(keyState) {
	
    if (keyState.hasOwnProperty(LETTER_W) || keyState.hasOwnProperty(LETTER_S) || 
    	keyState.hasOwnProperty(LETTER_A) || keyState.hasOwnProperty(LETTER_D)) {
    	return true;
    }
     
    return false;
	}

	this.setDimension = function(width, height) {
		that.width = width;
		that.height = height;
	}

	this.draw = function(rotation, keyState) {
	
	}
	
	this.update = function(keyState) {
		
	}
}
