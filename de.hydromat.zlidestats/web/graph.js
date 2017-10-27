function Graph () {
	this.title;
    this.data;
    
    this.lowestTime;
    this.highestTime;
    this.lowestData;
    this.highestData;
    
    this.timeRange;
    this.dataRange;
    
    this.addData = function(title, data) {
    	this.title = title;
        this.data = data;
        
        this.lowestTime = this.data[0].getTime();
        this.highestTime = this.data[0].getTime();
        
        this.lowestData = this.data[0].getData();
        this.highestData = this.data[0].getData();
        
        for(var i=0; i<this.data.length; i++) {
            if(this.data[i].getTime() < this.lowestTime)
                this.lowestTime = this.data[i].getTime();
            if(this.data[i].getTime() > this.highestTime)
                this.highestTime = this.data[i].getTime();
            
            if(this.data[i].getData() < this.lowestData)
                this.lowestData = this.data[i].getData();
            if(this.data[i].getData() > this.highestData)
                this.highestData = this.data[i].getData();
        }
        
        this.timeRange = this.highestTime - this.lowestTime;
        this.dataRange = this.highestData - this.lowestData;
    };
    
    this.draw = function(ctx, x, y, width, height, opacity) {
        ctx.font = '12pt Arial';
        ctx.textAlign = "center";
		ctx.fillStyle = "rgba(255,255,255," + opacity*0.5 + ")";
		ctx.fillText(this.title, x+width/2, y+25);
        
        

        
        var plotMargin = 50;
        var plotWidth = width - 2 * plotMargin;
        var plotHeight = height - 2 * plotMargin;
        
        
        // Grid
        
        ctx.strokeStyle = "rgba(255,255,255," + opacity*0.25 + ")";
		ctx.fillStyle = "rgba(255,255,255," + opacity*0.25 + ")";
		
        ctx.lineWidth = 1;
        ctx.font = '10pt Consolas';
        ctx.textAlign = "left";
        
        var gridStep = 1;
        while(height / (this.dataRange / gridStep) < 30)
            gridStep *= 10;

        var dataAtFirstLine = Math.floor(this.lowestData / gridStep) * gridStep;
        var dataAtLastLine = Math.ceil(this.highestData / gridStep) * gridStep;

        for(var i=dataAtFirstLine; i<=dataAtLastLine; i+=gridStep) {
            var linePosition = y + height - plotMargin;
            linePosition -= plotHeight * ((i - this.lowestData) / this.dataRange);
        	
        	ctx.beginPath();
            ctx.moveTo(x, linePosition);
            ctx.lineTo(x+width, linePosition);
            ctx.stroke();

            ctx.fillText(i, x, linePosition-1);
        }

        ctx.strokeStyle = "rgba(255,255,255," + opacity*0.05 + ")";
        for(var i=dataAtFirstLine; i<=dataAtLastLine; i+=gridStep/10) {
            var linePosition = y + height - plotMargin;
            linePosition -= plotHeight * ((i - this.lowestData) / this.dataRange);
        	
        	ctx.beginPath();
            ctx.moveTo(x, linePosition);
            ctx.lineTo(x+width, linePosition);
            ctx.stroke();
        }
        
        
        
        // Data Plot
        var lineWidth = 5;

        var xPositionOld;
        var yPositionOld;
        
        for(var i=0; i<this.data.length; i++) {
            var xPosition = x + plotMargin;
            xPosition += plotWidth * ((this.data[i].getTime() - this.lowestTime) / this.timeRange);
            
            var yPosition = y + height - plotMargin;
            yPosition -= plotHeight * ((this.data[i].getData() - this.lowestData) / this.dataRange);
            
            // draw a line between the points
            ctx.strokeStyle = "rgba(46,135,40, " + opacity + ")";
            ctx.lineWidth = lineWidth;
            if(i>0) {
            	ctx.beginPath();
                ctx.moveTo(xPositionOld, yPositionOld);
                ctx.lineTo(xPosition, yPosition);
                ctx.stroke();
            }
            
            xPositionOld = xPosition;
            yPositionOld = yPosition;
        }
        
        for(var i=0; i<this.data.length; i++) {
            var xPosition = x + plotMargin;
            xPosition += plotWidth * ((this.data[i].getTime() - this.lowestTime) / this.timeRange);
            
            var yPosition = y + height - plotMargin;
            yPosition -= plotHeight * ((this.data[i].getData() - this.lowestData) / this.dataRange);
            
            // draw the data points
            this.data[i].draw(ctx, xPosition, yPosition, lineWidth, opacity);
        }
    };
}













function DataPoint () {
    this.time;
    this.data;
    this.unit;
    
    this.init = function(time, data, unit) {
        this.time = time;
        this.data = data;
        this.unit = unit;
    };
    
    this.draw = function(ctx, x, y, radius, opacity) {
        ctx.fillStyle = "rgba(46,135,40," + opacity + ")";
        ctx.strokeStyle = "rgba(255,255,255," + opacity + ")";
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
        
        if(this.mouseOver(x, y, radius)) {
            ctx.font = '12pt Consolas';
            
        	// variables
            var dateEntry = new Date(this.time);
        	var dateString = dateEntry.getDate() + "." + (dateEntry.getMonth()+1) + "." + dateEntry.getFullYear() + " - " + dateEntry.getHours() + ":" + dateEntry.getMinutes() + " Uhr";
        	var dateWidth = ctx.measureText(dateString).width;
        	
        	var dataString = this.data + " " + this.unit;
        	var dataWidth = ctx.measureText(dataString).width;
        	
        	// Background Square
    		ctx.fillStyle = "rgba(0, 0, 0, " + opacity*0.2 + ")";
    		ctx.strokeStyle = "rgba(0, 0, 0, " + opacity*0.5 + ")";
    		ctx.lineWidth = 1;
    		
    		ctx.fillRect(mouse.x-Math.max(dateWidth, dataWidth)-5, mouse.y-45, Math.max(dateWidth, dataWidth)+10, 40);
    		ctx.strokeRect(mouse.x-Math.max(dateWidth, dataWidth)-5, mouse.y-45, Math.max(dateWidth, dataWidth)+10, 40);
    		
        	// Text
	        ctx.textAlign = "right";
	        
    		ctx.fillStyle = "rgba(255,255,255," + opacity + ")";
            ctx.fillText(dataString, mouse.x, mouse.y-30);
            
    		ctx.fillStyle = "rgba(255,255,255," + opacity*0.5 + ")";
            ctx.fillText(dateString, mouse.x, mouse.y-10);
        }
    };
    
    this.mouseOver = function(x, y, radius) {
        if(Math.sqrt((x-mouse.x)*(x-mouse.x) + (y-mouse.y)*(y-mouse.y)) <= radius)
        	return true;
        else
        	return false;
    };
    
    this.getData = function() {
    	return this.data;
    }
    
    this.getTime = function() {
    	return this.time;
    }
}













