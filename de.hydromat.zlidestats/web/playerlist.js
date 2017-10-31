var playerNameArray;
var playerTagArray;
var playerClanTagArray;
var mostRecentDate;

var listScroll = 0;
var selectedPlayerIndex = -1;
var selectedPlayerName = "";
var selectedPlayerRole = "";
var mouseDownOnPlayerListScroll = false;



function setupPlayerList() {
	playerNameArray = [];
	playerTagArray = [];
	playerClanTagArray = [];
	mostRecentDate = [];
	
	memberLevelButtons = [];
	memberTrophieButtons = [];
	memberDonationButtons = [];
	memberClanChestButtons = [];
	
	for(var j=0; j<3; j++) {
		var sqlContent = db.exec("SELECT MAX(ClanDate) FROM  ClanMember WHERE ClanTag=\"" + clanTags[j] + "\";");
		
		for(var i=0; i<sqlContent[0]["values"].length; i++) {
			mostRecentDate[j] = sqlContent[0]["values"][i][0];
		}
		
		var sqlContent = db.exec("SELECT Name, Tag, ClanTag FROM  ClanMember WHERE (ClanDate="+mostRecentDate[j]+" AND ClanTag=\""+clanTags[j]+"\") ORDER BY Trophies DESC;");
		
		for(var i=0; i<sqlContent[0]["values"].length; i++) {
			var currentName = sqlContent[0]["values"][i][0];
			
		    ctx.font = '12pt Arial';
		    while(ctx.measureText(currentName).width > 130) {
		    	currentName = currentName.slice(0, -1);
		    }
		    
		    var currentIndex = playerNameArray.length;
		    
			playerNameArray[currentIndex] = currentName;
			playerTagArray[currentIndex] = sqlContent[0]["values"][i][1];
			playerClanTagArray[currentIndex] = sqlContent[0]["values"][i][2];

			
			memberLevelButtons[currentIndex] = new Button();
			memberLevelButtons[currentIndex].init("Spieler-Level", 0, 0, 12);
			memberLevelButtons[currentIndex].setBackGroundOpacity(0.25);
			memberLevelButtons[currentIndex].setBackGround(clanColors[j]);
			memberLevelButtons[currentIndex].setFixedSize(15);
			memberLevelButtons[currentIndex].makeCheckBox();
			
			memberTrophieButtons[currentIndex] = new Button();
			memberTrophieButtons[currentIndex].init("Trophäen", 0, 0, 12);
			memberTrophieButtons[currentIndex].setBackGroundOpacity(0.25);
			memberTrophieButtons[currentIndex].setBackGround(clanColors[j]);
			memberTrophieButtons[currentIndex].setFixedSize(15);
			memberTrophieButtons[currentIndex].makeCheckBox();
			
			memberDonationButtons[currentIndex] = new Button();
			memberDonationButtons[currentIndex].init("Spenden", 0, 0, 12);
			memberDonationButtons[currentIndex].setBackGroundOpacity(0.25);
			memberDonationButtons[currentIndex].setBackGround(clanColors[j]);
			memberDonationButtons[currentIndex].setFixedSize(15);
			memberDonationButtons[currentIndex].makeCheckBox();
			
			memberClanChestButtons[currentIndex] = new Button();
			memberClanChestButtons[currentIndex].init("Clanchest-Kronen", 0, 0, 12);
			memberClanChestButtons[currentIndex].setBackGroundOpacity(0.25);
			memberClanChestButtons[currentIndex].setBackGround(clanColors[j]);
			memberClanChestButtons[currentIndex].setFixedSize(15);
			memberClanChestButtons[currentIndex].makeCheckBox();
		}
	}
};

