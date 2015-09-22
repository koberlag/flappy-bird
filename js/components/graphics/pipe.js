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