var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context,position, size) {	
    context.save();
    context.translate(position.x, position.y);
    context.scale(size, size);
    context.beginPath();
    context.fillStyle = "rgb(200,0,0)";
    context.arc(this.position, 500, 50, 0, 2 * Math.PI);
    context.fill();
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;