var pipe = require('../entities/pipe');
var settings = require('../settings');

var PipeSystem = function(entities) {
    this.entities = entities;
    this.interval = null;
};

PipeSystem.prototype.run = function() {
    // spawn pipes
    this.interval = window.setInterval(this.tick.bind(this), 2000);
};

PipeSystem.prototype.pause = function(){
	window.clearInterval(this.interval);	
	this.interval = null;
}

PipeSystem.prototype.tick = function() {
	var bottomPipeSize = {
			x: settings.pipeWidth,
			y: this.getRandomHeight(25,75)
		},
		bottomPipePosition = {
			x: 1 + bottomPipeSize.x / 2,
			y: bottomPipeSize.y / 2
		},
		topPipeSize = {
			x: settings.pipeWidth,
			y: 1 - settings.pipeGap - (bottomPipeSize.y)
		},
		topPipePosition = {
			x: 1 + topPipeSize.x / 2,
			y: settings.pipeGap + bottomPipeSize.y +  topPipeSize.y / 2
		},
		bottomPipe = new pipe.Pipe(bottomPipeSize, bottomPipePosition, this)
	    topPipe    = new pipe.Pipe(topPipeSize, topPipePosition, this);
	
	this.entities.push(bottomPipe, topPipe);
};

PipeSystem.prototype.getRandomHeight = function getRandomInt(min, max) {
	var randomInt = Math.floor(Math.random() * (max - min)) + min; 
	return randomInt / 100; 
};

exports.PipeSystem = PipeSystem;
