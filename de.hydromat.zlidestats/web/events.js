$(function(){
    $('div.header').click(function(event) {
        infoDiv = event.currentTarget.nextElementSibling;
        icon = event.currentTarget.children[1];
        
        if(infoDiv.style.display == 'block') {
            // Close Block
            infoDiv.style.display = 'none';
            icon.style.transform = 'scaleY(1)';
        }
        else {
            // Open Block
            infoDiv.style.display = 'block';
            icon.style.transform = 'scaleY(-1)';
        }
    });
    
    $('div.header').mouseover(function(event) {
        expandImg = event.currentTarget.children[1];
        
        expandImg.style.opacity = 1;
    });
    
    $('div.header').mouseleave(function(event) {
        expandImg = event.currentTarget.children[1];
        
        expandImg.style.opacity = 0.25;
    });
});