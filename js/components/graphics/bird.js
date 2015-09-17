var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
    this.position = 0;
};

BirdGraphicsComponent.prototype.draw = function(context) {	
    var canvas = document.getElementById('main-canvas')
    this.position++;
    if(this.position > canvas.width)
    {
        this.position = 0;
    }

    context.beginPath();
    context.fillStyle = "rgb(200,0,0)";
    context.arc(this.position, 500, 50, 0, 2 * Math.PI);
    context.fill();
    context.fillStyle = "rgb(200,0,0)";
    context.arc(500 + this.position, 500, 50, 0, 2 * Math.PI);
    context.fill();
    context.fillStyle = "rgb(100,0,0)";
    context.fillRect(10, 10 + this.position, 55, 50);
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;