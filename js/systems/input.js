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
    bird.components.physics.velocity.y = 0.68;
}

exports.InputSystem = InputSystem;