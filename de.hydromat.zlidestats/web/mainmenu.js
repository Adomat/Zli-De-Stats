var clanButtonsToBeRemoved;
var hasLeftButtons = true;


function setupMainMenu() {
	clanButtonsToBeRemoved = [];
	
	for(var i=0; i<3; i++) {
		clanButtonsToBeRemoved[i] = new Button();
		clanButtonsToBeRemoved[i].init("Zli De Royale #"+(i+1), width/2, height/2, 16);
		clanButtonsToBeRemoved[i].setBackGround("0,0,0");
		clanButtonsToBeRemoved[i].setForeGround("255,255,255");
		clanButtonsToBeRemoved[i].setBackGroundOpacity(0.2);
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
    
    if(!clanButtonsToBeRemoved[0].mouseOver() && !clanButtonsToBeRemoved[1].mouseOver() && !clanButtonsToBeRemoved[2].mouseOver()) {
    	hasLeftButtons = true;
	}

    for(var i=0; i<3; i++) {
		clanButtonsToBeRemoved[i].drawAtPosition(width/2 + i*200, height/2+150, opacity);
		
    	ctx.textAlign = "center";
    	ctx.font = '200pt Arial';
    	ctx.fillStyle = "rgba(255, 255, 255, "+ opacity*0.1 +")";
    	
    	if(clanButtonsToBeRemoved[i].mouseOver()) {
        	ctx.fillStyle = "rgba(255, 255, 255, "+ opacity*0.5 +")";
        	if(hasLeftButtons) {
            	playIconIdleAnimation();
            	hasLeftButtons = false;
        	}
    	}
    	
    	ctx.fillText((i+1), width/2 + i*200 + clanButtonsToBeRemoved[i].getWidth()/2, height/2+120);
	}
}


function handleMouseClickMainMenu() {
	for(var i=0; i<clanButtonsToBeRemoved.length; i++) {
 	   if(clanButtonsToBeRemoved[i].mouseOver()) {
 		   pageChanger.start("stats", 500);
 		   page = "stats";
 		   playIconSwapAnimation();
 		   currentClan = i;
 	   }
    }
}


