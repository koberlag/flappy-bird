var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");

var Pipe = function(size, position) {
    this.size = size;
    var physics = new physicsComponent.PhysicsComponent(this);
    //initial position
    physics.position = position;
    physics.velocity.x = -0.3;

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    var collision = new collisionComponent.RectCollisionComponent(this, size);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
    	physics: physics,
        graphics: graphics,
        collision: collision
    };
};



Pipe.prototype.onCollision = function(entity) {
    console.log("Pipe collided with entity:", entity);
};


exports.Pipe = Pipe;

