var init = function(){
	// Resize the canvases)
	var bg = document.getElementById("background");	
	var snow = document.getElementById("snowfall");
	
	bg.width = snow.width = window.innerWidth;
	bg.height = snow.height = window.innerHeight;

	// Draw the background
	new GradientBackground(bg, "#030726", "#0B1A58");

	// Now the emitter
	var emitter = new RectangleEmitter(snow, 0, -10, snow.width, 1);
	emitter.particle = Snow;
	emitter.start(60);
};