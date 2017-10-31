var db;
var info = "Verbinde zur Datenbank...";

var graph;

var clanTags;
var clanColors;

var clanMemberCountButtons;
var clanTrophyButtons;
var clanRequiredTrophiesButtons;
var clanDonationsButtons;
var clanChestAbsButtons;

var memberLevelButtons;
var memberTrophieButtons;
var memberDonationButtons;
var memberClanChestButtons;

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
		setupPlayerList();
		info = "Stand: " + millisToDate(mostRecentDate[2]);
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
	
	
	clanMemberCountButtons = [];
	clanTrophyButtons = [];
	clanRequiredTrophiesButtons = [];
	clanDonationsButtons = [];
	clanChestAbsButtons = [];
	
	for(var i=0; i<3; i++) {
		clanMemberCountButtons[i] = new Button();
		clanMemberCountButtons[i].init("Mitgliederzahl", 0, 0, 12);
		clanMemberCountButtons[i].setForeGround("255, 255, 255");
		clanMemberCountButtons[i].setBackGround(clanColors[i]);
		clanMemberCountButtons[i].setBackGroundOpacity(0.25);
		clanMemberCountButtons[i].setFixedSize(15);
		clanMemberCountButtons[i].setTextAlign("left");
		clanMemberCountButtons[i].makeCheckBox();
		
		clanTrophyButtons[i] = new Button();
		clanTrophyButtons[i].init("Clan-Trophäen", 0, 0, 12);
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
		clanDonationsButtons[i].init("Spenden", 0, 0, 12);
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
};

function drawStats(opacity) {
	scrollPixel = scrollPercent * (height - /*HÖHE DES PANE*/100);

	ctx.fillStyle = "rgba(0,0,0, "+ opacity*0.25 +")";
	ctx.fillRect(0, 0, 390, height);
	
	ctx.strokeStyle = "rgba(255,255,255, " + opacity*0.25 + ")";
    ctx.lineWidth = 1;
	ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(389, 100);
    ctx.stroke();
    
	drawTitle(opacity);
	drawClanPanel(opacity);
	drawPlayerListPanel(opacity);
	drawPlayerStatisticPanel(opacity);
	
	// Finally draw the Graph
	if(mouseDown && pmouse.x != mouse.x) {
		graph.scroll(pmouse.x - mouse.x);
	}
	graph.draw(ctx, 390, 20, width-390-20, height-40, opacity);
};



function drawTitle(opacity) {
	ctx.fillStyle = "rgba(0,0,0, "+ opacity*0.5 +")";
	ctx.fillRect(0, 0, 390, 100);
	ctx.fillRect(width-20, 0, 20, height);

	ctx.strokeStyle = "rgba(255,255,255, " + opacity*0.25 + ")";
    ctx.lineWidth = 1;
    
	ctx.beginPath();
    ctx.moveTo(390, 0);
    ctx.lineTo(390, height);
    ctx.stroke();
    
	ctx.beginPath();
    ctx.moveTo(width-20, 0);
    ctx.lineTo(width-20, height);
    ctx.stroke();

	ctx.fillStyle = "rgba(255,255,255, "+ opacity*0.75 +")";
    ctx.textAlign = "left";
    ctx.font = '16pt Arial';
	ctx.fillText("Zli De Royale Statistiken", 120, 40-scrollPixel);
    ctx.font = '12pt Arial';
	ctx.fillStyle = "rgba(255,255,255, "+ opacity*0.3 +")";
	ctx.fillText(info, 120, 70-scrollPixel);
};



