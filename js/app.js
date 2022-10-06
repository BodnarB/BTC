const dataHTML = document.querySelector('.data-div')
const dataBtn = document.querySelector('.data-btn')
const buy = document.querySelector('.buy-js')
const sell = document.querySelector('.sell-js')
const usd = document.querySelector('.usd-balance')
const btcOwned = document.querySelector('.btc-balance')
let btcPrice
let btcDisplay
let btcHistory = []
let timestamps = []
let sortedY = btcHistory.slice().sort((a, b) => a - b)

function exchange() {
    let usdBalance = usd.innerText.replace(/\D/g, "")
    let btcBalance = btcOwned.innerText.replace(/\D/g, "")
    if (btcBalance <= 0) {
        sell.disabled = true
    }
    if (usdBalance <= 0) {
        buy.disabled = true
    }

}

exchange()
function btc() {
    if (timestamps.length === 11) {
        timestamps.shift()
        btcHistory.shift()
    }
    btcPrice = Math.floor(Math.random() * 100) + 20000
    btcDisplay = new Intl.NumberFormat().format(btcPrice)
    btcHistory.push(btcPrice)
    let time = new Date()
    let currentTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
    timestamps.push(currentTime)
    dataHTML.innerText = `BTC current price: ${btcDisplay} $`
    chart()
    setTimeout(btc, 5000)
}






function chart() {
    var xValues = timestamps
    var yValues = btcHistory

    new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(245, 245, 245, 0.5)",
                borderColor: "rgba(245, 245, 245, 0.15)",
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            animation: {
                duration: 0
            },
            scales: {
                yAxes: [{ ticks: { min: sortedY[0], max: sortedY[sortedY.length - 1] } }],
            }
        }
    });
}

btc()

