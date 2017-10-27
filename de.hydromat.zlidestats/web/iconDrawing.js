var animationTimer;
var iconImages;


function setupIcon() {
	iconImages = [];
	for(var i=0; i<41; i++) {
		iconImages[i] = new Image();
		iconImages[i].src = "img/icon (" + (i+1) + ").png";
	}
	
	animationTimer = new Timer();
	playIconIdleAnimation();
}


function drawIcon(opacity) {
	ctx.globalAlpha = opacity;
	
	if(page === "menu") {
		if(animationTimer.getProgressPercent() === 1) {
		    ctx.drawImage(iconImages[0], width/2 - iconImages[0].width/2 - 300, height/2 - iconImages[0].height/2);
		} else {
			var pictureNumber = 20 + Math.floor(animationTimer.getProgressPercent() * 20);
		    ctx.drawImage(iconImages[pictureNumber], width/2 - iconImages[0].width/2 - 300, height/2 - iconImages[0].height/2);
		}
	}
	else if(page === "stats") {
		if(animationTimer.getProgressPercent() === 1) {
			if(mouse.x >= 15 && mouse.x <= 15+75 && mouse.y >= 15 && mouse.y <= 15+75)
				ctx.drawImage(iconImages[40], 0, 0);
			else
				ctx.drawImage(iconImages[19], 0, 0);
		} else {
			var pictureNumber = Math.floor(animationTimer.getProgressPercent() * 20);
		    ctx.drawImage(iconImages[pictureNumber],
		    		(width/2 - iconImages[0].width/2 - 300) * (1-animationTimer.getProgressPercent()),
		    		(height/2 - iconImages[0].height/2) * (1-animationTimer.getProgressPercent()));
		}
	}
	
    ctx.globalAlpha = 1;
}





function playIconIdleAnimation() {
	if(page === "menu" && animationTimer.getProgressPercent() == 1)
		animationTimer.start("idle", 666);
}




function playIconSwapAnimation() {
	if(page === "stats" && animationTimer.getProgressPercent() == 1)
		animationTimer.start("swap", 666);
}

function playIconSwapAnimationReverse() {
	if(page === "stats" && animationTimer.getProgressPercent() == 1)
		animationTimer.start("swap-rev", 666);
}