var clanButtons;
var hasLeftButtons = true;


function setupMainMenu() {
	clanButtons = [];
	
	for(var i=0; i<3; i++) {
		clanButtons[i] = new Button();
		clanButtons[i].init("Zli De Royale #"+(i+1), width/2, height/2, 16);
		clanButtons[i].setBackGround(0,0,0);
		clanButtons[i].setForeGround(255,255,255);
		clanButtons[i].setBackGroundOpacity(0.2);
	}
}


function drawMainMenu(opacity) {
	ctx.fillStyle = "rgba(0,0,0, "+ opacity*0.25 +")";
	ctx.fillRect(width/2-30, height/2-250, 630, 460);

	ctx.textAlign = "left";
	ctx.fillStyle = "rgba(255, 255, 255, "+ opacity*0.75 +")";
	ctx.font = '20pt Arial';
	ctx.fillText("Willkommen im Zli De Royale Stalker!", width/2+15, height/2-200);
	ctx.font = '12pt Arial';
	ctx.fillText("Hier findest Du sämtliche Informationen zu allen Zli De Royale Clans und ihren", width/2+15, height/2-170);
	ctx.fillText("Spielern.", width/2+15, height/2-145);

	ctx.strokeStyle = "rgba(255,255,255," + opacity*0.75 + ")";
	ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width/2, height/2-230);
    ctx.lineTo(width/2, height/2-130);
    ctx.stroke();
    
    if(!clanButtons[0].mouseOver() && !clanButtons[1].mouseOver() && !clanButtons[2].mouseOver()) {
    	hasLeftButtons = true;
	}

    for(var i=0; i<3; i++) {
		clanButtons[i].drawAtPosition(width/2 + i*200, height/2+150, opacity);
		
    	ctx.textAlign = "center";
    	ctx.font = '200pt Arial';
    	ctx.fillStyle = "rgba(255, 255, 255, "+ opacity*0.1 +")";
    	
    	if(clanButtons[i].mouseOver()) {
        	ctx.fillStyle = "rgba(255, 255, 255, "+ opacity*0.5 +")";
        	if(hasLeftButtons) {
            	playIconIdleAnimation();
            	hasLeftButtons = false;
        	}
    	}
    	
    	ctx.fillText((i+1), width/2 + i*200 + clanButtons[i].getWidth()/2, height/2+120);
	}
}


function handleMouseClickMainMenu() {
	for(var i=0; i<clanButtons.length; i++) {
 	   if(clanButtons[i].mouseOver()) {
 		   pageChanger.start("stats", 1000);
 		   page = "stats";
 		   playIconSwapAnimation();
 	   }
    }
}


