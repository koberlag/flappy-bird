var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

  	context.save();
    context.translate(position.x, position.y);
    context.beginPath();
	context.fillRect(0.25, 0.25, 0.25, 0.25);
	context.fillRect(0.25, -0.5, 0.25, 0.5);
    context.closePath();
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;