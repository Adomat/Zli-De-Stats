function Timer () {
	this.purpose;
    this.finishTime = new Date().getTime();
    this.duration = 1;
    
    this.start = function(purpose, duration) {
    	this.purpose = purpose;
    	this.duration = duration;
    	this.finishTime = new Date().getTime() + this.duration;
    };

    this.getProgressPercent = function() {
    	var millisLeft = Math.max(0, this.finishTime - new Date().getTime());
    	return 1 - millisLeft / this.duration;
    };
    
    this.getPurpose = function() {
    	return this.purpose;
    };
}



