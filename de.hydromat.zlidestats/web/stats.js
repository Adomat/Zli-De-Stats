


function setupStats() {
    graph.addData("Anzahl Clanmitglieder", memberCount[2]);
}


function drawStats(opacity) {
	ctx.fillStyle = "rgba(0,0,0, "+ opacity*0.25 +")";
	ctx.fillRect(0, 0, 490, height);
	
    graph.draw(ctx, 500, 0, width-500-10, height, opacity);
}





function handleMouseClickStats() {
	if(mouse.x >= 15 && mouse.x <= 15+75 && mouse.y >= 15 && mouse.y <= 15+75) {
	   pageChanger.start("menu", 1000);
	   page = "menu";
	}
}
