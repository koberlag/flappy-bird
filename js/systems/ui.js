var pipe = require('../entities/pipe');
var PipeSystem = function(entities) {
    this.entities = entities;
};

PipeSystem.prototype.run = function() {
    // spawn pipes
    window.setInterval(this.tick.bind(this), 2000);
};
