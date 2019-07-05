//Utility functions are definded here

var Utils = (function() {

    var AABBIntersect = function(ax, ay, aw, ah, bx, by, bw, bh) {
        
        return ax < bx + bw && ay < by + bh && bx < ax + aw && by < ay + ah;
    };

    var calculateDistance = function(objA, objB) {

        var objACenterX = objA.x + objA.width / 2;
        var objACenterY = objA.y + objA.height / 2;
        var objBCenterX = objB.x + objB.width / 2;
        var objBCenterY = objB.y + objB.height / 2;

        return Math.sqrt( (objACenterX - objBCenterX) * (objACenterX-objBCenterX) + (objACenterY - objBCenterY) * (objACenterY - objBCenterY));
    }

    var collisionCheck = function(objA, objB) {
      // get the vectors to check against
      var vX = (objA.x + (objA.width / 2)) - (objB.x + (objB.width / 2));
      var vY = (objA.y + (objA.height / 2)) - (objB.y + (objB.height / 2));

      // add the half widths and half heights of the objects
      var hWidths = (objA.width / 2) + (objB.width / 2);
      var hHeights = (objA.height / 2) + (objB.height / 2);
      var collisionDirection = null;

      // if the x and y vector are less than the half width or half height, then we must be inside the object, causing a collision
      if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var offsetX = hWidths - Math.abs(vX);
        var offsetY = hHeights - Math.abs(vY);

        if (offsetX >= offsetY) {
          if (vY > 0) {
            collisionDirection = 't';
            objA.y += offsetY;
          } else if (vY < 0) {
            collisionDirection = 'b';
            objA.y -= offsetY;
          }
        } else {
          if (vX > 0) {
            collisionDirection = 'l';
            objA.x += offsetX;
          } else {
            collisionDirection = 'r';
            objA.x -= offsetX;
          }
        }
      }

      return collisionDirection;
    }

    var generateRandom = function(min, max) {

        return Math.floor(Math.random()*(max-min+1)+min);
      }
    
    const getCost = (type) => {
        let cost = 999
        switch (type.toUpperCase()) {
            case 'P': {
                cost = 1
                break
            }
            case 'W': {
                cost = 999
                break
            }
            default: {
                cost = 999
            }
        } 
        return cost
    }

    const getSmallestNode = (nodes, totalCosts) => {
        let filteredNodes = []
        nodes.forEach(element => {
            filteredNodes.push(totalCosts.filter(node => node.x == element.x && node.y == element.y)[0])
        });

        return filteredNodes.reduce((minNode, nextNode) => nextNode.cost < minNode.cost ? nextNode : minNode, filteredNodes[0])
    }

    var getShortestPathArray = function(gridArray, startPosition) {
        // var pathGridArray = []
        var totalCosts = []
        var prevNodes = []
        var minPQ = []
        var visitedNodes = []
        for (let i=0; i < gridArray.length; i++) {
            for (let j=0; j < gridArray[i].length; j++) {
                if (i == startPosition.y && j == startPosition.x) {
                    minPQ.push({x: j, y: i, cost: 0})
                    totalCosts.push({x: j, y: i, cost: 0})
                    prevNodes.push({x: j, y: i, prevX: j, prevY: i})
                } else {
                    totalCosts.push({x: j, y: i, cost: 9999})
                }
            }
        }

        //main loop
        while (minPQ.length != 0) {
            //get smallest node in minPQ
            let newSmallestNode = getSmallestNode(minPQ, totalCosts)
            // delete smallest from minPQ
            smallestRemovedMinPQ  = minPQ.filter(node => node.x != newSmallestNode.x || node.y != newSmallestNode.y)
            minPQ = smallestRemovedMinPQ

            //push removed node to visited
            visitedNodes.push(newSmallestNode)

            // check neighbors
            let neighborsOfNewSmallest = []
            let toRight = totalCosts.filter(node => node.x == newSmallestNode.x + 1 && node.y == newSmallestNode.y)[0] 
            let toLeft = totalCosts.filter(node => node.x == newSmallestNode.x - 1 && node.y == newSmallestNode.y)[0] 
            let toTop = totalCosts.filter(node => node.x == newSmallestNode.x && node.y == newSmallestNode.y + 1)[0] 
            let toBot = totalCosts.filter(node => node.x == newSmallestNode.x && node.y == newSmallestNode.y - 1)[0] 
            toRight && neighborsOfNewSmallest.push(toRight)
            toLeft && neighborsOfNewSmallest.push(toLeft)
            toTop && neighborsOfNewSmallest.push(toTop)
            toBot && neighborsOfNewSmallest.push(toBot)

            // for each neighbors
            neighborsOfNewSmallest.forEach(element => {
                // check if visited
                if (!visitedNodes.filter(node => node.x == element.x && node.y == element.y)[0]) {
                    let alternatePathCost = newSmallestNode.cost + getCost(gridArray[element.y][element.x])

                    if (alternatePathCost < element.cost){
                        let nodeWithNewCost = {x: element.x, y: element.y, cost: alternatePathCost}
                        var neighborNodeIndex= totalCosts.findIndex(node => node.x == element.x && node.y == element.y);
                        totalCosts[neighborNodeIndex] = nodeWithNewCost;
                        
                        // Add previous node for node we just checked/removed
                        prevNodes.push( {x: element.x, y: element.y, prevX: newSmallestNode.x, prevY: newSmallestNode.y})

                        // Decrease priority in minPQ
                        var minPQIndex = minPQ.findIndex(node => node.x == element.x && node.y == element.y);
                        if (minPQIndex != -1) minPQ[minPQIndex] = nodeWithNewCost;
                        else minPQ.push(nodeWithNewCost)
                    }
                }
            });
        }

        let result = []
        totalCosts.forEach(node => {
            let prevNode = prevNodes.find(prevNode => prevNode.x == node.x && prevNode.y == node.y)
            prevNode && result.push({...node, ...prevNode})
        })
        return result
    }

    return {

        getAABBIntersect: AABBIntersect,
        getRandom: generateRandom,
        getCollisionDirection: collisionCheck,
        getDistance: calculateDistance,
        getShortestPathArray: getShortestPathArray
    };

} )();