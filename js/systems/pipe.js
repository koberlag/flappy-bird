var pipe = require('../entities/pipe');
var gapSetting = 0.25,
	pipeWidth = 0.25;
var PipeSystem = function(entities) {
    this.entities = entities;
};

PipeSystem.prototype.run = function() {
    // spawn pipes
    window.setInterval(this.tick.bind(this), 2000);
};

PipeSystem.prototype.tick = function() {
	var bottomPipeSize = {
			x: pipeWidth,
			y: this.getRandomHeight(25,75)
		},
		bottomPipePosition = {
			x: 1 + bottomPipeSize.x / 2,
			y: bottomPipeSize.y / 2
		},
		topPipeSize = {
			x: pipeWidth,
			y: 1 - gapSetting - (bottomPipeSize.y)
		},
		topPipePosition = {
			x: 1 + topPipeSize.x / 2,
			y: gapSetting + bottomPipeSize.y +  topPipeSize.y / 2
		},
		bottomPipe = new pipe.Pipe(bottomPipeSize, bottomPipePosition),
	    topPipe    = new pipe.Pipe(topPipeSize, topPipePosition);
	
	this.entities.push(bottomPipe, topPipe);
};

PipeSystem.prototype.getRandomHeight = function getRandomInt(min, max) {
	var randomInt = Math.floor(Math.random() * (max - min)) + min; 
	return randomInt / 100; 
};

exports.PipeSystem = PipeSystem;