function drawClanPanel(opacity) {
	ctx.fillStyle = "rgba(0,0,0, "+ opacity*0.25 +")";
	ctx.strokeStyle = "rgba(0,0,0, "+ opacity*0.5 +")";
	ctx.lineWidth = 1;

	var gap = 40;
	var xBase = 220;
	
	ctx.fillRect(20, 120, 350, 260);
	ctx.strokeRect(20, 120, 350, 260);

	ctx.fillRect(xBase+10, 125, 135, 250);
	ctx.strokeRect(xBase+10, 125, 135, 250);
	
    ctx.textAlign = "right";
    ctx.font = '12pt Arial';
	ctx.fillStyle = "rgba(255,255,255, "+ opacity*0.75 +")";

	ctx.beginPath();
    ctx.moveTo(xBase+58, 130);
    ctx.lineTo(xBase+58, 365);
    
    ctx.moveTo(xBase+97, 130);
    ctx.lineTo(xBase+97, 365);
    
    ctx.moveTo(xBase+15, 163);
    ctx.lineTo(xBase+140, 163);
    ctx.stroke();

	ctx.fillText("Clan", xBase-20, 12+180-1*gap-scrollPixel);
	ctx.fillText("Anzahl der Mitglieder", xBase-20, 12+180+0*gap-scrollPixel);
	ctx.fillText("ClanTrophäen", xBase-20, 12+180+1*gap-scrollPixel);
	ctx.fillText("Beitrittsgrenze", xBase-20, 12+180+2*gap-scrollPixel);
	ctx.fillText("Clanspenden", xBase-20, 12+180+3*gap-scrollPixel);
	ctx.fillText("Clantruhe", xBase-20, 12+180+4*gap-scrollPixel);
	
	for(var i=0; i<3; i++) {
	    ctx.textAlign = "center";
	    ctx.font = '12pt Arial';
		ctx.fillStyle = "rgba(255,255,255, "+ opacity*1.0 +")";
		ctx.fillText(i+1, xBase+38+i*gap, 12+180-1*gap-scrollPixel);
		
		clanMemberCountButtons[i].drawAtPosition(xBase+30+i*gap, 180+0*gap-scrollPixel, opacity);
		clanTrophyButtons[i].drawAtPosition(xBase+30+i*gap, 180+1*gap-scrollPixel, opacity);
		clanRequiredTrophiesButtons[i].drawAtPosition(xBase+30+i*gap, 180+2*gap-scrollPixel, opacity);
		clanDonationsButtons[i].drawAtPosition(xBase+30+i*gap, 180+3*gap-scrollPixel, opacity);
		clanChestAbsButtons[i].drawAtPosition(xBase+30+i*gap, 180+4*gap-scrollPixel, opacity);
	}
};




function drawPlayerStatisticPanel(opacity) {
	if(selectedPlayerIndex === -1)
		return;
	
	
	ctx.fillStyle = "rgba(0,0,0, "+ opacity*0.25 +")";
	ctx.strokeStyle = "rgba(0,0,0, "+ opacity*0.5 +")";
	ctx.lineWidth = 1;
	
	var gap = 40;
	var xBase = 300;
	var yBase = 520;
	

	ctx.fillRect(190, 400, 180, 242);
	ctx.fillRect(190, 400, 180, 65);
	ctx.strokeRect(190, 400, 180, 242);

	ctx.fillRect(xBase+20, yBase-45, 45, 162);
	ctx.strokeRect(xBase+20, yBase-45, 45, 162);

    ctx.textAlign = "left";
    ctx.font = '16pt Arial';
	ctx.fillStyle = "rgba(255,255,255, "+ opacity*1.0 +")";
	ctx.fillText(selectedPlayerName, xBase-100, yBase-90);
    ctx.font = '12pt Arial';
	ctx.fillStyle = "rgba(255,255,255, "+ opacity*0.5 +")";
	ctx.fillText(selectedPlayerRole, xBase-100, yBase-70);

	ctx.fillStyle = "rgba(255,255,255, "+ opacity*0.75 +")";
    ctx.font = '12pt Arial';
    ctx.textAlign = "right";
	ctx.fillText("Level", xBase, 22+yBase-1*gap-scrollPixel);
	ctx.fillText("Trophäen", xBase, 22+yBase+0*gap-scrollPixel);
	ctx.fillText("Spenden", xBase, 22+yBase+1*gap-scrollPixel);
	ctx.fillText("Clantruhe", xBase, 22+yBase+2*gap-scrollPixel);

	memberLevelButtons[selectedPlayerIndex].drawAtPosition(xBase+35, 10+yBase-1*gap-scrollPixel, opacity);
	memberTrophieButtons[selectedPlayerIndex].drawAtPosition(xBase+35, 11+yBase+0*gap-scrollPixel, opacity);
	memberDonationButtons[selectedPlayerIndex].drawAtPosition(xBase+35, 10+yBase+1*gap-scrollPixel, opacity);
	memberClanChestButtons[selectedPlayerIndex].drawAtPosition(xBase+35, 10+yBase+2*gap-scrollPixel, opacity);
};









