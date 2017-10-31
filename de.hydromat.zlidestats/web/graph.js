function getIntersect(p1x, p1y, p2x, p2y, x) {
	var dx = p2x - p1x;
	var dy = p2y - p1y;
	
	return ((dy / dx) * x + p1y - (dy / dx) * p1x);
};



function Graph () {
    this.dataArrays = [];
    
    this.lowestTime;
    this.highestTime;
    this.lowestData;
    this.highestData;
    
    this.timeRange;
    this.dataRange;
    
    this.lastCoordinate;
    this.currentGraphWidth;
    
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
    
    this.reset = function() {
    	this.dataArrays.length = 0;
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
    
    this.scroll = function(offSet) {
        this.lowestTime += (offSet / this.currentGraphWidth) * this.timeRange;
        this.highestTime += (offSet / this.currentGraphWidth) * this.timeRange;
    }
    
    this.zoom = function(zoom) {
        this.lowestTime += zoom * this.timeRange;
        this.highestTime -= zoom * this.timeRange;
        this.timeRange = this.highestTime - this.lowestTime;
    }
    
    
    
    
    
    
    this.draw = function(ctx, x, y, graphWidth, graphHeight, opacity) {
    	var plotMargin = 0;
        var plotWidth = graphWidth - 2 * plotMargin;
        var plotHeight = graphHeight - 2 * plotMargin;
        this.currentGraphWidth = plotWidth;
        
        
        // Grid
        ctx.strokeStyle = "rgba(255,255,255," + opacity*0.25 + ")";
        ctx.fillStyle = "rgba(255,255,255," + opacity*0.25 + ")";
        ctx.lineWidth = 1;
        ctx.textAlign = "left";
        
        var gridStep = 1;
        while(graphHeight / (this.dataRange / gridStep) < 30)
            gridStep *= 10;

        var dataAtFirstLine = Math.floor(this.lowestData / gridStep) * gridStep;
        var dataAtLastLine = Math.ceil(this.highestData / gridStep) * gridStep;

        for(var i=dataAtFirstLine; i<=dataAtLastLine; i+=gridStep) {
            var linePosition = y + graphHeight - plotMargin;
            linePosition -= plotHeight * ((i - this.lowestData) / this.dataRange);
        	
        	ctx.beginPath();
            ctx.moveTo(x, linePosition);
            ctx.lineTo(x+graphWidth, linePosition);
            ctx.stroke();

            ctx.fillText(i, x+5, linePosition-1);
        }

        ctx.strokeStyle = "rgba(255,255,255," + opacity*1 + ")";
        ctx.lineWidth = 2;
        if(mouse.x >= x && mouse.x < x+graphWidth) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, 0);
            ctx.lineTo(mouse.x, height);
            ctx.stroke();
        }
        
        // Data Plot
        var yDataPixel = 80;
        
        for(var a=0; a<this.dataArrays.length; a++) {
        	var xPositions = [];
        	var yPositions = [];

            // Calculate points for the plot
        	for(var i=0; i<this.dataArrays[a].getData().length; i++) {
                // draw a line between the points
                var xPosition = x + plotMargin;
                xPosition += plotWidth * ((this.dataArrays[a].getData()[i].getTime() - this.lowestTime) / this.timeRange);
                
                var yPosition = y + graphHeight - plotMargin;
                yPosition -= plotHeight * ((this.dataArrays[a].getData()[i].getData() - this.lowestData) / this.dataRange);

                xPositions[xPositions.length] = xPosition;
                yPositions[yPositions.length] = yPosition;
            }

	        // draw the plot
	        var xPositionOld;
	        var yPositionOld;

            ctx.strokeStyle = "rgba("+this.dataArrays[a].getColor()+", " + opacity + ")";
            ctx.lineWidth = 5;
        	ctx.beginPath();
	        for(var i=0; i<xPositions.length; i++) {
	        	var xPlotPosition = 0;
	        	var yPlotPosition = 0;
	        	
	        	if(xPositions[i] < x && xPositions[i+1] >= x) {
	            	xPlotPosition = x;
	            	yPlotPosition = getIntersect(xPositions[i], yPositions[i], xPositions[i+1], yPositions[i+1], x);
	            } else if(xPositions[i] > x+plotWidth && xPositions[i-1] <= x+plotWidth) {
	            	xPlotPosition = x+plotWidth;
	            	yPlotPosition = getIntersect(xPositions[i-1], yPositions[i-1], xPositions[i], yPositions[i], x+plotWidth);
	            } else if(xPositions[i] >= x && xPositions[i] <= x+plotWidth) {
	            	xPlotPosition = xPositions[i];
	            	yPlotPosition = yPositions[i];
	        	} else {
	            	continue;
	            }
	            
	            if(i == 0) {
	            	ctx.moveTo(xPlotPosition, yPlotPosition);
	            } else {
		            ctx.lineTo(xPlotPosition, yPlotPosition);
	            }
	            
	            xPositionOld = xPositions[i];
	            yPositionOld = yPositions[i];
	        }
            ctx.stroke();
	
	        // draw the white circle near mouse
	        var xPositionOld = 0;
	        var yPositionOld = 0;
	        if(mouse.x >= xPositions[0] && mouse.x <= xPositions[xPositions.length-1]) {
		        for(var i=0; i<xPositions.length; i++) {
		        	if(a === this.dataArrays.length-1 && mouse.x <= xPositions[i] && mouse.x >= xPositionOld && mouse.x >= x) {
			        	this.lastCoordinate = getIntersect(xPositions[i], yPositions[i], xPositionOld, yPositionOld, mouse.x);
		
		                ctx.strokeStyle = "rgba(255,255,255, " + opacity + ")";
		                ctx.lineWidth = 3;
		        		ctx.beginPath();
		            	ctx.arc(mouse.x, this.lastCoordinate, 7, 0, 2*Math.PI);
		            	ctx.stroke();
		        	}
		            
		            xPositionOld = xPositions[i];
		            yPositionOld = yPositions[i];
		        }
	        }
        }
        
        // draw the info frame
        if(this.dataArrays.length > 0 && mouse.x >= xPositions[0] && mouse.x <= xPositions[xPositions.length-1]) { // mouse.x >= x && mouse.x <= x+graphWidth) {
        	var xPosition = mouse.x;
        	
        	var time = (xPosition - x - plotMargin) * (this.timeRange / plotWidth) + this.lowestTime;
        	var data = (this.lastCoordinate - y - graphHeight + plotMargin) * ((-1) * this.dataRange / plotHeight) + this.lowestData;
        	data = Math.round(data);
      
    		ctx.font = '12pt Consolas';
  
    		// variables
    		var titleString = this.dataArrays[this.dataArrays.length-1].getKey();
    		var titleWidth = ctx.measureText(titleString).width;
    		
    		var dateString = millisToDate(time);
    		var dateWidth = ctx.measureText(dateString).width;

    		var dataString = data + " " + this.dataArrays[this.dataArrays.length-1].getUnit();
    		var dataWidth = ctx.measureText(dataString).width;

    		// Background Square
    		ctx.fillStyle = "rgba(16, 17, 18, " + opacity*0.75 + ")";
    		ctx.strokeStyle = "rgba(0, 0, 0, " + opacity*0.5 + ")";
    		ctx.lineWidth = 1;
    		
    		var yOffSet = 0;
    		if(this.lastCoordinate < 70) {
    			yOffSet = 70-this.lastCoordinate;
    		}
    		var xOffSet = -Math.max(dateWidth, dataWidth)-15;
    		if(xPosition < x + Math.max(dateWidth, dataWidth, titleWidth)+20) {
    			var poi = xPosition - x;
    			var limit = Math.max(dateWidth, dataWidth);
    			xOffSet += (1 -  poi / limit) * Math.max(dateWidth, dataWidth, titleWidth)+20;
    		}

    		ctx.fillRect(xPosition+xOffSet, this.lastCoordinate-65+yOffSet, Math.max(dateWidth, dataWidth, titleWidth)+10, 60);
    		ctx.strokeRect(xPosition+xOffSet, this.lastCoordinate-65+yOffSet, Math.max(dateWidth, dataWidth, titleWidth)+10, 60);

    		// Text
    		ctx.textAlign = "left";
    		
    		ctx.fillStyle = "rgba(255,255,255," + opacity*0.75 + ")";
    		ctx.fillText(titleString, xPosition+xOffSet+5, this.lastCoordinate+yOffSet-50);
    		
    		ctx.fillStyle = "rgba(255,255,255," + opacity + ")";
    		ctx.fillText(dataString, xPosition+xOffSet+5, this.lastCoordinate+yOffSet-30);
  
    		
    		ctx.fillStyle = "rgba(" + this.dataArrays[this.dataArrays.length-1].getColor() + "," + opacity*1 + ")";
    		ctx.fillText(dateString, xPosition+xOffSet+5, this.lastCoordinate+yOffSet-10);
        }
    };
}









function DataArray () {
    this.array = [];
    this.key = "";
    this.color = "255,255,255";
    this.unit = "Einheiten";
    
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
    
    this.getColor = function() {
    	return this.color;
    };
    
    this.getUnit = function() {
    	return this.unit;
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













