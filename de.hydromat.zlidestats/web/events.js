$(function(){
    $('div.header').click(function(event) {
        infoDiv = event.currentTarget.nextElementSibling;
        
        if(infoDiv.style.display == 'block')
            infoDiv.style.display = 'none';
        else
            infoDiv.style.display = 'block';
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