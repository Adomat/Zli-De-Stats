function Graph () {
    this.dataArrays = [];
    
    this.lowestTime;
    this.highestTime;
    this.lowestData;
    this.highestData;
    
    this.timeRange;
    this.dataRange;
    
    
    
    this.addData = function(data) {
    	this.dataArrays[this.dataArrays.length] = data;
    	
    	this.resizeGraph();
    };
    
    
    this.removeData = function(key) {
    	for(var i=0; i<this.dataArrays.length; i++) {
    		if(this.dataArrays[i].getKey() === key) {
    			this.dataArrays.splice(i, 1);
    			
    			break;
    		}
    	}
    	
    	this.resizeGraph();
    };
    
    this.resizeGraph = function() {
    	if(this.dataArrays.length === 0)
    		return;
    	
    	this.lowestTime = this.dataArrays[0].getData()[0].getTime();
        this.highestTime = this.dataArrays[0].getData()[0].getTime();
        
        this.lowestData = this.dataArrays[0].getData()[0].getData();
        this.highestData = this.dataArrays[0].getData()[0].getData();
        
        for(var j=0; j<this.dataArrays.length; j++) {
        	for(var i=0; i<this.dataArrays[j].getData().length; i++) {
        		var inspectedTime = this.dataArrays[j].getData()[i].getTime();
        		var inspectedData = this.dataArrays[j].getData()[i].getData();
        		
                if(inspectedTime < this.lowestTime)
                    this.lowestTime = inspectedTime;
                if(inspectedTime > this.highestTime)
                    this.highestTime = inspectedTime;
                
                if(inspectedData < this.lowestData)
                    this.lowestData = inspectedData;
                if(inspectedData > this.highestData)
                    this.highestData = inspectedData;
                
            }
        }
        
        if(this.lowestData - this.highestData === 0) {
        	this.lowestData -= 1;
        	this.highestData += 1;
        }
        
        this.timeRange = this.highestTime - this.lowestTime;
        this.dataRange = this.highestData - this.lowestData;
    };
    
    
    
    
    
    
    this.draw = function(ctx, x, y, width, height, opacity) {
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

        /*ctx.strokeStyle = "rgba(255,255,255," + opacity*0.05 + ")";
        for(var i=dataAtFirstLine; i<=dataAtLastLine; i+=gridStep/10) {
            var linePosition = y + height - plotMargin;
            linePosition -= plotHeight * ((i - this.lowestData) / this.dataRange);
        	
        	ctx.beginPath();
            ctx.moveTo(x, linePosition);
            ctx.lineTo(x+width, linePosition);
            ctx.stroke();
        }*/
        
        
        
        // Data Plot
        var lineWidth = 5;

        var xPositionOld;
        var yPositionOld;
        
        
        for(var a=0; a<this.dataArrays.length; a++) {
        	for(var i=0; i<this.dataArrays[a].getData().length; i++) {
                // draw a line between the points
                var xPosition = x + plotMargin;
                xPosition += plotWidth * ((this.dataArrays[a].getData()[i].getTime() - this.lowestTime) / this.timeRange);
                
                var yPosition = y + height - plotMargin;
                yPosition -= plotHeight * ((this.dataArrays[a].getData()[i].getData() - this.lowestData) / this.dataRange);
                
                ctx.strokeStyle = "rgba("+this.dataArrays[a].getColor()+", " + opacity + ")";
                ctx.lineWidth = lineWidth;
                if(i>0) {
                	ctx.beginPath();
                    ctx.moveTo(xPositionOld, yPositionOld);
                    ctx.lineTo(xPosition, yPosition);
                    ctx.stroke();
                }
                
                xPositionOld = xPosition;
                yPositionOld = yPosition;
                

                // draw the data points
                var xPosition = x + plotMargin;
                xPosition += plotWidth * ((this.dataArrays[a].getData()[i].getTime() - this.lowestTime) / this.timeRange);
                
                var yPosition = y + height - plotMargin;
                yPosition -= plotHeight * ((this.dataArrays[a].getData()[i].getData() - this.lowestData) / this.dataRange);
                
                this.dataArrays[a].getData()[i].draw(ctx, xPosition, yPosition, lineWidth/2, this.dataArrays[a].getColor(), opacity, this.dataArrays[a].getUnit());
            }
        }
    };
}









function DataArray () {
    this.array = [];
    this.key = "";
    this.color = "255,255,255";
    this.unit = "";
    
    this.init = function(key, color, unit) {
    	this.key = key;
    	this.color = color;
        this.unit = unit;
    };
    
    this.addData = function(dataPoint) {
    	this.array[this.array.length] = dataPoint;
    };
    
    this.getData = function(dataPoint) {
    	return this.array;
    };
    
    this.getKey = function() {
    	return this.key;
    };
    
    this.getUnit = function() {
    	return this.unit;
    };
    
    this.getColor = function() {
    	return this.color;
    };
}



function DataPoint () {
    this.time;
    this.data;
    
    this.init = function(time, data) {
        this.time = time;
        this.data = data;
    };
    
    this.draw = function(ctx, x, y, radius, color, opacity, unit) {
        ctx.fillStyle = "rgba("+color+"," + opacity + ")";
//        ctx.strokeStyle = "rgba(255,255,255," + opacity + ")";
//        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2*Math.PI);
        ctx.fill();
//        ctx.stroke();
        
        if(this.mouseOver(x, y, radius)) {
            ctx.font = '12pt Consolas';
            
        	// variables
        	var dateString = millisToDate(this.time);
        	var dateWidth = ctx.measureText(dateString).width;
        	
        	var dataString = this.data + " " + unit;
        	var dataWidth = ctx.measureText(dataString).width;
        	
        	// Background Square
    		ctx.fillStyle = "rgba(0, 0, 0, " + opacity*0.2 + ")";
    		ctx.strokeStyle = "rgba(0, 0, 0, " + opacity*0.5 + ")";
    		ctx.lineWidth = 1;
    		
    		ctx.fillRect(mouse.x-Math.max(dateWidth, dataWidth)-15, mouse.y-45, Math.max(dateWidth, dataWidth)+10, 40);
    		ctx.strokeRect(mouse.x-Math.max(dateWidth, dataWidth)-15, mouse.y-45, Math.max(dateWidth, dataWidth)+10, 40);
    		
        	// Text
	        ctx.textAlign = "left";
	        
    		ctx.fillStyle = "rgba(255,255,255," + opacity + ")";
            ctx.fillText(dataString, mouse.x-10-Math.max(dateWidth, dataWidth), mouse.y-30);
            
    		ctx.fillStyle = "rgba(255,255,255," + opacity*0.5 + ")";
            ctx.fillText(dateString, mouse.x-10-Math.max(dateWidth, dataWidth), mouse.y-10);
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













