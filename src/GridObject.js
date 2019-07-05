function GridObject() {
	var gameUI = UI.getInstance();

    this.x;
    this.y;
    this.type = 'black';
    this.width;
    this.height;
    this.gridWidth = 50;
    this.gridPadding = 5;
    var that = this;
    
    this.draw = () => {
      gameUI.makeBox(that.x, that.y, that.gridWidth, that.gridWidth)
      gameUI.writeText(that.type, 20, that.x + that.gridWidth/2, that.y + that.gridWidth / 2)
    }

    this.update = () => {

    }
}