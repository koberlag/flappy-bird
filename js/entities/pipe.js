var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");

var Pipe = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = 1;//0.5;
    physics.position.y = 0;//0.5;
    physics.acceleration.y = 0;
    physics.velocity.x = -0.3;
    this.upperPipeHeight = this.getRandomHeight(25,75);

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    this.components = {
    	physics: physics,
        graphics: graphics
    };
};

Pipe.prototype.getRandomHeight = function getRandomInt(min, max) {
 var randomInt = Math.floor(Math.random() * (max - min)) + min; 
 return randomInt / 100; 
};

exports.Pipe = Pipe;

