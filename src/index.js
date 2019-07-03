
const shortestPath = (function() {
	console.log('inside main')
	let newInstance;
	
	function shortestPath() {
		const view = View.getInstance();
		let that = this;
		
		var dijkstra;

		this.init = () => {
			console.log('inside main init')
			dijkstra = new Dijkstra()

			//main starting screen
			mainWrapper = view.getMainWrapper();
			startScreen = view.create('div');
			startGameButton = view.create('div');
			view.setHTML(startGameButton,'Start')
			startScreen.style.width = window.innerWidth + 'px';
			startScreen.style.height = window.innerHeight + 'px';

			view.addClass(startScreen, 'starting-screen');
			view.addClass(startGameButton, 'start-btn');

			view.append(startScreen, startGameButton);
			view.append(mainWrapper, startScreen);

			startGameButton.onclick = function() {
				that.hideMainMenu();
				dijkstra.init(); // initiate
			}
		}

		this.hideMainMenu = function() {
			view.style(startScreen, {display: 'none' });
		}
	
		this.showMainMenu = function() {
			view.style(startScreen, {display: 'block' });
		}
	}

	

	return {
		getMainInstance: () => {
			if (!newInstance) {
				return newInstance = new shortestPath()
			}
			else return newInstance
		}
	}
})();


const mainInstance = shortestPath.getMainInstance()

mainInstance.init()


