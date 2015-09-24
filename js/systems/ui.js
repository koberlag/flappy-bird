var UISystem = function(app, entities) {
	this.app = app;
	this.pauseListener = this.pause.bind(this);
	this.runListener = this.run.bind(this);
    this.overlay = document.getElementById('overlay');
    this.score = document.getElementById('score');

	document.addEventListener("click", this.runListener, false);
    document.addEventListener('touchstart', this.runListener);
};


UISystem.prototype.run = function(){
	if(this.app.paused){
		this.app.run();
	}
	else{
		this.app.pause();
	}
	this.app.paused = !this.app.paused;
	this.overlay.style.display = 'none';
	this.score.style.display = 'block';

	document.removeEventListener('click', this.runListener);
    document.removeEventListener('touchstart', this.runListener);
    document.addEventListener("keydown", this.pauseListener, false);
}

UISystem.prototype.pause = function(){
	if(this.app.paused){
		this.app.run();
	}
	else{
		this.app.pause();
	}
	this.app.paused = !this.app.paused;
	this.overlay.style.display = 'block';
	this.score.style.display = 'none';
	document.removeEventListener('keydown', this.pauseListener);
	document.addEventListener("click", this.runListener, false);
    document.addEventListener('touchstart', this.runListener);
}

exports.UISystem = UISystem;
