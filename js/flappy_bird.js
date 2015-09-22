var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipe');

var bird = require('./entities/bird');


var FlappyBird = function() {
    this.entities = [new bird.Bird(this)];
	this.pipes = new pipeSystem.PipeSystem(this.entities, this);
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.input = new inputSystem.InputSystem(this.entities);
};

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
    this.pipes.run();
};

FlappyBird.prototype.reset = function(){
	this.entities = [];
	this.pipes.entities = [];
	this.graphics.entities = [];
	this.physics.entities = [];
	this.input.entities = [];
	
	this.entities = [new bird.Bird(this)];
	this.pipes = new pipeSystem.PipeSystem(this.entities, this);
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.input = new inputSystem.InputSystem(this.entities);
	this.run();
};

exports.FlappyBird = FlappyBird;