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
	
	var gameGrid

	var startPosition = {x: 1, y: 2}
	var endPosition = {x: 7, y: 7}
	var gridArray = [['P', 'W', 'P', 'P', 'P', 'W', 'P', 'P','P', 'W', 'P', 'P', 'P', 'W', 'P', 'P',], //0
		['P', 'W', 'P', 'P', 'W', 'P', 'P', 'P','P', 'W', 'P', 'P', 'P', 'W', 'P', 'P',], //1
		['P', 'W', 'P', 'P', 'W', 'P', 'P', 'P','P', 'W', 'P', 'P', 'P', 'W', 'P', 'P',], //2
		['P', 'W', 'P', 'P', 'W', 'P', 'P', 'P','P', 'W', 'P', 'P', 'P', 'W', 'P', 'P',], //3
		['P', 'P', 'P', 'P', 'P', 'W', 'P', 'P','P', 'W', 'P', 'P', 'P', 'P', 'P', 'P',], //4
		['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P','P', 'W', 'P', 'P', 'P', 'W', 'P', 'P',],//5
		['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P','P', 'W', 'P', 'P', 'P', 'W', 'P', 'P',],//6
		['P', 'W', 'P', 'P', 'P', 'W', 'P', 'P','P', 'W', 'W', 'W', 'W', 'P', 'P', 'P'],//7
		['P', 'W', 'P', 'P', 'P', 'W', 'P', 'P','P', 'P', 'P', 'P', 'W', 'P', 'P', 'P'],//8
		['P', 'W', 'P', 'P', 'P', 'W', 'P', 'P','P', 'P', 'P', 'P', 'W', 'P', 'P', 'P'],//9
		['P', 'W', 'P', 'P', 'P', 'W', 'P', 'P','P', 'P', 'P', 'P', 'W', 'P', 'P', 'P'],//10
		['P', 'W', 'P', 'P', 'P', 'W', 'P', 'P','P', 'P', 'P', 'P', 'W', 'P', 'P', 'P'],//11
		['P', 'W', 'P', 'P', 'P', 'W', 'P', 'P','P', 'P', 'W', 'P', 'P', 'P', 'P', 'P'],//12
		['P', 'W', 'P', 'P', 'P', 'W', 'P', 'P','P', 'P', 'W', 'P', 'P', 'P', 'P', 'P'],//13
		['P', 'W', 'P', 'P', 'P', 'W', 'P', 'P','P', 'P', 'W', 'P', 'P', 'P', 'P', 'P'],//14
		['P', 'W', 'P', 'P', 'P', 'W', 'P', 'P','P', 'P', 'P', 'P', 'W', 'P', 'P', 'P']]//15
	// let gridArray = [['P', 'W', 'P', 'P'],['P', 'P', 'P', 'P'],['P', 'P', 'P', 'P'],['P', 'P', 'P', 'S']]	var that = this;

	var enemy;
	var player;
	let that = this

	this.init = function() {

		gameUI.setWidth(WIDTH);
		gameUI.setHeight(HEIGHT);
		gameUI.show();
		
		that.generateGrid(gridArray);
		that.bindKeysPressed();

		enemy = new Enemy()
		enemy.x = endPosition.x
		enemy.y = endPosition.y
		enemy.width = gameGrid.gridWidth
		enemy.height = gameGrid.gridWidth

		player = new Player()
		player.x = startPosition.x
		player.y = startPosition.y
		player.width = gameGrid.gridWidth
		player.height = gameGrid.gridWidth

		var startGameLoop = function() {
			// this function will be called repeatedly while game is running
			// here game objects are updated and drawn


			that.updateGameObjects();
			that.drawGameObjects();
			if (!stopped) {
				requestAnimation = window.requestAnimationFrame(startGameLoop, canvas);
			}
		};

		requestAnimation = window.requestAnimationFrame(startGameLoop, canvas);
	}

	that.generateGrid = (gridArray) => {
		gameGrid = new Grid()
		gameGrid.init(gridArray)
	}

	that.updateGameObjects = function() {
		gameGrid.update(gridArray, startPosition, endPosition)
		enemy.update(gameGrid, endPosition)
		player.update(gameGrid, startPosition)
	}

	that.drawGameObjects = function() {
		gameUI.clear(0, 0, WIDTH, HEIGHT)
		gameGrid.draw(startPosition, endPosition)
		enemy.draw()
		player.draw()
	}

	that.bindKeysPressed = function() {

		// keep track of keypressed 
		keyState = [];

		document.addEventListener('keypress', function(evt) {
			keyState = evt.keyCode
			gameGrid.updatePlayerPos(keyState, startPosition)
		});

		document.addEventListener('keyup', function(evt) {
			delete keyState[evt.keyCode];
		});

	}

}
