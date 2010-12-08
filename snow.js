/**
 * The Snow particle
 */
function Snow(){
	this.isDead = false;
	this.x = 0;
	this.y = 0;
	this.alpha = 0.5;
	this.radius = 3;
	this.velocity = {
		'x': 0,
		'y': 2,
	};
	this.canvasHeight;

	this.action();
}

// Methods
Snow.prototype = {
	/**
	 * Draws the particle onto the canvas in context.
	 *
	 * @param	c	 The canvas context to draw onto
	 */
	draw:function(c){
		c.fillStyle = 'rgba(255,255,255,'+this.alpha+')';
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		c.fill();
	},

	/**
	 * Updates the particle.
	 */
	update:function(){
		this.x += this.velocity.x
		this.y += this.velocity.y;
		
		if (this.y > this.canvasHeight){
			this.isDead = true;
		}
	},

	/**
	 * Randomizes the settings for the particle
	 *
	 * @param	zone	The blastZone
	 */
	randomize:function(zone){
		// Get a random point inside the blastzone and set the x/y
		var s = this.getLocation(zone);
		this.x = s.x;
		this.y = s.y;

		this.alpha = this.randomRange(0.3, 1);
		this.radius = this.randomRange(1, 3);
	},

	/**
	 * Adds a random drift type motion to the particle.
	 * Taken from the Flint particle system....
	 */
	action:function(){
		this.velocity.x += (Math.random() - 0.5) * 0.25;
	},

	/**
	 * Take a low and high number and gets a random number between them.
	 *
	 * @param	low		The low number
	 * @param	high	The high number
	 * @return	Number
	 */
	randomRange:function(low, high){
		return (Math.random() * (high - low)) + low;
	},

	/**
	 * Gets a random starting point for the particle.
	 * Taken from the Flint particle system in AS3
	 *
	 * @param	zone	The zone to get a location from
	 * @return	Object
	 */
	getLocation:function(z){
		var p = {};
		p.x = z.x + Math.random() * z.width;
		p.y = z.y + Math.random() * z.height;
		return p;
	}
};