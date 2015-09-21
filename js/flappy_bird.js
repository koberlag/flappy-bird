var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipe');

var bird = require('./entities/bird');


var FlappyBird = function() {
    this.entities = [new bird.Bird()];
	this.pipes = new pipeSystem.PipeSystem(this.entities);
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.input = new inputSystem.InputSystem(this.entities);
	//this.spawnPipes(this);
};

// FlappyBird.prototype.spawnPipes = function(flappyBird){
// 	setInterval(function(){
// 		var bottomPipePosition = {
// 			x: 1,
// 			y: 0
// 		},
// 		bottomPipe = new pipe.Pipe(bottomPipePosition),
// 		topPipePosition = {
// 			x: 1,
// 			y: 0.75 - bottomPipe.size.height
// 		};
// 		topPipe = new pipe.Pipe(topPipePosition);

// 		flappyBird.entities.push(bottomPipe, topPipe);
// 	}, 2000);
// };

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
    this.pipes.run();
};

exports.FlappyBird = FlappyBird;