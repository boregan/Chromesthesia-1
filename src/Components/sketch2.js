import "./../style.css";

export default function sketch2 (p) {
	let canvas;

	let numDashers = 400;
	let dashers = [];
	let pts = [];

	let n;
	let rate;
	let invrt;
	let bins;
	let offstsIndex;
	let offsetPercentage;
	let distC;


	let a;
	let x;
	let y; 
	let z;
	let d;
	let sw;

	function drawPts(){
		for (n = 0; n < numDashers; n++) {
		  p.stroke(255);
		  p.strokeWeight(2);
		  p.point(pts[n][0], pts[n][1]);
		}
	}

	p.setup = () => {
		p.remove();
		p.loop();
		canvas = p.createCanvas(p.windowWidth-500, p.windowHeight - 350);
		p.frameRate(60);
		p.colorMode(p.HSB);

		p.stroke(0);

		for (n = 0; n < numDashers; n++) {
			let ang = p.map(n, 0, numDashers, 0, p.TAU);
			let angX = 1200/2 + 50 * p.cos(ang);
			let angY = 400/4 * 3  + 50 * p.sin(ang);
		
			let offsts = p.map(n, 0, numDashers, -100, 100);
			let randomness = p.random(-18, 18);
			if(n < numDashers / 4){
			  offsts= -120 + randomness;
			  rate = 0.01;
			  invrt = 1;
			} else if(n < numDashers / 2){
			  offsts = -45 + randomness;
			  rate = 0.015;
			  invrt = 0;
			}else if(n < numDashers / 4 * 3){
			  offsts = 45 + randomness;
			  rate = 0.02;
			  invrt = 1;
			}else{
			  offsts = 120 + randomness;
			  rate = 0.025;
			  invrt = 0;
			}
			
			bins = [-170, -110, -45, 34, 110];
			offstsIndex = p.floor(p.map(n, 0, numDashers, 0, 5));
			pts.push([angX, angY]);
			dashers.push(new makeDasher(1350 / 2, 600 / 2, rate, 200, bins[offstsIndex] + randomness,
										p.PI-1 + 0.57 * p.cos(ang),
										p.TAU + 1-0.57 * p.cos(ang), invrt));
			}
	};
	function makeDasher(cx,cy,rate,rad,offst,bg,eg, invert) {
		this.invert = invert;
		
		this.cx = cx;
		this.cy = cy;
		
		this.cp = p.random(p.TAU);
		this.rate = rate;
		
		this.rad = rad;
		this.offset = offst;
		
		this.segLength = p.random(0.01, 0.2);
		
		this.beginAngle = bg;
		this.endAngle = eg;
		
		
		if(this.invert){
		  this.beginAngle = eg;
		  this.endAngle = bg;
		}
		this.midWayPoint = (this.beginAngle + this.endAngle)/2;
		
		this.minD = p.dist(this.rad * p.cos(this.beginAngle), this.rad * p.sin(this.beginAngle), 0, 0 + this.rad);
		this.maxD = p.dist(this.rad * p.cos(this.midWayPoint), this.rad * p.sin(this.midWayPoint), 0, 0 + this.rad);
	  
		
		this.move = function () {
			p.push();
			p.translate(this.cx, this.cy);
		  
		  this.cp += this.rate;
		  if (this.cp > p.TAU) {
			this.cp = 0;
		  }
	  
		  a = p.map(this.cp, 0, p.TAU, this.beginAngle, this.endAngle);
		  x = this.rad * p.cos(a);
		  y = this.rad * p.sin(a);
	  
		  d = p.dist(x, y, 0, 0 + this.rad);
	  
		  
		  sw = p.map(d, this.minD, this.maxD, 0, 8);
		  p.strokeWeight(sw);
	  
		  offsetPercentage = p.map(d, this.minD, this.maxD, 0, 1);
	  
		  x = (this.rad * 2 + this.offset) * p.cos(a);
		  y = (this.rad * 2 + this.offset) * p.sin(a);
	  
		  distC = p.dist(x, y, 0, 0) / 50 + a - this.cp * 3 + p.frameCount / 25;
	  
		  p.noFill();
	  
		  p.arc(
			0,
			0,
			this.rad * 2 + this.offset + 10 * p.sin(x / 20 + p.frameCount/25),
			this.rad * 2 + this.offset + 10 * p.sin(x / 20 + p.frameCount/25),
			a - this.segLength * offsetPercentage,
			a
		  );
		  p.pop();
		};
	  }

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth -500, p.windowHeight - 350);
	};

	p.draw = () => {
		p.blendMode(p.BLEND);
		p.background(255, 20);


		for (n=0; n < numDashers; n++) {
			dashers[n].move();
		}

	};

	
	p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
		//Make sure the canvas has been created 
		if (canvas) {
			p.stroke(newProps.p5Colour);

		}
	};
}