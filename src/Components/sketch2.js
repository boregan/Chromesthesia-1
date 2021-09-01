import "./../style.css";

export default function sketch2 (p) {
	
	let canvas;
	let particles = [];

	let slider;
	let slider2;
	let slider3;

	// changeSketch
	let rrS = 0;
	let bbS = 0;
	let xnoiseMax = 1.5;
	let ynoiseMax = 1.5;
	let xrot = 0.5;
	let yrot = 0.5;
	let transX = 0;
	let transY = 0;
	let walkMin = -2;
	let walkMax = 2;
	let footStepX = 0;
	let footStepY = 0;
	let outside = false;

	p.setup = () => {
		p.remove();
		p.loop();
		canvas = p.createCanvas(p.windowWidth-500, p.windowHeight - 350);
		p.noStroke();
		p.frameRate(60);
		p.colorMode(p.HSB);
		p.textSize(15);

		// Particles
		for(let i = 0; i<p.width/10;i++){
			particles.push(new Particle())
		}

		// Sliders
		// Hue
		slider = p.createSlider(0, 255, 100, 5);
		slider.position(80, 100);
		slider.style('width', '80px');

		// Saturation
		slider2 = p.createSlider(0, 255, 100, 5);
		slider2.position(80, 150);
		slider2.style('width', '80px');

		// Brightness
		slider3 = p.createSlider(0, 255, 100, 5);
		slider3.position(80, 200);
		slider3.style('width', '80px');
	};

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth -500, p.windowHeight - 350);
	};

	p.draw = () => {
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...

		///////////////////////////////////////

		// Constants

		// Particles
		for(let i = 0; i < particles.length; i++) {
			particles[i].createParticle();
			particles[i].moveParticle();
			particles[i].joinParticles(particles.slice(i));
		}

		// Sliders 
		// Hue
		var hue = slider.value();
		let label = p.createElement('p', 'hue');
		label.position(slider.x / 2 - 30, 85);

		// Saturation
		var sat = slider2.value();
		let label2 = p.createElement('p', 'saturation')
		label2.position(slider2.x / 2 - 30, 135)

		// Brightness
		var bri = slider3.value();
		let label3 = p.createElement('p', 'brightness')
		label3.position(slider3.x / 2 - 30, 185)

		p.fill(hue, sat, bri);

		///////////////////////////////////////

		// Drawings

		// DRAWING ONE 
		// resets the sketch
		p.pop();

		rrS = p.map(p.width,0,p.windowWidth,0,255);
		bbS = p.random(0,255);
		footStepX = footStepX + p.random(walkMin,walkMax);
		footStepY = footStepY + p.random(walkMin,walkMax);

		outside = footStepX >= p.width || footStepX <= -p.width || footStepY >= p.height || footStepY <= -p.height; 

		if (outside) {
		footStepX = 0;
		footStepY = 0;
		}
		transX = p.width/2 + footStepX;
		transY = p.height/2 + footStepY;
		p.push();
		p.translate(transX,transY);
		p.stroke(rrS,0,bbS,10+footStepY/footStepX);
		p.strokeWeight(4);
		p.fill(0,0,0,10);
		p.beginShape();
		for (let a = 0; a < p.TWO_PI; a+=0.1) {
		let xoff = p.map(p.cos(a+xrot)+1,-1,1,0,xnoiseMax);
		let yoff = p.map(p.sin(a+yrot)+1,-1,1,0,ynoiseMax);
		let r = p.map(p.noise(xoff,yoff), 0, 1, p.random(10, 50), p.random (100,400));
		let x = r * p.cos(a);
		let y = r * p.sin(a);
		p.vertex(x,y);
		}
		p.endShape(p.CLOSE);
		xrot += 0.01;
		yrot += 0.01;
		//noLoop();
		p.pop()
	};


	// this class describes the properties of a single particle.
	class Particle {
		// setting the co-ordinates, radius and the
		// speed of a particle in both the co-ordinates axes.
		constructor(){
			this.x = p.random(0,p.width);
			this.y = p.random(0,p.height);
			this.r = p.random(1,8);
			this.xSpeed = p.random(-2,2);
			this.ySpeed = p.random(-1,1.5);
		}
		
		// creation of a particle.
		createParticle() {
			p.noStroke();
			p.fill('rgba(200,169,169,0.08)');
			p.circle(this.x,this.y,this.r);
		}
		
		// setting the particle in motion.
		moveParticle() {
			if(this.x < 0 || this.x > p.width)
			this.xSpeed*=-2;
			if(this.y < 0 || this.y > p.height)
			this.ySpeed*=-1;
			this.x+=this.xSpeed;
			this.y+=this.ySpeed;
		}
		
		// this function creates the connections(lines)
		// between particles which are less than a certain distance apart
		joinParticles(particles) {
			particles.forEach(element =>{
			let dis = p.dist(this.x,this.y,element.x,element.y);
			if(dis<85) {
				// p.stroke('rgba(255,255,255,0.04)');
				p.line(this.x,this.y,element.x,element.y);
			}
			});
		}
		}
	
    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {

		//Make sure the canvas has been created  	
		if(canvas) 
			p.fill(newProps.color);		  
			p.pop();
	};
}