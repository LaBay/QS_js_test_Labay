"use strict";
var score = 0;
var target = {};
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); 
//canvas.addEventListener("click", Catch);

function animate() {  
	clear();
	ctx.fillRect(target.pointOfappearance, target.currentPos, target.size, target.size);
	ctx.fillStyle = target.color;
	target.currentPos += target.speed; 

	if(target.currentPos >= canvas.clientHeight) {
		target.currentPos = 0;
		setTarget();
	}
	if(target.catched != true) req()
		else{
			setTarget();
			clear();
			setTimeout(function(){req();}, Math.ceil(Math.random() * 3000));
		};
};

function clear(){
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);  
}

function req() {
	if(target.gameStopped != true)	requestAnimationFrame(animate);
		else{
			clear();
		}
}

function setTarget() {
	target.size = (function randomTargetSize(){
		return Math.round(Math.random() * 40) + 30; 
	})();
	
	target.color = (function randomColor(){
		var rand = function(){return Math.round(Math.random() * 255)} ;
		return "rgb(" + rand() + "," + rand() + "," + rand() + ")";
	})();

	target.speed =(function randomSpeed(){
		return /*Math.ceil*/(Math.random() * 3) + 0.5;
	})();

	target.pointOfappearance = (function randomPointOfappearance(){
	return Math.round(Math.random() * (640 - target.size)); 
	})();

	target.catched = false;

	target.currentPos = 0;

	target.gameStopped = false;

}

function Catch(event){
	var x = event.offsetX;
	var y = event.offsetY;
	
	if((x > target.pointOfappearance) &&
		(x < (target.pointOfappearance + target.size)) &&
		(y > target.currentPos) &&
		(y < (target.currentPos + target.size))){
			score++;
			setScore();
			target.catched = true;
	}
};

function setScore(){
	document.getElementById('score').innerHTML = score;
}

function start(){
	setTarget();
	score = 0;
	setScore();
	animate();
	document.getElementById("startBtn").setAttribute("disabled", "");
}

function stop(){
	target.gameStopped = true;
	document.getElementById("startBtn").removeAttribute("disabled");
}
