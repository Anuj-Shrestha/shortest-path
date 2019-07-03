function Dijkstra() {
	// variables are defined here
	var gameUI = UI.getInstance();
	var canvas = gameUI.getCanvas();
	var ctx = gameUI.getContext();
	
	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;

	var keyState;
	var mouseState = 0;
	var LETTER_A = 65;
	var LETTER_D = 68;
	var LETTER_W = 87;
	var LETTER_S = 83;

	var mouse = {
	  x: 0,
	  y: 0
	};
	var targetX;
	var targetY;

	var requestAnimation;
	var gameTime = 0;
	var stopped = false;
	var collision = 0;
	var gameScore = 0;
	var oldHighScore = localStorage.getItem('shootEmAllHighScore');

	// mission variables
	var currentPlayerName;
	var currentMissionLvl;
	var survivalTime = 90;
	var survivalTimeLeft = survivalTime;
	var base = null;
	var hostage =  null;
	var hostageTime = 120;
	var resqueZone;

	var enemies = [];
	var maxEnemies = 0;
	var enemyIndex = 0;
	var enemyBoss = undefined;
	var enemyBossCount = 0;
	var enemyLeft = maxEnemies;

	var bullets = [];
	var maxBullets = 100;
	var bulletCount = 100;
	var wallElements = [];
	var gameSound;
	var elements;
	var healthBar;
	var emptyHealthBar;
	var base = null;
	var tree;
	var treesArray = [];
	var treesPosition = [-100, -100, 300, -180, 600, -150, -50, 600, -120, 800, -123, 300, 900, 344, 1222, 903, 1300, 700, 500, 1000, 0, 1100, -700, -300, -123, 1111, -324, 444, -2222, -333, -1111, -400, -412]
	var powerUp = null;
	var powerUpState = false;
	
	var that = this;

	// get mouse co-ordinates on mouse move
	canvas.addEventListener('mousemove', function(evt) {

    var m = getMousePos(canvas, evt);
    mouse.x = m.x;
    mouse.y = m.y;

  }, false);

	this.init = function() {

		gameUI.setWidth(WIDTH);
		gameUI.setHeight(HEIGHT);
		gameUI.show();

		// this.walls = new Walls();

		// if (!this.player) {
		// 	this.player = new Player();
		// 	this.player.height = 72;
		// 	this.player.width = 72;
		// 	this.player.x = WIDTH / 2 - that.player.height - 100;
		// 	this.player.y = HEIGHT / 2 - that.player.width;

		// 	that.getCurrentPlayerName();
		// }

		// if (enemies.length == 0) {

		// 	that.generateEnemies(2);
		// }

		// that.generateTrees();
		that.bindKeysPressed();
		
		var startGameLoop = function() {
			// this function will be called repeatedly while game is running
			// here game objects are updated and drawn
			gameTime++;

			that.updateGameObjects();
			that.drawGameObjects();

			if (!stopped) {
				requestAnimation = window.requestAnimationFrame(startGameLoop, canvas);
			}
		};

		requestAnimation = window.requestAnimationFrame(startGameLoop, canvas);
	}

	that.getCurrentPlayerName = function() {
		// set current player attributes
		if (currentPlayerName == 'anuj') {
			this.player.health = 60;
			this.player.initialVelocity = 5;
			this.player.damage = 2.6;
		} else if (currentPlayerName == 'shyam') {
			this.player.health = 400;
			this.player.initialVelocity = 1;
			this.player.damage = 1.2;
		} else if (currentPlayerName == 'hari') {
			this.player.health = 200;
			this.player.initialVelocity = 3;
			this.player.damage = 1;
		}
	}

	that.generateTrees = function() {

		for (var i = 0; i < 100; i++) {

			tree = new Elements();

			if (i % 2 == 0) {
			tree.tree1(); // sets properties of tree type 1
			} else {
				tree.tree2();
			}

			if (treesPosition[i] != undefined){
				tree.x = treesPosition[i];
				tree.y = treesPosition[i + 1];
			}
			
			treesArray.push(tree);
		}	
	}

	that.updateGameObjects = function() {

		console.log('update')
	}

	that.drawGameObjects = function() {
		
		console.log('draw')
	}

	that.updateEnemies = function() {
		
		for (var i = 0; i < enemyIndex; i++) {

			if (enemies[i] == undefined) 
				continue;

			if (currentMissionLvl == 1) {
				that.updateFirstMissionEnemies(i);
			} else if (currentMissionLvl == 2) {
      	enemies[i].update(that.player, null, hostage, keyState);
      } else {
      	enemies[i].update(that.player, null, null, keyState);
      }

      if (enemyBoss != enemies[i]) {
      	that.walls.wallEnemyCollisionCheck(enemies[i]);
      } else {
      	enemies[i].velX = enemies[i].initialVelocity;
      	enemies[i].velY = enemies[i].initialVelocity;	
      }

      that.updateEnemiesAfterHostageFound(i);      
 		}
	}

	that.drawPlayer = function() {
		
		if (mouse.x != 0 && mouse.y != 0) {
			targetX = mouse.x - that.player.centerX;
		  targetY = mouse.y - that.player.centerY;
		}
	  that.player.playerRotation = Math.atan2(targetY, targetX) - Math.PI / 2;
	  that.player.draw(that.player.playerRotation, keyState);
	}

	that.drawEnemies = function() {

		var targetEnemyForBase;
		var targetEnemyForHostage;

	  for (var i = 0; i < enemyIndex; i++) {
	  	if (enemies[i] == undefined)
	  		continue;

      enemies[i].rotation = Math.atan2((that.player.y - enemies[i].y), 
      	(that.player.x - enemies[i].x)) - Math.PI / 2;
      enemies[i].draw(enemies[i].rotation, base, hostage);
	    
      switch (currentMissionLvl) {
      	case 1:
      		if (targetEnemyForBase == undefined && enemies[i].baseDistance < 300) {
	    			targetEnemyForBase = enemies[i];
	    		}
      		break;

      	case 2:
      		if (targetEnemyForHostage == undefined && enemies[i].hostageDistance < 200) {
		    		targetEnemyForHostage = enemies[i];
		    	}
      		break;
      }
 		}
 		that.getTargetForMission(targetEnemyForBase, targetEnemyForHostage);
	}
	// get Mouse position
	function getMousePos(canvas, evt) {

    var rect = canvas.getBoundingClientRect();
    var mouseX = evt.clientX - rect.left;
    var mouseY = evt.clientY - rect.top;

    return {
        x: mouseX,
        y: mouseY
    };
	}

	that.bindKeysPressed = function() {

		// click event listener for shooting bullets
		document.addEventListener('click', function(evt) {

			if (powerUpState == false) {
				var bullet = new Bullet();
				bullet.init(that.player.x, that.player.y, gameTime, mouse.x, mouse.y, 
					that.player.playerRotation);
				bullets.push(bullet);
				gameSound.play('bullet');
			}
		});

		document.addEventListener('mousedown', function(evt) {

			mouseState = 1;
		});

		document.addEventListener('mouseup', function(evt) {

			mouseState = 0;
		});

		// keep track of keypressed 
		keyState = {};

		document.addEventListener('keydown', function(evt) {

			keyState[evt.keyCode] = true;
		});

		document.addEventListener('keyup', function(evt) {

			delete keyState[evt.keyCode];
		});
	}
	

	// check collision
	that.checkBulletEnemyCollision = function() {

		for (var i = 0; i < enemyIndex; i++) {

			if (enemies[i] == undefined)
				continue;

			var enemyAttacking = enemies[i];

			for (var j = 0; j < bullets.length; j++) {

				var bulletFired = bullets[j];

	      if (bulletFired.x < 0 || bulletFired.x > WIDTH || bulletFired.y < 0 ||
	       bulletFired.y > HEIGHT) {
	      	bullets.splice(j, 1);
	      }

	      var collision = Utils.getAABBIntersect(bulletFired.x, bulletFired.y, 
	      	bulletFired.width, bulletFired.height, 
	      	enemyAttacking.x, enemyAttacking.y, enemyAttacking.width, enemyAttacking.height);

	      if (collision) {
	      	that.deleteBullet(bulletFired, j);
	      	that.killEnemy(enemyAttacking, enemyAttacking.index);
	      	enemyAttacking.velX = -0.5;
	      	enemyAttacking.velY = -0.5;
	      }
    	}
    }	
	}

	var bulletDestroyTimer = 0;

	that.deleteBullet = function(element, index) {

		element.velX -= 1;
		element.velY -= 1;
		element.sY = 120;

		if (bulletDestroyTimer % 5 === 0) {
			// gameSound.play('bulletHit');
			element.frame++;
		}

		if (element.frame >= 3) {
			element.frame = 0;		
		}

		if (bulletDestroyTimer > 20 || element.velX <= 0 || element.velY <= 0) {
			bullets.splice(index, 1);
			bulletDestroyTimer = 0;
		} else {
			bulletDestroyTimer++;
		}
	}

	that.killEnemy = function(element, index) {

		if (element.health < 0){

			if (enemyBossCount > 0 && element == enemyBoss) {
				enemyBoss = undefined;
			}
			element = null;
			delete enemies[index];
			gameSound.play('killEnemy');
			gameScore++;

		} else {
			element.health -= that.player.damage;
		}
	}

	that.checkPlayerEnemyCollision = function() {
		
		// var currentPlayer = that.player;
		for (var i = 0; i < enemyIndex; i++) {

			if (enemies[i] == undefined) 
				continue;

			var enemyAttacking = enemies[i];					
      var collision = Utils.getAABBIntersect(that.player.x, that.player.y, 
      	that.player.width, that.player.height,
       enemyAttacking.x, enemyAttacking.y, enemyAttacking.width, enemyAttacking.height);
      var tempVel = enemyAttacking.velX;
      collisionTime = 0;
      var initialVelocity = enemyAttacking.velX;

      if (collision) {
      	collisionTime++;

      	if (collisionTime < 5 || collisionTime % 20) {
      		gameSound.play('playerPain');
      	}

      	enemyAttacking.velX = 0.5;
      	enemyAttacking.velY = 0.5;
      	enemyAttacking.sY = 288; //attacking sprites
      	that.player.health--;
				
      	if (that.player.health <= 0) {
      		that.gameOverCase();
      	}
      }
    }		
	}

	that.checkPlayerPowerUpCollision = function() {

		var collision = Utils.getAABBIntersect(that.player.x, that.player.y, 
			that.player.width, that.player.height,
			powerUp.x, powerUp.y, powerUp.width, powerUp.height);
					
		if (collision && powerUp.type == 18) { // type 18 is gunpowerup
			maxBullets += 100;
			powerUpState = true;
			powerUp = null;
			bulletCount += maxBullets;
			gameSound.play('powerUpSound');				
		} else if (collision && powerUp.type == 19) { // type 19 is healthpowerup
			that.player.health += 100;
			var healthPercent = (200 - that.player.health) * 100 / 200;
			healthBar.updateHealthUI(healthPercent);
			powerUp = null;
			gameSound.play('powerUpSound');								
		}
	}

	that.calculateEnemiesLeft = function() {
		var temp = 0;
		for (var i = 0; i < enemies.length; i++) {
			if (enemies[i] == undefined) {
				temp++;
			}
		}
		enemyLeft = enemies.length - temp;
	}

	that.generateEnemies = function(firstTime) {

		maxEnemies += 20;

		for (var i = 0; i < maxEnemies; i++) {

			this.enemy = new Enemy();
			this.enemy.initialVelocity = maxEnemies * 0.02 * firstTime;
			this.enemy.width = Utils.getRandom(80, 96);
			this.enemy.height = this.enemy.width; 
	
			if (enemyBoss == undefined){
				enemyBossCount++;
				enemyBoss = this.enemy;
				this.enemy.initialVelocity = maxEnemies * 0.05;
				this.enemy.health = 2000 * enemyBossCount;
				this.enemy.boss = true;
				this.enemy.width = 96 + enemyBossCount * 48;
				this.enemy.height = this.enemy.width;
			}
			
			this.enemy.x = Utils.getRandom(-2000, 4000);
			this.enemy.y = Utils.getRandom(-1000, 2000);

			if (Math.abs(this.enemy.x - this.player.x) < 500 && Math.abs(this.enemy.y - this.player.y) < 500) {
				this.enemy.x += 1000;
				this.enemy.y += 1000;
			}
			
			this.enemy.index = enemyIndex;
			enemies[enemyIndex] = this.enemy;
			enemyIndex++;
		}
	}

	that.missionCompleteCase = function() {

		gameSound.play('powerUpSound');
		window.cancelAnimationFrame(requestAnimation);
		stopped = true;
		gameSound.stopGameSong();
		localStorage.setItem('shootEmAllHighScore', oldHighScore);
		gameUI.writeText('Mission Complete !!!', 120, WIDTH/2 - 420, HEIGHT / 2, 'orange');
		gameUI.writeText('Press Space To Play Next Mission', 60, WIDTH/2 - 420, HEIGHT - 180, 'orange');
		currentMissionLvl = 2;
		that.restartGame();
	}

	that.gameOverCase = function() {

		gameSound.play('playerDie');	

		window.cancelAnimationFrame(requestAnimation);
		stopped = true;
		gameSound.stopGameSong();
		localStorage.setItem('shootEmAllHighScore', oldHighScore);
		gameUI.writeText('Game Over !!!', 120, WIDTH/2 - 280, HEIGHT / 2, 'orange');
  	gameUI.writeText('Press Space To Play Again', 60, WIDTH/2 - 300, HEIGHT - 100, 'orange');
		that.restartGame();	
	}

	that.restartGame = function() {

		document.addEventListener('keypress', function(evt) {

			if (evt.code == "Space" && stopped == true) { 
				stopped = false;
				that.player = null;
				
				bullets = [];
				maxBullets = 100;

				enemies.length = 0;
				enemies = [];
				enemyIndex = 0;
				maxEnemies = 20;
				enemyBoss = undefined;
				enemyBossCount = 0;

				gameTime = 0;
				collision = 0;
				gameScore = 0;

				bulletCount = 100;
				wallElements = [];
				gameSound = null;
				elements = null;
				tree = null;
				treesArray = [];
				powerUp = null;
				powerUpState = false;

				that.init(currentPlayerName, currentMissionLvl);
			}
		});
	}
}
