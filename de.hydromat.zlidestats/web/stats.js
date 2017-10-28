var clanTags;
var clanColors;

var clanButtons;
var clanMemberCountButtons;
var clanTrophyButtons;


var currentClan = 0;
var scrollPercent = 0;
var scrollPixel = 0;






function setupStats() {
	clanTags = [];
	clanTags[0] = "8LVVU0U";
	clanTags[1] = "2GPRJJG";
	clanTags[2] = "2R92CURQ";
	
	clanColors = [];
	clanColors[0] = "46,135,40";
	clanColors[1] = "40,90,135";
	clanColors[2] = "135,40,40";
	
	
	clanButtons = [];
	clanMemberCountButtons = [];
	clanTrophyButtons = [];
	for(var i=0; i<3; i++) {
		clanButtons[i] = new Button();
		clanButtons[i].init(i+1, 0, 0, 30);
		clanButtons[i].setForeGround("255, 255, 255");
		clanButtons[i].setBackGround(clanColors[i]);
		clanButtons[i].setBackGroundOpacity(0.05);
		clanButtons[i].setFixedSize(35);
		clanButtons[i].setTextAlign("center");
		
		clanMemberCountButtons[i] = new Button();
		clanMemberCountButtons[i].init("Anzahl der Mitglieder", 0, 0, 12);
		clanMemberCountButtons[i].setForeGround("255, 255, 255");
		clanMemberCountButtons[i].setBackGround(clanColors[i]);
		clanMemberCountButtons[i].setBackGroundOpacity(0.1);
		clanMemberCountButtons[i].setFixedSize(200);
		clanMemberCountButtons[i].setTextAlign("left");
		clanMemberCountButtons[i].addCheckBox();
		
		clanTrophyButtons[i] = new Button();
		clanTrophyButtons[i].init("ClanTrophäen", 0, 0, 12);
		clanTrophyButtons[i].setForeGround("255, 255, 255");
		clanTrophyButtons[i].setBackGround(clanColors[i]);
		clanTrophyButtons[i].setBackGroundOpacity(0.1);
		clanTrophyButtons[i].setFixedSize(200);
		clanTrophyButtons[i].setTextAlign("left");
		clanTrophyButtons[i].addCheckBox();
	}
}

function drawStats(opacity) {
	scrollPixel = scrollPercent * (height - /*HÖHE DES PANE*/100);

	drawScrollPane(opacity);
	drawClanPane(opacity);
	
	// Finally draw the Graph
	graph.draw(ctx, 500, 0, width-500-10, height, opacity);
}



function drawScrollPane(opacity) {
	ctx.fillStyle = "rgba(0,0,0, "+ opacity*0.25 +")";
	ctx.fillRect(0, 0, 490, height);
	
	ctx.strokeStyle = "rgba(255,255,255, " + opacity*0.25 + ")";
    ctx.lineWidth = 1;
	ctx.beginPath();
    ctx.moveTo(490, 0);
    ctx.lineTo(490, height);
    ctx.stroke();

	ctx.fillStyle = "rgba(255,255,255, "+ opacity*0.75 +")";
    ctx.font = '16pt Arial';
    ctx.textAlign = "left";
	ctx.fillText("Zli De Royale #"+(currentClan+1), 120, 40-scrollPixel);

	clanMemberCountButtons[currentClan].drawAtPosition(160, 100-scrollPixel, opacity);
	clanTrophyButtons[currentClan].drawAtPosition(160, 135-scrollPixel, opacity);
}



function drawClanPane(opacity) {
	ctx.fillStyle = "rgba(0,0,0, "+ opacity*0.25 +")";
	ctx.fillRect(0, 0, 105, height);
	
	ctx.strokeStyle = "rgba(255,255,255, " + opacity*0.25 + ")";
    ctx.lineWidth = 1;
	ctx.beginPath();
    ctx.moveTo(105, 0);
    ctx.lineTo(105, height);
    ctx.stroke();

	ctx.fillStyle = "rgba(255,255,255, "+ opacity*0.75 +")";
    ctx.font = '16pt Arial';
    ctx.textAlign = "center";
	ctx.fillText("Clans", 105/2, 150);
	
	
	for(var i=0; i<3; i++) {
		clanButtons[i].drawAtPosition(35, 180+i*65, opacity);
	}
}








function sqlQuery(query, title, color, unit) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '../stats.db', true);
	xhr.responseType = 'arraybuffer';
	
	xhr.onload = function(e) {
		var uInt8Array = new Uint8Array(this.response);
		var db = new SQL.Database(uInt8Array);
		var sqlContent = db.exec(query);

		var dataArray = new DataArray();
		dataArray.init(title, color, unit);
		
		for(var i=0; i<sqlContent[0]["values"].length; i++) {
			var dataPoint = new DataPoint();
			dataPoint.init(sqlContent[0]["values"][i][0], sqlContent[0]["values"][i][1], unit);
			
			dataArray.addData(dataPoint);
		}
		
		graph.addData(dataArray);
	};
	xhr.send();
}


function handleMouseClickStats() {
	if(mouse.x >= 15 && mouse.x <= 15+75 && mouse.y >= 15 && mouse.y <= 15+75) {
	   pageChanger.start("menu", 500);
	   page = "menu";
	}
	
	for(var i=0; i<3; i++) {
		if(clanButtons[i].mouseOver()) {
			currentClan = i;
		}
		
		if(currentClan === i) {
			if(clanMemberCountButtons[i].mouseOver()) {
				if(!clanMemberCountButtons[i].isEnabled()) {
					sqlQuery("SELECT Date, MemberCount FROM Clan WHERE TAG=\"" + clanTags[i] + "\"", "clanmembercount"+i, clanColors[i], "Mitglieder");
				} else {
					graph.removeData("clanmembercount"+i);
				}
				clanMemberCountButtons[i].toggle();
			}
			
			else if(clanTrophyButtons[i].mouseOver()) {
				if(!clanTrophyButtons[i].isEnabled()) {
					sqlQuery("SELECT Date, Score FROM Clan WHERE TAG=\"" + clanTags[i] + "\"", "clanscore"+i, clanColors[i], "Trophäen");
				} else {
					graph.removeData("clanscore"+i);
				}
				clanTrophyButtons[i].toggle();
			}
		}
	}
}