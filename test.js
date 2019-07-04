let data = [{x: 1, y: 1, cost: 10}, {x: 1, y: 2, cost: 5}, {x: 1, y: 3, cost: 2}]
console.log( 'min',     data.reduce((min, p) => p.cost < min.cost ? p : min, data[0]))