function setupGraph(canvasId, data, times, color) {
    ctx = document.getElementById(canvasId).getContext("2d");
    
    var dateFormat = 'MMMM DD YYYY';
    var date = moment('June 01 2018', dateFormat);
    times = [date];
    data = [randomBar(date, 3786)];
    while (data.length < 200) {
        date = date.clone().add(8, 'h');
        data.push(randomBar(date, data[data.length - 1].y));
        times.push(date);
    }
    
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: times,
            datasets: [{
                label: 'Clan Trophies',
                data: data,
                backgroundColor: color.replace('1)', '0.25)'),
                borderColor: color,
				pointRadius: 0,
                pointHoverRadius: 0,
				fill: true,
				lineTension: 0,
                type: 'line',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                xAxes: [{
                    weight: 5,
                    type: 'time',
                    distribution: 'linear',
                    ticks: {
                        source: 'auto'
                    }/*,
                    time: {
                        min: moment().set('month', moment().get('month')-2),
                        max: moment()
                    }*/
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true
                    }
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        }
    });
}

function randomBar(date, lastClose) {
    var open = randomNumber(lastClose * 0.95, lastClose * 1.05);
    var close = randomNumber(open * 0.95, open * 1.05);
    return {
        t: date.valueOf(),
        y: close
    };
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}






function setupPieDiagram(canvasId, data, labels) {
    ctx = document.getElementById(canvasId).getContext("2d");
    
    var backgroundColors = [
        'rgba(52, 117, 214, 1)',
        'rgba(84, 136, 214, 1)',
        'rgba(116, 155, 214, 1)',
        'rgba(150, 176, 214, 1)',
        'rgba(182, 195, 214, 1)'
    ];
    while (backgroundColors.length < data.length) {
        backgroundColors.push('rgba(214, 214, 214, 1)');
    }
    
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                label: 'Dataset 1'
            }],
            labels: labels
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: false
            },
            title: {
                display: false
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}
















