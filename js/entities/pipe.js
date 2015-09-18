var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");

var Pipe = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.5;
    physics.acceleration.y = 0;
    physics.velocity.x = -0.3;


    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    this.components = {
    	physics: physics,
        graphics: graphics
    };
};

exports.Pipe = Pipe;

