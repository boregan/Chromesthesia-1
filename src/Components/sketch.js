import * as Tone from "tone";

export default function sketch (p) {
	let canvas;
	let particles = [];

	p.setup = () => {
		canvas = p.createCanvas(p.windowWidth-500, p.windowHeight - 350);
		p.noStroke();
		p.frameRate(60);

		// Particles
		for(let i = 0; i<p.width/10;i++){
			particles.push(new Particle())
		}
	};

	let phase = 0;

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth -500, p.windowHeight - 350);
	};

	p.draw = () => {
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes

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
		// beep envelope viz
		const beepX = p.noise(p.millis() / 500) * p.width;
		const beepY = p.noise(phase / 50) * p.height;
		const beepSize = p.height * bleepEnvelope.value;
		p.stroke("green");
		p.rect(beepX, beepY, beepSize, beepSize);
	};

	// Bleep
	const bleepEnvelope = new Tone.AmplitudeEnvelope({
		attack: 0.01,
		decay: 0.4,
		sustain: 0,
	}).toDestination();

	const bleep = new Tone.Oscillator("A4").connect(bleepEnvelope);
	bleep.start();

	const bleepLoop = new Tone.Loop(((time) => {
		bleepEnvelope.triggerAttack(time);
	}), "2n").start(0);	

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
				p.stroke('rgba(255,255,255,0.04)');
				p.line(this.x,this.y,element.x,element.y);
			}
			});
		}
		}

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
		if(canvas) //Make sure the canvas has been created
		  p.fill(newProps.color);
	};
}