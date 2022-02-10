let initialData = [28,29,31];
var x = 4;
var chart;
var running = false;
var interval;
var data;

function createChart(intialData,ctx) {
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Day 1', 'Day2', 'Day 3'],
        datasets: [{
            label: 'Temperature',
            data: initialData,
            backgroundColor: 'rgba(255,0,0,1)',
            color: 'rgba(255,0,0,1)',
            borderColor: 'rgba(255,0,0,0.2)'

        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
                }
            },
        responsive: false,
        interaction: {
            intersection: false,
        }
        }
    });
    return myChart;
}

function outputData(data) {
    console.log("Data addaed!")
    console.log(data)
}

function updateChart(data) {
    newData = Math.floor((Math.random() +2)* 10);

    chart.data.labels.push("Day " + x);
    x = ++x;
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(newData);
    });
    chart.update();

}


window.addEventListener('load', function(){
    var ctx = document.getElementById('myChart').getContext('2d');
    chart = createChart(initialData,ctx);

    var addDataButton = document.getElementById("oneData");
    addDataButton.addEventListener("click", function(){updateChart("data goes here")})

    var contDataButton = document.getElementById("contData");
    contDataButton.addEventListener('click', function(){
        if (running == false) {
            running = true;
            interval = setInterval(function(){
                updateChart("data goes here")
            },100)
        }
    });

    var stopDataButton = document.getElementById('stop');
    stopDataButton.addEventListener("click", function(){
        clearInterval(interval);
        running = false;
    });

    var getDatabutton = document.getElementById("#getDataButton");
    getDataButton.addEventListener("click", () => {
        // fetch("/data")
        fetch("http://127.0.0.1:5000/data")
            .then(response => response.json())
            .then(outputData)
            .catch((error) =>  console.log(error));
    });
    }
)

// function readTextFile(file, callback) {
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function() {
//         if (rawFile.readyState === 4 && rawFile.status == "200") {
//             callback(rawFile.responseText);
//         }
//     }
//     rawFile.send(null);
// }
// function getData() {
//     readTextFile("test_data.json", function(text){
//     var data = JSON.parse(text);
//     console.log(data);
//     return data
// })
// }
