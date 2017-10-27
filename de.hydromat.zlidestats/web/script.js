var canvas;
var ctx;
var backgroundImage;

var page = "loading";
var pageChanger;
var contextmenu = 0;
var time;
var maxFPS = 60;

var width;
var height;

var mouse;
var pmouse;

var graph;

// ODER: document einen listener auf 'DOMContentLoaded' hinzufügen
window.addEventListener('load', function(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    mouse = function () {  return {  x: 0,  y: 0  };  };
    mouse.x = 0;
    mouse.y = 0;
    
    pmouse = function () {  return {  x: 0,  y: 0  };  };
    pmouse.x = mouse.x;
    pmouse.y = mouse.y;
    
    canvas.addEventListener('mousemove', function(evt) {
        pmouse = mouse;
        mouse = getMousePos(canvas, evt);
    }, false);
    
    canvas.addEventListener('click', function(evt) {
       handleMouseClick();
    }, false);
    
    canvas.addEventListener('contextmenu', function(evt) {
       // TODO right-click
    }, false);
    
	backgroundImage = document.getElementById('background');
    
    graph = new Graph();
    pageChanger = new Timer();
    
    setupMainMenu();
    setupIcon();
    setupStats();
    
    draw();
    
}, false);





function draw() {
	var trueFPS = Math.round(1000/(new Date().getTime() - time));
    time = new Date().getTime();
    
    if(!checkAllContentLoaded()) {
    	console.log("loading");
    } else if(page === "loading") {
    	console.log("finished loading");
    	pageChanger.start("firstmenu", 1000);
    	page = "menu";
    }
    
    if(width != window.innerWidth  ||  height != window.innerHeight) {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    var blurryness = 0;
    if(page === "loading")
    	drawBackground(5);
    else if(pageChanger.getPurpose() === "firstmenu")
    	drawBackground(pageChanger.getProgressPercent() * 10);
    else
    	drawBackground(10);
    
    if(page === "loading") {
        drawBootAnimation(1);
    } else if(page === "menu") {
    	drawMainMenu(pageChanger.getProgressPercent());
    	drawIcon(pageChanger.getProgressPercent());
    	
    	if(pageChanger.getProgressPercent() < 1 && pageChanger.getPurpose() === "menu")
    		drawStats(1 - pageChanger.getProgressPercent());
    } else if(page === "stats") {
    	if(pageChanger.getProgressPercent() < 1)
    		drawMainMenu(1 - pageChanger.getProgressPercent());
    	
    	drawStats(pageChanger.getProgressPercent());
    	drawIcon(1);
    }

    var timePassed = new Date().getTime() - time;
    var maxTime = 1000/maxFPS;
    var timeDiff = maxTime - timePassed;
    
    setTimeout(draw, Math.max(timeDiff, 0));
    
    ctx.font = '6pt Lucida Console';
    ctx.textAlign = "right";
	ctx.fillStyle = "rgba(255,255,255,0.5)";
	ctx.fillText(trueFPS, width-2, 10);
}


function checkAllContentLoaded() {
	for(var i=0; i<iconImages.length; i++) {
		if(!iconImages[i].complete)
			return false;
	}
	
	return true;
}



function drawBootAnimation(opacity) {
    var textOpacity = 0.5 + (Math.sin(new Date().getTime() / 200)/5);
    ctx.fillStyle = "rgba(255,255,255," + textOpacity*opacity + ")";
    ctx.font = '15pt Lucida Console';
    ctx.textAlign = "center";
    ctx.fillText("loading", width/2, height/2+100);
    
    var x = width/2;
    var y = height/2;
    var w = 50;
    var h = w;
    
    var circleRadius = Math.sqrt(((w+0)/2)*((w+0)/2) + ((h+0)/2)*((h+0)/2))+5;
    
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255,255,255,"+opacity*1+")";
    
    ctx.beginPath();
    for (var i=0; i<2*Math.PI; i+= Math.PI/16) {
        var winkel = i - new Date().getTime() / 1000;
        
        var r1 = circleRadius+10;
        var yd1 = r1 * Math.sin(winkel);
        var xd1 = r1 * Math.cos(winkel);
        
        var r2 = circleRadius+20;
        var yd2 = r2 * Math.sin(winkel);
        var xd2 = r2 * Math.cos(winkel);
        
        ctx.moveTo(x+xd1, y+yd1);
        ctx.lineTo(x+xd2, y+yd2);
    }
    ctx.stroke();
    
    circleRadius -= 11;
    
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(255,255,255,"+opacity*0.5+")";
    
    ctx.beginPath();
    for (var i=0; i<2*Math.PI; i+= Math.PI/4) {
        var winkel = i + new Date().getTime() / 2000;
        
        var r1 = circleRadius+10;
        var yd1 = r1 * Math.sin(winkel);
        var xd1 = r1 * Math.cos(winkel);
        
        var r2 = circleRadius+20;
        var yd2 = r2 * Math.sin(winkel);
        var xd2 = r2 * Math.cos(winkel);
        
        ctx.moveTo(x+xd1, y+yd1);
        ctx.lineTo(x+xd2, y+yd2);
    }
    ctx.stroke();
    
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x,y,w,0,2*Math.PI);
    ctx.stroke();
}




function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function handleMouseClick() {
	if(page === "menu") {
		handleMouseClickMainMenu();
	}
	if(page === "stats") {
		handleMouseClickStats();
	}
}


function drawBackground(blur) {
	var imageRatio = backgroundImage.width / backgroundImage.height;
	var screenRatio = width / height;
	
	var offSet = function () {  return {  x: 0,  y: 0  };  }
	offSet.x = 0;
	offSet.y = 0;
	
	var imageWidth = width;
	var imageHeight = height;
	
	if(screenRatio > imageRatio) {
	    imageHeight = width / imageRatio;
	    offSet.y = (imageHeight - height) / 2;
	}
	else {
	    imageWidth = height * imageRatio;
	    offSet.x = (imageWidth - width) / 2;
	}
	
	ctx.filter = "blur("+ blur +"px)";
	ctx.drawImage(backgroundImage, -offSet.x, -offSet.y, imageWidth, imageHeight);
	ctx.filter = "blur(0px)";
	
	ctx.fillStyle = "rgba(29, 31, 32, "+ (0.5+0.4*(blur/10)) +")";
	ctx.fillRect(0, 0, width, height);
}











