const dataHTML = document.querySelector('.data-div')
const dataBtn = document.querySelector('.data-btn')
const buyBtn = document.querySelector('.buy-btn')
const sellBtn = document.querySelector('.sell-btn')
const buy = document.querySelector('.buy-js')
const sell = document.querySelector('.sell-js')
const usdOwned = document.querySelector('.usd-balance')
const btcOwned = document.querySelector('.btc-balance')
const buyMaxBtn = document.querySelector('.buy-max')
const sellMaxBtn = document.querySelector('.sell-max')
let btcPrice
let btcDisplay
let btcHistory = []
let timestamps = []
let sortedY = btcHistory.slice().sort((a, b) => a - b)

function exchange() {
    let usdBalance = Math.floor((usdOwned.innerText) * 100000) / 100000
    let btcBalance = Math.floor((btcOwned.innerText) * 100000) / 100000
    if (btcBalance <= 0) {
        sell.disabled = true
    }
    if (btcBalance > 0) {
        sell.disabled = false
    }
    if (usdBalance <= 1) {
        buy.disabled = true
    }
    if (usdBalance > 1) {
        buy.disabled = false
    }
    buyMaxBtn.addEventListener('click', () => {
        buy.value = Math.floor((usdBalance / btcPrice) * 100000) / 100000
    })
    buyBtn.addEventListener('click', () => {
        if (buy.value > (usdBalance / btcPrice).toFixed(5)) {
            document.querySelector('.info').classList.toggle('hide')
            buy.value = 0
            setTimeout(function () { document.querySelector('.info').classList.toggle('hide') }, 1600)
        }
        btcOwned.innerText = buy.value
        usdOwned.innerText = (usdBalance - Math.floor((buy.value * btcPrice) * 100000) / 100000).toFixed(3)
        buy.value = 0
        exchange()
    })
    sellMaxBtn.addEventListener('click', () => {
        sell.value = btcBalance

    })
    sellBtn.addEventListener('click', () => {
        btcBalance = Math.floor((btcOwned.innerText) * 100000) / 100000
        console.log(sell.value, btcBalance)
        if (sell.value > btcBalance) {
            document.querySelector('.info').classList.toggle('hide')
            buy.value = 0
            setTimeout(function () { document.querySelector('.info').classList.toggle('hide') }, 1600)
        }
        btcOwned.innerText = btcBalance - sell.value
    })

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
    setTimeout(btc, 10000)
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

