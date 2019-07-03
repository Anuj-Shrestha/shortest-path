function Enemy() {

	var gameUI = UI.getInstance();
	var ctx = gameUI.getContext();

	var element = new Image();
	element.src = "images/player-enemy-sprites.png";

	var LETTER_A = 65;
	var LETTER_D = 68;
	var LETTER_W = 87;
	var LETTER_S = 83;

	var playerDistance;

	this.x;
	this.y;
	this.initialVelocity = 1.5;
	this.velX = this.initialVelocity;
	this.velY = this.initialVelocity;
	this.destinationX;
	this.destinationY;
	
	this.collisionFlag = false;

	var that = this;

	this.draw = function(rotation, base, hostage) {

	}
	
	this.update = function(player, base, hostage, keyState) {

		that.time++;

	}

	this.elementCollisionCheck = function(collider) {

		var collisionDirection = Utils.getCollisionDirection(collider, that);

		if (collisionDirection == 'l' || collisionDirection == 'r') {
		  collider.velX = 0;
		} else if (collisionDirection == 't' || collisionDirection == 'b') {
		  collider.velY = 0;
		}

		return collisionDirection;
	}
}