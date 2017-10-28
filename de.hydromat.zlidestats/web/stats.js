var db;
var info = "Verbinde zur Datenbank...";

var clanTags;
var clanColors;

var clanMemberCountButtons;
var clanTrophyButtons;
var clanRequiredTrophiesButtons;
var clanDonationsButtons;
var clanChestAbsButtons;

var clearGraphButton;


var scrollPercent = 0;
var scrollPixel = 0;






function setupStats() {
	db = null;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '../stats.db', true);
	xhr.responseType = 'arraybuffer';
	
	xhr.onload = function(e) {
		var uInt8Array = new Uint8Array(this.response);
		db = new SQL.Database(uInt8Array);
		info = "Stand: " + millisToDate(new Date().getTime());
	};
	xhr.send();


	clanTags = [];
	clanTags[0] = "8LVVU0U";
	clanTags[1] = "2GPRJJG";
	clanTags[2] = "2R92CURQ";
	
	clanColors = [];
	clanColors[0] = "46,135,40";
	clanColors[1] = "40,90,135";
	clanColors[2] = "135,40,40";
	
	clearGraphButton = new Button();
	clearGraphButton.init("X", 0, 0, 30);
	clearGraphButton.setForeGround("255, 255, 255");
	clearGraphButton.setBackGround("255, 255, 255");
	clearGraphButton.setBackGroundOpacity(0.05);
	clearGraphButton.setFixedSize(35);
	clearGraphButton.setTextAlign("center");
	
	
	clanMemberCountButtons = [];
	clanTrophyButtons = [];
	clanRequiredTrophiesButtons = [];
	clanDonationsButtons = [];
	clanChestAbsButtons = [];
	
	for(var i=0; i<3; i++) {
		clanMemberCountButtons[i] = new Button();
		clanMemberCountButtons[i].init("Anzahl der Mitglieder", 0, 0, 12);
		clanMemberCountButtons[i].setForeGround("255, 255, 255");
		clanMemberCountButtons[i].setBackGround(clanColors[i]);
		clanMemberCountButtons[i].setBackGroundOpacity(0.25);
		clanMemberCountButtons[i].setFixedSize(15);
		clanMemberCountButtons[i].setTextAlign("left");
		clanMemberCountButtons[i].makeCheckBox();
		
		clanTrophyButtons[i] = new Button();
		clanTrophyButtons[i].init("ClanTrophäen", 0, 0, 12);
		clanTrophyButtons[i].setForeGround("255, 255, 255");
		clanTrophyButtons[i].setBackGround(clanColors[i]);
		clanTrophyButtons[i].setBackGroundOpacity(0.25);
		clanTrophyButtons[i].setFixedSize(15);
		clanTrophyButtons[i].setTextAlign("left");
		clanTrophyButtons[i].makeCheckBox();
		
		clanRequiredTrophiesButtons[i] = new Button();
		clanRequiredTrophiesButtons[i].init("Beitrittsgrenze", 0, 0, 12);
		clanRequiredTrophiesButtons[i].setForeGround("255, 255, 255");
		clanRequiredTrophiesButtons[i].setBackGround(clanColors[i]);
		clanRequiredTrophiesButtons[i].setBackGroundOpacity(0.25);
		clanRequiredTrophiesButtons[i].setFixedSize(15);
		clanRequiredTrophiesButtons[i].setTextAlign("left");
		clanRequiredTrophiesButtons[i].makeCheckBox();
		
		clanDonationsButtons[i] = new Button();
		clanDonationsButtons[i].init("Clanspenden", 0, 0, 12);
		clanDonationsButtons[i].setForeGround("255, 255, 255");
		clanDonationsButtons[i].setBackGround(clanColors[i]);
		clanDonationsButtons[i].setBackGroundOpacity(0.25);
		clanDonationsButtons[i].setFixedSize(15);
		clanDonationsButtons[i].setTextAlign("left");
		clanDonationsButtons[i].makeCheckBox();
		
		clanChestAbsButtons[i] = new Button();
		clanChestAbsButtons[i].init("Clantruhe", 0, 0, 12);
		clanChestAbsButtons[i].setForeGround("255, 255, 255");
		clanChestAbsButtons[i].setBackGround(clanColors[i]);
		clanChestAbsButtons[i].setBackGroundOpacity(0.25);
		clanChestAbsButtons[i].setFixedSize(15);
		clanChestAbsButtons[i].setTextAlign("left");
		clanChestAbsButtons[i].makeCheckBox();
	}
}

