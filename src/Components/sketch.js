import "./../style.css";

export default function sketch (p) {
	let canvas;
	let particles = [];
	let phase = 0;

	let slider;
	let slider2;
	let slider3;

	p.setup = () => {
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
		slider = p.createSlider(0, 255, 100);
		slider.position(80, 250);
		slider.style('width', '80px');

		// Saturation
		slider2 = p.createSlider(0, 255, 100);
		slider2.position(80, 300);
		slider2.style('width', '80px');

		// Brightness
		slider3 = p.createSlider(0, 255, 100);
		slider3.position(80, 350);
		slider3.style('width', '80px');

		// Text

	};

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth -500, p.windowHeight - 350);
	};

	p.draw = () => {
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes

		// Sliders
		// Hue
		var hue = slider.value();
		let label = p.createElement('p', 'hue');
		label.position(slider.x / 2 - 30, 235);

		// Saturation
		var sat = slider2.value();
		let label2 = p.createElement('p', 'saturation')
		label2.position(slider2.x / 2 - 30, 285)

		// Brightness
		var bri = slider3.value();
		let label3 = p.createElement('p', 'brightness')
		label3.position(slider3.x / 2 - 30, 335)

		p.fill(hue, sat, bri);

		///////////////////////////////////////

		// DRAWING ONE 
		var sc = 128 + p.sin(p.frameCount/50) * 128;
		var x = p.width/2 + p.cos(p.frameCount/40) * 120;
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

		///////////////////////////////////////
		
		// DRAWING TWO
		for(let i = 0; i < particles.length; i++) {
			particles[i].createParticle();
			particles[i].moveParticle();
			particles[i].joinParticles(particles.slice(i));
		}

		///////////////////////////////////////
		
		// DRAWING THREE

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
	};
}