function addGraphByQuery(query, title, color, unit) {
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
};


function handleMouseClickStats() {
	if(mouse.x >= 15 && mouse.x <= 15+75 && mouse.y >= 15 && mouse.y <= 15+75) {
	   pageChanger.start("menu", 500);
	   page = "menu";
	}
	
	for(var i=0; i<3; i++) {
		if(clanMemberCountButtons[i].mouseOver()) {
			var key = clanMemberCountButtons[i].getText()+" Clan #"+(i+1)+"";
			if(!clanMemberCountButtons[i].isEnabled()) {
				addGraphByQuery("SELECT Date, MemberCount FROM Clan WHERE TAG=\"" + clanTags[i] + "\"", key, clanColors[i], "Mitglieder");
			} else {
				graph.removeData(key);
			}
			clanMemberCountButtons[i].toggle();
		}
		
		else if(clanTrophyButtons[i].mouseOver()) {
			var key = clanTrophyButtons[i].getText()+" Clan #"+(i+1)+"";
			if(!clanTrophyButtons[i].isEnabled()) {
				addGraphByQuery("SELECT Date, Score FROM Clan WHERE TAG=\"" + clanTags[i] + "\"", key, clanColors[i], "Trophäen");
			} else {
				graph.removeData(key);
			}
			clanTrophyButtons[i].toggle();
		}
		
		else if(clanRequiredTrophiesButtons[i].mouseOver()) {
			var key = clanRequiredTrophiesButtons[i].getText()+" Clan #"+(i+1)+"";
			if(!clanRequiredTrophiesButtons[i].isEnabled()) {
				addGraphByQuery("SELECT Date, RequiredScore FROM Clan WHERE TAG=\"" + clanTags[i] + "\"", key, clanColors[i], "Trophäen");
			} else {
				graph.removeData(key);
			}
			clanRequiredTrophiesButtons[i].toggle();
		}
		
		else if(clanDonationsButtons[i].mouseOver()) {
			var key = clanDonationsButtons[i].getText()+" Clan #"+(i+1)+"";
			if(!clanDonationsButtons[i].isEnabled()) {
				addGraphByQuery("SELECT Date, Donations FROM Clan WHERE TAG=\"" + clanTags[i] + "\"", key, clanColors[i], "Spenden");
			} else {
				graph.removeData(key);
			}
			clanDonationsButtons[i].toggle();
		}
		
		else if(clanChestAbsButtons[i].mouseOver()) {
			var key = clanChestAbsButtons[i].getText()+" Clan #"+(i+1)+"";
			if(!clanChestAbsButtons[i].isEnabled()) {
				addGraphByQuery("SELECT ClanDate, ClanChestCrowns FROM ClanChest WHERE ClanTag=\"" + clanTags[i] + "\"", key, clanColors[i], "Trophäen");
			} else {
				graph.removeData(key);
			}
			clanChestAbsButtons[i].toggle();
		}
	}
	
	if(selectedPlayerIndex >= 0) {
		if(memberLevelButtons[selectedPlayerIndex].mouseOver()) {
			var key = memberLevelButtons[i].getText()+" ("+playerNameArray[selectedPlayerIndex]+")";
			if(!memberLevelButtons[selectedPlayerIndex].isEnabled()) {
				addGraphByQuery("SELECT ClanDate, Level FROM ClanMember WHERE Tag=\"" + playerTagArray[selectedPlayerIndex] + "\"", key, "255, 255, 255", "Level");
			} else {
				graph.removeData(key);
			}
			memberLevelButtons[selectedPlayerIndex].toggle();
		}
		else if(memberTrophieButtons[selectedPlayerIndex].mouseOver()) {
			var key = memberTrophieButtons[i].getText()+" ("+playerNameArray[selectedPlayerIndex]+")";
			if(!memberTrophieButtons[selectedPlayerIndex].isEnabled()) {
				addGraphByQuery("SELECT ClanDate, Trophies FROM ClanMember WHERE Tag=\"" + playerTagArray[selectedPlayerIndex] + "\"", key, "255, 255, 255", "Trophäen");
			} else {
				graph.removeData(key);
			}
			memberTrophieButtons[selectedPlayerIndex].toggle();
		}
		else if(memberDonationButtons[selectedPlayerIndex].mouseOver()) {
			var key = memberDonationButtons[i].getText()+" ("+playerNameArray[selectedPlayerIndex]+")";
			if(!memberDonationButtons[selectedPlayerIndex].isEnabled()) {
				addGraphByQuery("SELECT ClanDate, Donation FROM ClanMember WHERE Tag=\"" + playerTagArray[selectedPlayerIndex] + "\"", key, "255, 255, 255", "Spenden");
			} else {
				graph.removeData(key);
			}
			memberDonationButtons[selectedPlayerIndex].toggle();
		}
		else if(memberClanChestButtons[selectedPlayerIndex].mouseOver()) {
			var key = memberClanChestButtons[i].getText()+" ("+playerNameArray[selectedPlayerIndex]+")";
			if(!memberClanChestButtons[selectedPlayerIndex].isEnabled()) {
				addGraphByQuery("SELECT ClanDate, ClanChestCrowns FROM ClanMember WHERE Tag=\"" + playerTagArray[selectedPlayerIndex] + "\"", key, "255, 255, 255", "Kronen");
			} else {
				graph.removeData(key);
			}
			memberClanChestButtons[selectedPlayerIndex].toggle();
		}
	}
};



