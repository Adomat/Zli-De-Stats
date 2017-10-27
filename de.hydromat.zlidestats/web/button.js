function Button () {
    this.text = "unbenannter Button";
    this.fontSize;
    this.x;
    this.y;
    this.width;
    var foreGroundColor;
    var backGroundColor;
    this.backGroundOpacity;
    
    this.init = function(text, x, y, fontSize) {
    	this.text = text;
        this.fontSize = fontSize;
        this.x = x;
        this.y = y;

        this.foreGroundColor = function () {  return {  r: 255,  g: 255,  b: 255  };  };
        this.backGroundColor = function () {  return {  r: 0,  g: 0,  b: 0  };  };
    };
    
    this.drawAdvanced = function(x, y, fontSize, opacity) {
    	this.x = x;
    	this.y = y;
    	this.fontSize = fontSize;
    	
    	// Button
        ctx.font = fontSize+'pt Arial';
    	this.width = ctx.measureText(this.text).width;
    	
    	var rectOpacity = opacity*this.backGroundOpacity;
    	if(this.mouseOver())
    		rectOpacity *= 2;
    	
		ctx.fillStyle = "rgba("+this.backGroundColor.r+","+this.backGroundColor.g+","+this.backGroundColor.b+"," + rectOpacity + ")";
		ctx.strokeStyle = "rgba("+this.backGroundColor.r+","+this.backGroundColor.g+","+this.backGroundColor.b+"," + opacity*0.5 + ")";
		ctx.lineWidth = 1;
		
		ctx.fillRect(x-5, y-5, this.width+10, fontSize*1.3+10);
		ctx.strokeRect(x-5, y-5, this.width+10, fontSize*1.3+10);

		
		// Font
    	ctx.textAlign = "left";
    	var fontOpacity = opacity*0.75;
    	if(this.mouseOver())
    		fontOpacity = opacity*2;
		ctx.fillStyle = "rgba("+this.foreGroundColor.r+","+this.foreGroundColor.g+","+this.foreGroundColor.b+"," + fontOpacity + ")";
        
        ctx.fillText(this.text, x, y+fontSize);
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
    
    this.getWidth = function() {
    	return this.width;
    };

    this.setForeGround = function(r,g,b) {
    	this.foreGroundColor.r = r;
    	this.foreGroundColor.g = g;
    	this.foreGroundColor.b = b;
    };
    
    this.setBackGround = function(r,g,b) {
    	this.backGroundColor.r = r;
    	this.backGroundColor.g = g;
    	this.backGroundColor.b = b;
    };
    
    this.setBackGroundOpacity = function(o) {
    	this.backGroundOpacity = o;
    };
}



