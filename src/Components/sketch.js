export default function sketch (p) {

	let canvas;

	p.setup = () => {
		canvas = p.createCanvas(p.windowWidth-500, p.windowHeight - 350);
		p.noStroke();
	}

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth-500, p.windowHeight - 350);
	}

	p.draw = () => {
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes

		// DRAWING ONE 
		p.push();

		var sc = 128 + p.sin(p.frameCount/50) * 128;
		var x = p.width/2 + p.cos(p.frameCount/30) * 120;
		var y = p.height/2 + p.sin(p.frameCount/30) * 120;

		p.rect(0,0, p.width, p.height);
		p.stroke(sc, 100);

		for (var i = 0; i < p.width; i += 10) {
			p.line(i, 0, x, y);
		}
		for (i = 0; i < p.width; i += 10) {
			p.line(i, p.height, x, y);		
		}
		for (i = 0; i < p.height; i += 10) {
			p.line(0, i, x, y);		
		}
		for (i = 0; i <= p.height; i += 10) {
			p.line(p.width, i, x, y);		
		}

		///////////////////////////////////////
		
		// DRAWING TWO
		
	};

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
		if(canvas) //Make sure the canvas has been created
		  p.fill(newProps.color);
	};
}