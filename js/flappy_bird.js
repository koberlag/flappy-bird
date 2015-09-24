var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipe');
var uiSystem = require('./systems/ui');


var bird = require('./entities/bird');


var FlappyBird = function() {
	this.paused = true;
    this.entities = [new bird.Bird(this)];
	this.pipes = new pipeSystem.PipeSystem(this.entities, this);
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.input = new inputSystem.InputSystem(this.entities);
	this.ui = new uiSystem.UISystem(this);
};

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
    this.pipes.run();
};

FlappyBird.prototype.pause = function() {
    this.graphics.pause();
    this.physics.pause();
    this.input.pause();
    this.pipes.pause();
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