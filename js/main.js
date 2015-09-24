var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
    var app = new flappyBird.FlappyBird();
    if(app.paused){
    	app.pause();
    }
    else{
    	app.run();
    }
});