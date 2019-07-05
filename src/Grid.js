function Grid() {
	var gameUI = UI.getInstance();
    var LETTER_A = 97;
	var LETTER_D = 100;
	var LETTER_W = 119;
    var LETTER_S = 115;
    var ctx = gameUI.getContext()
    this.x;
    this.y;

 
    this.gridWidth = 100;
    this.gridPadding = 5;
    this.gridLengthX = 0;
    this.gridLengthY = 0;

    this.gridArray = [];
    this.shortestPathArray = []
    this.gameTime=0;
    this.enemyVel = 5
    var that = this;

    this.init = (gridArray) => {
        for (let i=0; i < gridArray.length; i++) {

            for (let j=0; j < gridArray[i].length; j++) {
                let gridObj = new GridObject()
                gridObj.x = j * (that.gridWidth)
                gridObj.y = i * (that.gridWidth)
                gridObj.type = gridArray[i][j]
                that.gridArray.push(gridObj)
                that.gridLengthX = that.gridLengthX < j + 1 ? j + 1 : that.gridLengthX 
            }
        }
        that.gridLengthY = gridArray.length
    }
    
    this.draw = (startPosition, endPosition) => {
        gameUI.drawBoard(that.gridWidth * that.gridLengthX, that.gridWidth * that.gridLengthY, that.gridWidth, 0)
        for (let i=0; i < that.gridArray.length; i++) {
            let gridObj = that.gridArray[i]
            gridObj.type != 'P' && gameUI.writeText(gridObj.type, 20, gridObj.x + gridObj.gridWidth/2, gridObj.y + gridObj.gridWidth / 2)
        }
        // gameUI.writeText("Player", 20, startPosition.x * that.gridWidth + that.gridWidth/2, startPosition.y  * that.gridWidth + that.gridWidth / 2)
        // gameUI.writeText("Enemy", 20, endPosition.x * that.gridWidth  + that.gridWidth/2, endPosition.y * that.gridWidth  + that.gridWidth / 2)
        ctx.save()
        let endPosNode = that.shortestPathArray.find(node => node.x == endPosition.x && node.y == endPosition.y) 
        if (!endPosNode) return

        while (endPosNode.prevX != endPosNode.x || endPosNode.prevY != endPosNode.y) {
            gameUI.drawDottedPath(endPosNode.x * that.gridWidth + that.gridWidth / 2, 
                endPosNode.y * that.gridWidth + that.gridWidth / 2,
                endPosNode.prevX * that.gridWidth + that.gridWidth / 2,
                endPosNode.prevY * that.gridWidth + that.gridWidth / 2)
            newEndPosNode = that.shortestPathArray.find(node => node.x == endPosNode.prevX && node.y == endPosNode.prevY)
            endPosNode = newEndPosNode
        }
        ctx.restore()
    }

    this.update = (gridArray, startPosition, endPosition) => {
        that.gameTime++
        that.shortestPathArray = Utils.getShortestPathArray(gridArray, startPosition)

        let endPosNode = that.shortestPathArray.find(node => node.x == endPosition.x && node.y == endPosition.y) 
        if (!endPosNode) return
        if (that.gameTime % (100 / that.enemyVel)  == 0){

            endPosition.x = endPosNode.prevX 
            endPosition.y = endPosNode.prevY
        }

		// }
    }

    this.updatePlayerPos = (keyState, startPosition) => {
        if (keyState == LETTER_A) {
			startPosition.x -= 1
		}

		if (keyState == LETTER_D) {
			startPosition.x += 1
		}

		if (keyState == LETTER_W) {
			startPosition.y -= 1
		}

		if (keyState == LETTER_S) {
			startPosition.y += 1
        }

        startPosition.x = startPosition.x >= that.gridLengthX ? that.gridLengthX - 1 : startPosition.x 
        startPosition.x = startPosition.x <= 0 ? 0 : startPosition.x 
        startPosition.y = startPosition.y >= that.gridLengthY ? that.gridLengthY - 1: startPosition.y 
        startPosition.y = startPosition.y <= 0 ? 0 : startPosition.y 
    }

    that.getGridText = (node, startPosition, endPosition) => {
        let gridText = ' '
        if (node.type.toUpperCase() == 'W') {
            gridText = "W"
        }
        if (node.x == endPosition.x && node.y == endPosition.y) {
            gridText = "Enemy"
        }
        if (node.x == startPosition.x && node.y == startPosition.y) {
            gridText = "Player"
        }
        return gridText
    }
}