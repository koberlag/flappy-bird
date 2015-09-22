var physicsComponent = require("../components/physics/physics");
var graphicsComponent = require("../components/graphics/bird");
var collisionComponent = require("../components/collision/circle");
var settings = require('../settings');

var Bird = function(flappyBird) {
    this.flappyBird = flappyBird;
    var physics = new physicsComponent.PhysicsComponent(this);
    //initial position
    physics.position.y = settings.birdStartPosition;
    physics.acceleration.y = settings.gravity;

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

Bird.prototype.onCollision = function(entity) {
    console.log("Bird collided with entity:", entity);
    // //reset bird's position to center
    this.components.physics.position.y = settings.birdStartPosition;
    //this.flappyBird.reset();
};

exports.Bird = Bird;