function drawStats(opacity) {
	scrollPixel = scrollPercent * (height - /*HÖHE DES PANE*/100);

	ctx.fillStyle = "rgba(0,0,0, "+ opacity*0.25 +")";
	ctx.fillRect(0, 0, 390, 100);
	
	ctx.strokeStyle = "rgba(255,255,255, " + opacity*0.25 + ")";
    ctx.lineWidth = 1;
	ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(390, 100);
    ctx.stroke();
    
	drawScrollPane(opacity);
	drawTitle(opacity);
	
	// Finally draw the Graph
	graph.draw(ctx, 400, 0, width-400-10, height, opacity);
}



function drawTitle(opacity) {
	ctx.fillStyle = "rgba(0,0,0, "+ opacity*0.25 +")";
	ctx.fillRect(0, 0, 390, height);
	
	ctx.strokeStyle = "rgba(255,255,255, " + opacity*0.25 + ")";
    ctx.lineWidth = 1;
	ctx.beginPath();
    ctx.moveTo(390, 0);
    ctx.lineTo(390, height);
    ctx.stroke();

	ctx.fillStyle = "rgba(255,255,255, "+ opacity*0.75 +")";
    ctx.textAlign = "left";
    ctx.font = '16pt Arial';
	ctx.fillText("Zli De Royale Statistiken", 120, 40-scrollPixel);
    ctx.font = '12pt Arial';
	ctx.fillStyle = "rgba(255,255,255, "+ opacity*0.3 +")";
	ctx.fillText(info, 120, 70-scrollPixel);
	

//	clearGraphButton.drawAtPosition(35, height-75, opacity);
}



function drawScrollPane(opacity) {
    ctx.textAlign = "right";
    ctx.font = '12pt Arial';
	ctx.fillStyle = "rgba(255,255,255, "+ opacity*1.0 +")";

	var gap = 35;

	ctx.fillText("Clan", 180, 12+180-1*gap-scrollPixel);
	ctx.fillText("Anzahl der Mitglieder", 180, 12+180+0*gap-scrollPixel);
	ctx.fillText("ClanTrophäen", 180, 12+180+1*gap-scrollPixel);
	ctx.fillText("Beitrittsgrenze", 180, 12+180+2*gap-scrollPixel);
	ctx.fillText("Clanspenden", 180, 12+180+3*gap-scrollPixel);
	ctx.fillText("Clantruhe", 180, 12+180+4*gap-scrollPixel);
	
	for(var i=0; i<3; i++) {
	    ctx.textAlign = "center";
	    ctx.font = '12pt Arial';
		ctx.fillStyle = "rgba(255,255,255, "+ opacity*1.0 +")";
		ctx.fillText(i+1, 8+220+i*gap, 12+180-1*gap-scrollPixel);
		
		clanMemberCountButtons[i].drawAtPosition(220+i*gap, 180+0*gap-scrollPixel, opacity);
		clanTrophyButtons[i].drawAtPosition(220+i*gap, 180+1*gap-scrollPixel, opacity);
		clanRequiredTrophiesButtons[i].drawAtPosition(220+i*gap, 180+2*gap-scrollPixel, opacity);
		clanDonationsButtons[i].drawAtPosition(220+i*gap, 180+3*gap-scrollPixel, opacity);
		clanChestAbsButtons[i].drawAtPosition(220+i*gap, 180+4*gap-scrollPixel, opacity);
	}
}








