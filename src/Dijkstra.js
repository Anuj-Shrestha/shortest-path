function Dijkstra() {
	// variables are defined here
	var gameUI = UI.getInstance();
	var canvas = gameUI.getCanvas();
	var ctx = gameUI.getContext();
	
	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;

	var keyState;
	// var LETTER_A = 65;
	// var LETTER_D = 68;
	// var LETTER_W = 87;
	// var LETTER_S = 83;

	var requestAnimation;
	var stopped = false;
	

	var shortestPathArray;
	var endPosition = {x: 0, y: 0}
	var that = this;


	this.init = function() {

		gameUI.setWidth(WIDTH);
		gameUI.setHeight(HEIGHT);
		gameUI.show();
	

		let gridArray = [['S', 'w', 'P', 'P', 'P', 'W', 'P', 'P'],
			['P', 'W', 'P', 'P', 'W', 'P', 'P', 'P'],
			['P', 'P', 'P', 'P', 'w', 'w', 'P', 'P'],
			['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
			['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
			['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
			['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P']]
		// let gridArray = [['P', 'w', 'P', 'P'],['P', 'P', 'P', 'P'],['P', 'P', 'P', 'P'],['P', 'P', 'P', 'S']]
		gameGrid = gridArray

		that.generateGrid(gridArray);
		that.bindKeysPressed();
		var startGameLoop = function() {
			// this function will be called repeatedly while game is running
			// here game objects are updated and drawn

			shortestPathArray = Utils.getShortestPathArray(gridArray)

			// that.updateGameObjects();
			that.drawGameObjects();
			if (!stopped) {
				requestAnimation = window.requestAnimationFrame(startGameLoop, canvas);
			}
		};

		requestAnimation = window.requestAnimationFrame(startGameLoop, canvas);
	}

	that.generateGrid = (gridArray) => {
		that.gameGrid = new Grid()
		that.gameGrid.init(gridArray)
	}

	that.updateGameObjects = function() {
		console.log('here')
		that.gameGrid.update(keyState, endPosition)
	}

	that.drawGameObjects = function() {
		gameUI.clear(0, 0, WIDTH, HEIGHT)
		that.gameGrid.draw(shortestPathArray, endPosition)
	}

	that.bindKeysPressed = function() {

		// keep track of keypressed 
		keyState = [];

		document.addEventListener('keypress', function(evt) {
			keyState = evt.keyCode
			that.updateGameObjects()
		});

		document.addEventListener('keyup', function(evt) {
			delete keyState[evt.keyCode];
		});

	}

}