function millisToDate(millis) {
	var dateEntry = new Date(millis);
	var dateString = dateEntry.getDate() + "." + (dateEntry.getMonth()+1) + "." + dateEntry.getFullYear() + " - " + makeTwoDiget(dateEntry.getHours()) + ":" + makeTwoDiget(dateEntry.getMinutes()) + " Uhr";
	return dateString;
};


function makeTwoDiget(int) {
	if(int < 10)
		return "0"+int;
	else
		return ""+int;
};


function handleContextMenuStats() {
	graph.reset();
	
	for(var i=0; i<3; i++) {
		clanMemberCountButtons[i].disable();
		clanTrophyButtons[i].disable();
		clanRequiredTrophiesButtons[i].disable();
		clanDonationsButtons[i].disable();
		clanChestAbsButtons[i].disable();
	}
	
	for(var i=0; i<memberLevelButtons.length; i++) {
		memberLevelButtons[i].disable();
		memberTrophieButtons[i].disable();
		memberDonationButtons[i].disable();
		memberClanChestButtons[i].disable();
	}
};


function handleMouseWheelStats(e) {
	var e = window.event || e; // old IE support
	
	if(mouse.x >= 390) {
		var zoom = Math.max(-0.2, Math.min(0.2, (e.wheelDelta || -e.detail)));
		graph.zoom(zoom);
	}
	else if(mouse.x >= 20 && mouse.x <= 170) {
		if(mouse.y >= 400 && mouse.y <= height-20) {
			var scroll = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
			scrollList(listScroll + scroll * 100);
		}
	}
}