function sqlQuery(query, title, color, unit) {
	if(db == null)
		return;
	
	var sqlContent = db.exec(query);

	var dataArray = new DataArray();
	dataArray.init(title, color, unit);
	
	for(var i=0; i<sqlContent[0]["values"].length; i++) {
		var dataPoint = new DataPoint();
		dataPoint.init(sqlContent[0]["values"][i][0], sqlContent[0]["values"][i][1], unit);
		
		dataArray.addData(dataPoint);
	}
	
	graph.addData(dataArray);
}


function handleMouseClickStats() {
	if(mouse.x >= 15 && mouse.x <= 15+75 && mouse.y >= 15 && mouse.y <= 15+75) {
	   pageChanger.start("menu", 500);
	   page = "menu";
	}
	
	for(var i=0; i<3; i++) {
		if(clanMemberCountButtons[i].mouseOver()) {
			if(!clanMemberCountButtons[i].isEnabled()) {
				sqlQuery("SELECT Date, MemberCount FROM Clan WHERE TAG=\"" + clanTags[i] + "\"", clanMemberCountButtons[i].getText()+" ("+i+")", clanColors[i], "Mitglieder");
			} else {
				graph.removeData(clanMemberCountButtons[i].getText()+" ("+i+")");
			}
			clanMemberCountButtons[i].toggle();
		}
		
		else if(clanTrophyButtons[i].mouseOver()) {
			if(!clanTrophyButtons[i].isEnabled()) {
				sqlQuery("SELECT Date, Score FROM Clan WHERE TAG=\"" + clanTags[i] + "\"", clanTrophyButtons[i].getText()+" ("+i+")", clanColors[i], "Trophäen");
			} else {
				graph.removeData(clanTrophyButtons[i].getText()+" ("+i+")");
			}
			clanTrophyButtons[i].toggle();
		}
		
		else if(clanRequiredTrophiesButtons[i].mouseOver()) {
			if(!clanRequiredTrophiesButtons[i].isEnabled()) {
				sqlQuery("SELECT Date, RequiredScore FROM Clan WHERE TAG=\"" + clanTags[i] + "\"", clanRequiredTrophiesButtons[i].getText()+" ("+i+")", clanColors[i], "Trophäen");
			} else {
				graph.removeData(clanRequiredTrophiesButtons[i].getText()+" ("+i+")");
			}
			clanRequiredTrophiesButtons[i].toggle();
		}
		
		else if(clanDonationsButtons[i].mouseOver()) {
			if(!clanDonationsButtons[i].isEnabled()) {
				sqlQuery("SELECT Date, Donations FROM Clan WHERE TAG=\"" + clanTags[i] + "\"", clanDonationsButtons[i].getText()+" ("+i+")", clanColors[i], "Spenden");
			} else {
				graph.removeData(clanDonationsButtons[i].getText()+" ("+i+")");
			}
			clanDonationsButtons[i].toggle();
		}
		
		else if(clanChestAbsButtons[i].mouseOver()) {
			if(!clanChestAbsButtons[i].isEnabled()) {
				sqlQuery("SELECT ClanDate, ClanChestCrowns FROM ClanChest WHERE ClanTag=\"" + clanTags[i] + "\"", clanChestAbsButtons[i].getText()+" ("+i+")", clanColors[i], "Trophäen");
			} else {
				graph.removeData(clanChestAbsButtons[i].getText()+" ("+i+")");
			}
			clanChestAbsButtons[i].toggle();
		}
	}
}



function millisToDate(millis) {
	var dateEntry = new Date(millis);
	var dateString = dateEntry.getDate() + "." + (dateEntry.getMonth()+1) + "." + dateEntry.getFullYear() + " - " + makeTwoDiget(dateEntry.getHours()) + ":" + makeTwoDiget(dateEntry.getMinutes()) + " Uhr";
	return dateString;
}


function makeTwoDiget(int) {
	if(int < 10)
		return "0"+int;
	else
		return ""+int;
}