function drawPlayerListPanel(opacity) {
	if(playerNameArray == null)
		return;
	
	ctx.fillStyle = "rgba(0,0,0, "+ opacity*0.25 +")";
	ctx.strokeStyle = "rgba(0,0,0, "+ opacity*0.5 +")";
	ctx.lineWidth = 1;

	ctx.fillRect(20, 400, 150, height-420);
	ctx.fillRect(160, 400, 10, height-420);
	ctx.strokeRect(20, 400, 150, height-420);
	
    ctx.textAlign = "left";
    ctx.font = '12pt Arial';
	ctx.fillStyle = "rgba("+clanColors[0]+", "+ opacity*0.5 +")";
	
	var activeID = getHoveredListID();
    var currentClan = 0;
	for(var j=0; j<playerNameArray.length; j++) {
		if(playerClanTagArray[j] != clanTags[currentClan]) {
			currentClan++;
			ctx.fillStyle = "rgba("+clanColors[currentClan]+", "+ opacity*0.5 +")";
		}
		if(j === activeID) {
			ctx.fillStyle = "rgba("+clanColors[currentClan]+", "+ opacity*1 +")";
		}
		
		if(420+(j-1)*20 + listScroll < 400)
			continue;
		if(420+j*20 + listScroll > height-20)
			break;
			
		ctx.fillText(playerNameArray[j], 25, 420+j*20 + listScroll);
		
		if(j === activeID) {
			ctx.fillStyle = "rgba("+clanColors[currentClan]+", "+ opacity*0.5 +")";
		}
	}
	
	var panelHeight = height-420;
	var listHeight = 20*(playerNameArray.length+1);
	var percentScrolled = listScroll / (listHeight-panelHeight);
	
	var scrollBarHeight = (panelHeight / listHeight) * panelHeight;
	var scrollBarY = 402.5 - percentScrolled * (panelHeight-5);
	scrollBarY += scrollBarHeight * percentScrolled;

	ctx.strokeStyle = "rgba(255,255,255, "+ opacity*0.75 +")";
	ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(165, scrollBarY);
    ctx.lineTo(165, scrollBarY + scrollBarHeight);
    ctx.stroke();
    
    
    
    if(mouseDown && mouseDownOnPlayerListScroll) {
		listScroll = -1 * (listHeight-panelHeight) * ((mouse.y - 400) / panelHeight);
		scrollList(listScroll);
    } else {
    	mouseDownOnPlayerListScroll = false;
    }
};

function scrollList(scroll) {
	setScroll(scroll * 40);
};

function scrollList(scroll) {
	var maxScroll = -1 * (20*(playerNameArray.length+1)-height+420);
	listScroll = scroll;
	
	if(listScroll > 0)
		listScroll = 0;
	
	if(listScroll < maxScroll - maxScroll%20)
		listScroll = maxScroll - maxScroll%20;
};

function getHoveredListID() {
	if(mouse.x >= 20 && mouse.x <= 160) {
		if(mouse.y >= 400 && mouse.y <= height-20) {
			var index = Math.floor((mouse.y-400-listScroll)/20);
			return index;
		}
	}
	return -1;
};

function handleMouseClickPlayerList() {
	var activeID = getHoveredListID();
	if(activeID != -1) {
		selectedPlayerIndex = activeID;
		
		if(db == null)
			return;
		
		var sqlContent = db.exec("SELECT Name, RoleName FROM ClanMember WHERE Tag=\""+ playerTagArray[selectedPlayerIndex] +"\";");
		
		for(var i=0; i<sqlContent[0]["values"].length; i++) {
			selectedPlayerName = sqlContent[0]["values"][i][0]
			selectedPlayerRole = sqlContent[0]["values"][i][1];
			
			if(selectedPlayerRole === "Member")
				selectedPlayerRole = "Mitglied";
			else if(selectedPlayerRole === "Elder")
				selectedPlayerRole = "Ältester";
			else if(selectedPlayerRole === "Co-Leader")
				selectedPlayerRole = "Vize-Anführer";
			else if(selectedPlayerRole === "Leader")
				selectedPlayerRole = "Anführer";
		}
	}
	
	if(mouse.x >= 160 && mouse.x <= 170) {
		if(mouse.y >= 400 && mouse.y <= height-20) {
			mouseDownOnPlayerListScroll = true;
		}
	}
};
















