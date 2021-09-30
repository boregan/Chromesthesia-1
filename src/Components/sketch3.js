import "./../style.css";

export default function sketch3 (p) {
	let canvas;

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
		canvas = p.createCanvas(p.windowWidth - 500, p.windowHeight - 350);
		p.frameRate(40);
		p.colorMode(p.HSB);
	};

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth -500, p.windowHeight - 350);
	};

	p.draw = () => {
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...

		///////////////////////////////////////
        rrS = p.map(p.width, 0, p.windowWidth, 0, 255);
        bbS = p.random(0,100);
        footStepX = footStepX + p.random(walkMin,walkMax);
        footStepY = footStepY + p.random(walkMin,walkMax);
        
        outside = footStepX >= p.width || footStepX <= -p.width || footStepY >= p.height || footStepY <= -p.height; 
        
        if (outside) {
            footStepX = 0;
            footStepY = 0;
        }
        transX = p.width/2 + footStepX;
        transY = p.height/2 + footStepY;
        
        p.translate(transX,transY);
        p.stroke(rrS, 0, bbS, 50 + footStepY / footStepX);
        p.strokeWeight(0.5);
        p.background(255, 0.1);
        
        p.beginShape();
            for (let a = 0; a < p.TWO_PI; a+=0.2) {
            let xoff = p.map(p.cos(a+xrot)+ 1, -1, 1, 0, xnoiseMax);
            let yoff = p.map(p.sin(a+yrot)+ 1, -1, 1, 0, ynoiseMax);
            let r = p.map(p.noise(xoff,yoff), 0, 1, p.random(10, 50), p.random (100,400));
            let x = r * p.cos(a);
            let y = r * p.sin(a);
            p.vertex(x,y);
            }
        p.endShape(p.CLOSE);
        xrot += 0.01;
        yrot += 0.01;
    
	};

	p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
		//Make sure the canvas has been created 
		if (canvas) {
			p.fill(newProps.p5Colour);
		}
	};
}