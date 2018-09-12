// API KEY:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYzNCwiaWRlbiI6IjI0MjMyODc0OTc4NDMwMTU2OSIsIm1kIjp7fSwidHMiOjE1MzYzMTQ4MTIwMzh9.pFFAJl83K8qteAVo1L2S6qAq0RKud3YGnedd6jlmUbE

$(function(){
    handleAPIClanRequest();
    /*setupGraph('clantrophiescanvas', null, null, 'rgba(52, 117, 214, 1)');
    setupPieDiagram('top5donationscanvas', [1, 1, 1, 1, 1], ['Adomat', 'Hydrum', 'Morpheus', 'Oiisky', 'Elron']);
    setupPieDiagram('top5donationsdeltacanvas', [1, 1, 1, 1, 1], ['Adomat', 'Hydrum', 'Morpheus', 'Oiisky', 'Elron']);*/
});

function handleAPIClanRequest() {
    $.get({
        url: 'https://api.royaleapi.com/clan/2R92CURQ',
        success: handleAPIClanRequestAnswer,
        headers: { 'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYzNCwiaWRlbiI6IjI0MjMyODc0OTc4NDMwMTU2OSIsIm1kIjp7fSwidHMiOjE1MzYzMTQ4MTIwMzh9.pFFAJl83K8qteAVo1L2S6qAq0RKud3YGnedd6jlmUbE' }
    });
}

function handleAPIClanRequestAnswer(answer) {
    setupGraph('clantrophiescanvas', null, null, 'rgba(52, 117, 214, 1)');
    
    answer.members.sort(function(member1, member2){return member2.donations-member1.donations});
    var data = [];
    var labels = [];
    for(member of answer.members) {
        data.push(member.donations);
        labels.push(member.name);
    }
    setupPieDiagram('top5donationscanvas', data, labels);
    
    answer.members.sort(function(member1, member2){return member2.donationsDelta-member1.donationsDelta});
    data = [];
    labels = [];
    for(member of answer.members) {
        data.push(member.donationsDelta);
        labels.push(member.name);
    }
    setupPieDiagram('top5donationsdeltacanvas', data, labels);
}