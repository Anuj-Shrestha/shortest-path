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
    
    this.draw = (shortestPathArray, endPosition) => {
        gameUI.drawBoard(that.gridWidth * that.gridLengthX, that.gridWidth * that.gridLengthY, that.gridWidth, 0)
        for (let i=0; i < that.gridArray.length; i++) {
            let gridObj = that.gridArray[i]
            gridObj.type != 'P' && gameUI.writeText(gridObj.type, 20, gridObj.x + gridObj.gridWidth/2, gridObj.y + gridObj.gridWidth / 2)
        }
        ctx.save()
        let endPosNode = shortestPathArray.find(node => node.x == endPosition.x && node.y == endPosition.y) 
        if (!endPosNode) return

        while (endPosNode.prevX != endPosNode.x || endPosNode.prevY != endPosNode.y) {
            gameUI.drawDottedPath(endPosNode.x * that.gridWidth + that.gridWidth / 2, 
                endPosNode.y * that.gridWidth + that.gridWidth / 2,
                endPosNode.prevX * that.gridWidth + that.gridWidth / 2,
                endPosNode.prevY * that.gridWidth + that.gridWidth / 2)
            newEndPosNode = shortestPathArray.find(node => node.x == endPosNode.prevX && node.y == endPosNode.prevY)
            endPosNode = newEndPosNode
        }
        ctx.restore()
    }

    this.update = (keyState, endPosition) => {
		if (keyState == LETTER_A) {
			endPosition.x -= 1
		}

		if (keyState == LETTER_D) {
			endPosition.x += 1
		}

		if (keyState == LETTER_W) {
			endPosition.y -= 1
		}

		if (keyState == LETTER_S) {
			endPosition.y += 1
        }

        endPosition.x = endPosition.x >= that.gridLengthX ? that.gridLengthX - 1 : endPosition.x 
        endPosition.x = endPosition.x <= 0 ? 0 : endPosition.x 
        endPosition.y = endPosition.y >= that.gridLengthY ? that.gridLengthY - 1: endPosition.y 
        endPosition.y = endPosition.y <= 0 ? 0 : endPosition.y 

    }
}