var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var settings = require('../settings');

var Pipe = function(size, position) {
    this.size = size;
    var physics = new physicsComponent.PhysicsComponent(this);
    //initial position
    physics.position = position;
    physics.velocity.x = settings.gameSpeed;

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
    // //reset bird's position to center
    // entity.components.physics.position.y = 0.5;
    // //reset pipe system entities
    // this.collision = true;
    // //this.components.graphics.entities = [];
    // // pipeSystem.flappyBird.reset();
    // // pipeSystem.entities = [];

};


exports.Pipe = Pipe;

