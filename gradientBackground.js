/**
 * A gradient background canvas element
 *
 * @param	canvas	The canvas
 * @param	start	The starting color
 * @param	end		The ending color
 */
function GradientBackground(canvas, start, end){
	// The canvas
	this.canvas = canvas;

	// The canvas context
	this.canvasContext = this.canvas.getContext('2d');

	// Draw the background
	this.draw(start, end);
}

// Add in the methods
GradientBackground.prototype = {
	/**
	 * Draws the background.
	 *
	 * @param	start	The starting color
	 * @param	end		The ending color
	 */
	draw: function(start, end){
		var vas = this.canvas;
		var text = this.canvasContext;
		var grad = text.createLinearGradient(0, 0, 0, vas.height);
		grad.addColorStop(0, start);
		grad.addColorStop(1, end);
		text.fillStyle = grad;
		text.fillRect(0,0,vas.width, vas.height);
	}
};