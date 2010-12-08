/**
 * A particle emitter that has a rectangle emitter zone.
 *
 * @param	canvas	The canvas
 * @param	x	The x-coord
 * @param	y	The y-coord
 * @param	width	The width
 * @param	height	The height
 */
function RectangleEmitter(canvas, x, y, width, height){
	/** The canvas. */
	this.canvas = canvas;

	/** The 2d canvas context. */
	this.canvasContext = this.canvas.getContext('2d');

	/** The blase Zone for the particles. */
	this.blastZone = {
		'x':x,
		'y':y,
		'width':width,
		'height':height
	};

	/** The type of particle to create. */
	this.particle;

	/** The list of particles in the emitter. */
	this.particles = [];

	/** The max number of particles. */
	this.maxParticles = 500;

	/** The intervalID for the FPS interval */
	this.fpsId;

	/** The interval ID for the seconds tick. */
	this.tickId;
};

RectangleEmitter.prototype = {
	/**
	 * Starts the emitter.
	 *
	 * @param	fps	The frame rate or 30 by default
	 */
	start:function(fps){
		var rate = fps || 30;
		this.fpsId = setInterval(this.frameUpdate, 1000/rate, this); // Framerate update
		this.tickId = setInterval(this.tick, 1000, this); // Every second tick...
	},

	/**
	 * Pauses the emitter but doesn't clear the screen.
	 */
	pause:function(){
		clearInterval(this.intervalId);
	},

	/**
	 * Stops the emitter and clears the screen.
	 */
	stop:function(){
		clearInterval(this.intervalId);
		this.clear();
	},

	/**
	 * Clears off the particles.
	 */
	clear:function(){
		var c = this.canvas;
		this.canvasContext.clearRect(0, 0, c.width, c.height);
	},

	/**
	 * Adds a particle to the screen.
	 *
	 * @param	particle	The particle to add
	 */
	addParticle:function(particle){
		if (this.particles.length < this.maxParticles){
			var p = new particle();
			p.randomize(this.blastZone);
			p.canvasHeight = this.canvas.height;		

			// Add the particle
			this.particles.push(p);
		}
	},

	/**
	 * Draws the whole canvas.
	 */
	draw:function(){
		this.clear();

		var i = this.particles.length;
		while (i--){
			this.particles[i].draw(this.canvasContext);
		}
	},

	/**
	 * Updates the particles on the screen.
	 */
	update:function(){
		var p; 
		var i = this.particles.length;
		
		while(i--){
			p = this.particles[i];
			p.update();

			// Remove the particle if it is "dead"
			if (p.isDead){
				this.particles.splice(i, 1);
			}
		}
	},

	/**
	 * Applies actions to all of the particles.
	 */
	applyActions:function(){
		var i = this.particles.length;
		
		while(i--){
			this.particles[i].action();
		}
	},

	/**
	 * The FPS update
	 *
	 * @param	self	The reference to the emitter that is lost during setInterval.
	 */
	frameUpdate:function(self){
		self.addParticle(self.particle);
		self.update();
		self.draw();
	},

	/**
	 * The seconds "tick" interval
	 *
	 * @param	self	The reference to the emitter that is lost during setInterval.
	 */
	 tick:function(self){
	 	self.applyActions();
	 }

};