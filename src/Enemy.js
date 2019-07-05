function Enemy() {

	var gameUI = UI.getInstance();
	var ctx = gameUI.getContext();

	var element = new Image();
	// element.src = "src/assets/images/ghost.png";
	element.src = "src/assets/images/player.png";
	element.onload = function() {
		console.log('image loaded')
	}
	var playerDistance;

	this.x;
	this.y;

	this.sX = 0;
	this.sY = 0;
	this.sWidth = 180;
	this.width = 100;
	this.height = 100;
	this.increment = 3;

	this.initialVelocity = 1.5;
	this.velX = this.initialVelocity;
	this.velY = this.initialVelocity;
	this.destinationX;
	this.destinationY;
	
	this.collisionFlag = false;

	var that = this;

	this.draw = function() {
		gameUI.draw(element, that.sX, that.sY, that.sWidth, that.sWidth, that.x, that.y, that.width, that.height);
	}
	
	this.update = function(gameGrid, endPosition) {
		that.x = endPosition.x * gameGrid.gridWidth
		that.y = endPosition.y * gameGrid.gridWidth
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