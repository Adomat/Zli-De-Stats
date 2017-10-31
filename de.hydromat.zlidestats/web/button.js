function Button () {
    this.text = "unbenannter Button";
    this.fontSize;
    this.x;
    this.y;
    this.width;
    this.foreGroundColor;
    this.backGroundColor;
    this.backGroundOpacity;
    this.fixedSize = -1;
    this.alignment = "left";
    this.enabled = false;
    this.iCheckBox = false;
    
    this.init = function(text, x, y, fontSize) {
    	this.text = text;
        this.fontSize = fontSize;
        this.x = x;
        this.y = y;

        this.foreGroundColor = "255, 255, 255";
        this.backGroundColor = "0, 0, 0";
    };
    
    this.drawAdvanced = function(x, y, fontSize, opacity) {
    	this.x = x;
    	this.y = y;
    	this.fontSize = fontSize;
    	
    	//Calculate variables
    	var rectOpacity = opacity*this.backGroundOpacity;
    	if(this.mouseOver())
    		rectOpacity *= 2;
    	
		ctx.fillStyle = "rgba("+this.backGroundColor+"," + rectOpacity + ")";
		ctx.strokeStyle = "rgba("+this.backGroundColor+"," + rectOpacity*2 + ")";
		ctx.lineWidth = 1;
		
        ctx.font = fontSize+'pt Arial';
    	this.width = ctx.measureText(this.text).width;
    	var margin = this.fontSize * 1.2 + 5 - this.fontSize;
    	if(this.fixedSize != -1)
    		this.width = this.fixedSize;

		// Button
        ctx.lineWidth = 1;
		ctx.strokeStyle = "rgba("+this.backGroundColor+"," + opacity*0.5 + ")";
		ctx.fillRect(x-margin, y-margin, this.width+margin*2, fontSize+margin*2);
		ctx.strokeRect(x-margin, y-margin, this.width+margin*2, fontSize+margin*2);
		
    	// CheckBox
    	if(this.isCheckBox) {
    		if(this.enabled) {
    			// graphColor
    			ctx.strokeStyle = "rgba(255,255,255, " + opacity*0.75 + ")";
                ctx.lineWidth = 3;
            	ctx.beginPath();
            	var hx = x-margin;
            	var hy = y-margin;
                ctx.moveTo(hx+5, hy+15);
                ctx.lineTo(hx+10, hy+20);
                ctx.lineTo(hx+22, hy+5);
                ctx.stroke();
    		}
    	} else {
    		// Font
        	var fontOpacity = opacity*0.75;
        	if(this.mouseOver())
        		fontOpacity = opacity*2;
    		ctx.fillStyle = "rgba("+this.foreGroundColor+"," + fontOpacity + ")";
        	
        	ctx.textAlign = this.alignment;
        	var offSet = 0;
        	if(this.alignment === "center")
        		offSet += this.width/2;
        	else if(this.alignment === "right")
        		offSet += this.width;
            
            ctx.fillText(this.text, x+offSet, y+fontSize);
    	}
    };
    
    this.drawAtPosition = function(x, y, opacity) {
    	this.drawAdvanced(x, y, this.fontSize, opacity);
    }
    
    this.drawSimple = function(opacity) {
    	this.drawAtPosition(this.x, this.y, opacity);
    }
    
    
    
    
    
    this.mouseOver = function() {
    	if(mouse.x >= this.x-5 && mouse.x <= this.x+this.width+5) {
    		if(mouse.y >= this.y-5 && mouse.y <= this.y+this.fontSize+10) {
        		return true;
        	}
    	}
    	return false;
    };
    
    
    
    

    this.setText = function(text) {
    	this.text = text;
    };
    
    this.getText = function() {
    	return this.text;
    };
    
    this.getWidth = function() {
    	return this.width;
    };

    this.setForeGround = function(color) {
    	this.foreGroundColor = color;
    };
    
    this.setBackGround = function(color) {
    	this.backGroundColor = color;
    };
    
    this.setBackGroundOpacity = function(o) {
    	this.backGroundOpacity = o;
    };
    
    this.setFixedSize = function(size) {
    	this.fixedSize = size;
    };
    
    this.setTextAlign = function(align) {
    	this.alignment = align;
    };
    
    this.makeCheckBox = function() {
    	this.isCheckBox = true;
    };
    
    this.toggle = function() {
    	if(this.enabled)
    		this.enabled = false;
    	else
    		this.enabled = true;
    };
    
    this.disable = function() {
		this.enabled = false;
    };
    
    this.isEnabled = function() {
    	return this.enabled;
    };
}



