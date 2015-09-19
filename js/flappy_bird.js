var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var FlappyBird = function() {
    this.entities = [new bird.Bird(), new pipe.Pipe()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.input = new inputSystem.InputSystem(this.entities);

	var self = this;
	setInterval(
	function(){
		self.entities.push(new pipe.Pipe());
	}, 2000);
};

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
};


// FlappyBird.prototype.spawnPipe = function(){
// 	this.entities.push(new pipe.Pipe());
// };

exports.FlappyBird = FlappyBird;