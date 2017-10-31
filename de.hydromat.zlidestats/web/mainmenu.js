var startButton;
var playedAlready = true;


function setupMainMenu() {
	startButton = new Button();
	startButton.init("Los geht's!", width/2, height/2, 25);
	startButton.setBackGround("255,255,255");
	startButton.setForeGround("255,255,255");
	startButton.setBackGroundOpacity(0.1);
	startButton.setFixedSize(200);
	startButton.setTextAlign("center");
}


function drawMainMenu(opacity) {
	ctx.lineWidth = 1;
	ctx.fillStyle = "rgba(16, 17, 18, " + opacity*0.75 + ")";
	ctx.strokeStyle = "rgba(0, 0, 0, "+ 0.75 +")";

	var offSetX = (width-660) / 5;
	
	ctx.fillRect(width/2-200+offSetX, height/2-250, 500, 150);
	ctx.strokeRect(width/2-200+offSetX, height/2-250, 500, 150);
	
	ctx.fillRect(width/2-200+offSetX, height/2-90, 500, 150);
	ctx.strokeRect(width/2-200+offSetX, height/2-90, 500, 150);
	
	ctx.textAlign = "left";
	ctx.fillStyle = "rgba(255, 255, 255, "+ opacity*0.75 +")";
	ctx.font = '50pt Arial';
	ctx.fillText("Willkommen", width/2-200+20+offSetX, height/2-200+20);
	ctx.font = '12pt Arial';
	ctx.fillStyle = "rgba(255, 255, 255, "+ opacity*0.5 +")";
	ctx.fillText("Hier findest Du sämtliche Informationen zu allen Zli De Royale", width/2-200+20+offSetX, height/2-200+60);
	ctx.fillText("Clans und ihren Spielern.", width/2-200+20+offSetX, height/2-200+80);

	ctx.strokeStyle = "rgba(255,255,255," + opacity*0.75 + ")";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width/2-200+20+15+offSetX-10, height/2-200+158);
    ctx.lineTo(width/2-200+20+15+offSetX-10, height/2-200+190);
    ctx.moveTo(width/2-200+20+15+offSetX-10, height/2-200+208);
    ctx.lineTo(width/2-200+20+15+offSetX-10, height/2-200+240);
    ctx.stroke();
	
	ctx.fillStyle = "rgba(255, 255, 255, "+ opacity*0.75 +")";
	ctx.fillText("Tipps:", width/2-200+20+offSetX, height/2-200+140);
	ctx.fillStyle = "rgba(255, 255, 255, "+ opacity*0.5 +")";
	ctx.fillText("Klicke mit der rechten Maustaste in den Statistik-Graphen um", width/2-200+20+15+offSetX, height/2-200+170);
	ctx.fillText("alle Plots zu löschen.", width/2-200+20+15+offSetX, height/2-200+190);
	ctx.fillText("Du kannst den Graphen mit deiner Maus verschieben und mit", width/2-200+20+15+offSetX, height/2-200+220);
	ctx.fillText("dem Mausrad darin zoomen.", width/2-200+20+15+offSetX, height/2-200+240);

	ctx.fillStyle = "rgba("+clanColors[1]+", " + opacity*0.75 + ")";
	ctx.fillRect(width/2-200+offSetX+8 + 128, height/2-200+338, 224, 49);
	startButton.drawAtPosition(width/2-200+offSetX+8 + 140, height/2-200+350, opacity);
	
	ctx.textAlign = "center";
	ctx.font = '200pt Arial';
	ctx.fillStyle = "rgba(255, 255, 255, "+ opacity*0.1 +")";
	
	if(startButton.mouseOver() && !playedAlready) {
    	playIconIdleAnimation();
    	playedAlready = true;
	} else if(!startButton.mouseOver()) {
		playedAlready = false;
	}
}


function handleMouseClickMainMenu() {
   if(startButton.mouseOver()) {
	   pageChanger.start("stats", 500);
	   page = "stats";
	   playIconSwapAnimation();
    }
}


