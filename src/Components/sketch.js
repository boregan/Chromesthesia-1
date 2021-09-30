import "./../style.css";

export default function sketch (p) {
	let canvas;

	p.setup = () => {
		p.remove();
		p.loop();
		canvas = p.createCanvas(p.windowWidth - 500, p.windowHeight - 350);
		p.noStroke();
		p.frameRate(60);
		p.colorMode(p.HSB);
		p.textSize(10);
	};

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth -500, p.windowHeight - 350);
	};

	p.draw = () => {
		var sc = 128 + p.sin(p.frameCount/30) * 128;
		var x = p.width/2 + p.cos(p.frameCount/30) * 120;
		var y = p.height/2 + p.sin(p.frameCount/30) * 120;

		p.rect(0,0, p.width, p.height);
		p.stroke(sc, 100);
		
		p.push();
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
		p.pop();
	};

	p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
		//Make sure the canvas has been created 
		if (canvas) {
			p.fill(newProps.p5Colour);
		}
	};
}