var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position,
    	upperPipeHeight = this.entity.upperPipeHeight;


  	context.save();
    context.translate(position.x, position.y);
    context.beginPath();
	context.fillRect(0, 1 - upperPipeHeight, 0.25, upperPipeHeight);//this.getRandomHeight(0.25,0.75));//this.randomize(0.1, 0.9));
	context.fillRect(0, 0, 0.25, 0.75 - upperPipeHeight);
	//context.fillRect(0, 0.25, 0.25, 0.25);
	//context.fillRect(0, 0, 0.25, 0.5);

    context.closePath();
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;