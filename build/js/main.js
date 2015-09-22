(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CircleCollisionComponent = function(entity, radius) {
    this.entity = entity;
    this.radius = radius;
    this.type = 'circle';
};

CircleCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

CircleCollisionComponent.prototype.collideCircle = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var radiusA = this.radius;
    var radiusB = entity.components.collision.radius;

    var diff = {x: positionA.x - positionB.x,
                y: positionA.y - positionB.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    var radiusSum = radiusA + radiusB;

    return distanceSquared < radiusSum * radiusSum;
};

CircleCollisionComponent.prototype.collideRect = function(entity) {
    var clamp = function(value, low, high) {
        if (value < low) {
            return low;
        }
        if (value > high) {
            return high;
        }
        return value;
    };

    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;
    var sizeB = entity.components.collision.size;

    var closest = {
        x: clamp(positionA.x, positionB.x - sizeB.x / 2,
                 positionB.x + sizeB.x / 2),
        y: clamp(positionA.y, positionB.y - sizeB.y / 2,
                 positionB.y + sizeB.y / 2)
    };


    var radiusA = this.radius;

    var diff = {x: positionA.x - closest.x,
                y: positionA.y - closest.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    return distanceSquared < radiusA * radiusA;
};

exports.CircleCollisionComponent = CircleCollisionComponent;
},{}],2:[function(require,module,exports){
var RectCollisionComponent = function(entity, size) {
    this.entity = entity;
    this.size = size;
    this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

RectCollisionComponent.prototype.collideCircle = function(entity) {
    return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var sizeA = this.size;
    var sizeB = entity.components.collision.size;

    var leftA = positionA.x - sizeA.x / 2;
    var rightA = positionA.x + sizeA.x / 2;
    var bottomA = positionA.y - sizeA.y / 2;
    var topA = positionA.y + sizeA.y / 2;

    var leftB = positionB.x - sizeB.x / 2;
    var rightB = positionB.x + sizeB.x / 2;
    var bottomB = positionB.y - sizeB.y / 2;
    var topB = positionB.y + sizeB.y / 2;

    return !(leftA > rightB || leftB > rightA ||
             bottomA > topB || bottomB > topA);
};

exports.RectCollisionComponent = RectCollisionComponent;
},{}],3:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {	
	var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.beginPath();
    context.arc(0, 0, 0.02, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],4:[function(require,module,exports){
var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position,
    	size   = this.entity.size;

  	context.save();
    context.translate(position.x, position.y);
    context.beginPath();
    context.fillRect(-size.x / 2, -size.y / 2, size.x, size.y);
    context.closePath();
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],5:[function(require,module,exports){
var PhysicsComponent = function(entity) {
    this.entity = entity;

    this.position = {
        x: 0,
        y: 0
    };
    this.velocity = {
        x: 0,
        y: 0
    };
    this.acceleration = {
        x: 0,
        y: 0
    };
};

PhysicsComponent.prototype.update = function(delta) {
    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;
},{}],6:[function(require,module,exports){
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
},{"../components/collision/circle":1,"../components/graphics/bird":3,"../components/physics/physics":5,"../settings":10}],7:[function(require,module,exports){
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


},{"../components/collision/rect":2,"../components/graphics/pipe":4,"../components/physics/physics":5,"../settings":10}],8:[function(require,module,exports){
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
},{"./entities/bird":6,"./systems/graphics":12,"./systems/input":13,"./systems/physics":14,"./systems/pipe":15}],9:[function(require,module,exports){
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
    var app = new flappyBird.FlappyBird();
    app.run();
});
},{"./flappy_bird":8}],10:[function(require,module,exports){
exports.pipeWidth = 0.25;
exports.pipeGap = 0.25;
exports.gravity = -2;
exports.flappingSpeed = 0.68;
exports.gameSpeed = -0.3;
exports.birdStartPosition = 0.5;
},{}],11:[function(require,module,exports){
var CollisionSystem = function(entities) {
    this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entityA = this.entities[i];
        if (!'collision' in entityA.components) {
            continue;
        }

        for (var j=i+1; j<this.entities.length; j++) {
            var entityB = this.entities[j];
            if (!'collision' in entityB.components) {
                continue;
            }

            if (!entityA.components.collision.collidesWith(entityB)) {
                continue;
            }

            if (entityA.components.collision.onCollision) {
                entityA.components.collision.onCollision(entityB);
            }

            if (entityB.components.collision.onCollision) {
                entityB.components.collision.onCollision(entityA);
            }
        }
    }
};

exports.CollisionSystem = CollisionSystem;
},{}],12:[function(require,module,exports){
var GraphicsSystem = function(entities) {
    this.entities = entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function() {
    // Run the render loop
    window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.tick = function() {
    // Set the canvas to the correct size if the window is resized
    if (this.canvas.width != this.canvas.offsetWidth ||
        this.canvas.height != this.canvas.offsetHeight) {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height);
    this.context.scale(this.canvas.height, -this.canvas.height);

    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!'graphics' in entity.components) {
            continue;
        }

        entity.components.graphics.draw(this.context);
    }

    this.context.restore();

    window.requestAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem;
},{}],13:[function(require,module,exports){
var settings = require('../settings');

var InputSystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
    this.canvas.addEventListener('click', this.onClick.bind(this));
    this.canvas.addEventListener('touchstart', this.onTouch.bind(this));
};

InputSystem.prototype.onClick = function() {
   this.flap();
};

InputSystem.prototype.onTouch = function(evt) {
	evt.preventDefault();
    this.flap();
};

InputSystem.prototype.flap = function(){
	var bird = this.entities[0];
    bird.components.physics.velocity.y = settings.flappingSpeed;
}

exports.InputSystem = InputSystem;
},{"../settings":10}],14:[function(require,module,exports){
var collisionSystem = require("./collision");
var PhysicsSystem = function(entities) {
    this.entities = entities;
    this.collisionSystem = new collisionSystem.CollisionSystem(entities);
};

PhysicsSystem.prototype.run = function() {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 1000 /60);
};

PhysicsSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!'physics' in entity.components) {
            continue;
        }

        entity.components.physics.update(1/60);
    }
    this.collisionSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;
},{"./collision":11}],15:[function(require,module,exports){
var pipe = require('../entities/pipe');
var settings = require('../settings');

var PipeSystem = function(entities) {
    this.entities = entities;
};

PipeSystem.prototype.run = function() {
    // spawn pipes
    window.setInterval(this.tick.bind(this), 2000);
};

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

	 // for (var i = 0; i < this.entities.length; i++) {
	 //    var entity = this.entities[i];

	 //    if (entity.collision) {
	 //      this.entities = [];
	 //    }
	 //  }
};

PipeSystem.prototype.getRandomHeight = function getRandomInt(min, max) {
	var randomInt = Math.floor(Math.random() * (max - min)) + min; 
	return randomInt / 100; 
};

exports.PipeSystem = PipeSystem;

},{"../entities/pipe":7,"../settings":10}]},{},[9]);
