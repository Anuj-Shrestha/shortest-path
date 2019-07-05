// canvas elements 

var UI = (function() {

	var instance;

	function UI() {

		var view = View.getInstance();
		var mainWrapper = view.getMainWrapper();
		var canvas = view.create('canvas');
		var ctx = canvas.getContext('2d');
		view.append(mainWrapper, canvas);

		var that = this;

		this.setWidth = function(width) {
			canvas.width = width;
		}

		this.setHeight = function(height) {
			canvas.height = height;
		}

		this.getWidth = function() {
			return canvas.width;
		}
		
		this.getHeight = function() {
			return canvas.height;
		}

		this.getCanvas = function() {
			return canvas;
		}
		
		this.getContext = function() {
			return ctx;
		}

		this.show = function() {
			canvas.style.display = 'block';
		}

		this.hide = function() {
			canvas.style.display = 'none';
		}

		this.clear = function(x, y, width, height) {
			ctx.clearRect(x, y, width, height);
		}

		this.translate = function(x, y) {
			ctx.translate(x, y);
		}

		this.scrollWindow = function(x, y) {
			ctx.translate(x, y);
		}

		this.draw = function(image, sx, sy, sWidth, sHeight, x, y, width, height ) {
			ctx.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height);
		}

		this.makeBox = function(x, y, width, height) {
			ctx.rect(x, y, width, height);
			ctx.fillStyle = 'brown'
			ctx.fill()
		}

		this.writeText = function(text, font, x, y, color) {
			if(color === undefined) {
				color = "#000";
			}
			ctx.font =  font + 'px Creepster';
			ctx.fillStyle = color;
			ctx.fillText(text, x, y);
		}
		
		this.drawDottedPath = function(x, y, mx, my) {
			ctx.beginPath(); 
			ctx.lineWidth = "2";
			ctx.strokeStyle = "black"; // Black path
			ctx.setLineDash([5, 15]);
			ctx.moveTo(x, y);
			ctx.lineTo((x + mx) * 0.5, (y + my) * 0.5);
			ctx.stroke(); // Draw it
		}

		this.drawBoard = function(bw, bh, width, p){
			for (var x = 0; x <= bw; x += width) {
				ctx.moveTo(0.5 + x + p, p);
				ctx.lineTo(0.5 + x + p, bh + p);
			}
		
		
			for (var x = 0; x <= bh; x += width) {
				ctx.moveTo(p, 0.5 + x + p);
				ctx.lineTo(bw + p, 0.5 + x + p);
			}
		
			ctx.strokeStyle = "black";
			ctx.stroke();
		}
		

	}

 	return {
 		getInstance: function(){
 			
 			if (instance == null) {
 				instance = new UI();
 			}

 			return instance;
 		}
 	}

})();
