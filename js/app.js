const buyInput = document.querySelector('.buy-js')
const sellInput = document.querySelector('.sell-js')
const usdBalanceHTML = document.querySelector('.usd-balance')
const btcBalanceHTML = document.querySelector('.btc-balance')
const tradesHistory = document.querySelector('.trades-history')
let btcPrice
let btcDisplay
let low24
let high24
let btcHistory = []
let timestamps = []
let sortedY = btcHistory.slice().sort((a, b) => a - b)
let usdBalanceNUM = parseFloat(document.querySelector('.usd-balance').innerText)
let btcBalanceNUM = parseFloat(document.querySelector('.btc-balance').innerText)

function exchange() {
    document.querySelector('.buy-max').addEventListener('click', () => {
        buyInput.value = Math.floor((usdBalanceNUM / btcPrice) * 100000) / 100000
    })
    document.querySelector('.buy-btn').addEventListener('click', () => {
        if (buyInput.value <= parseFloat(usdBalanceNUM / btcPrice).toFixed(5) && buyInput.value > 0) {
            usdBalanceNUM -= (buyInput.value * btcPrice).toFixed(2)
            btcBalanceNUM += parseFloat(buyInput.value)
            btcBalanceHTML.innerText = btcBalanceNUM.toFixed(5)
            usdBalanceHTML.innerText = usdBalanceNUM.toFixed(2)
            tradesHistory.innerHTML += `
            <div class="trades-items">          
            <p>${btcPrice}</p><img class="buy-icon" src="./assets/arrow-left-short.svg" alt=""> <p class="buy-icon-info">BTC purchased</p> 
            <p>${buyInput.value}</p> 
            </div>`
            buyInput.value = 0
        }
        else {
            document.querySelector('.info').classList.toggle('hide')
            buyInput.value = 0
            setTimeout(function () { document.querySelector('.info').classList.toggle('hide') }, 1700)
        }
    })
    document.querySelector('.sell-max').addEventListener('click', () => {
        sellInput.value = btcBalanceNUM.toFixed(5)
    })
    document.querySelector('.sell-btn').addEventListener('click', () => {
        if (sellInput.value <= btcBalanceNUM.toFixed(5) && sellInput.value > 0) {
            btcBalanceNUM -= parseFloat(sellInput.value)
            btcBalanceHTML.innerText = btcBalanceNUM.toFixed(5)
            usdBalanceNUM += parseFloat((sellInput.value * btcPrice).toFixed(5))
            usdBalanceHTML.innerText = usdBalanceNUM.toFixed(2)
            tradesHistory.innerHTML += `
            <div class="trades-items">          
            <p>${btcPrice}</p><img class="buy-icon" src="./assets/arrow-right-short.svg" alt="">  <p class="buy-icon-info">BTC sold</p> 
            <p>${sellInput.value}</p> 
            </div>`
            sellInput.value = 0
        }
        else {
            document.querySelector('.info').classList.toggle('hide')
            sellInput.value = 0
            setTimeout(function () { document.querySelector('.info').classList.toggle('hide') }, 1700)
        }
    })
}

function btc() {
    if (timestamps.length === 11) {
        timestamps.shift()
        btcHistory.shift()
    }
    btcPrice = Math.floor(Math.random() * 100) + 20000
    btcHistory.push(btcPrice)
    btcDisplay = new Intl.NumberFormat().format(btcPrice)
    let time = new Date()
    let currentTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
    timestamps.push(currentTime)
    document.querySelector('.data-div').innerText = `BTC current price: ${btcDisplay} $`
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

async function apiBTC() {
    let response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`)
    let result = await response.json()
    low24 = result[0].low_24h
    high24 = result[0].high_24h
    console.log(result[0])
    document.querySelector('.api-data').innerHTML += `<p class="data-info">24h Low - ${low24} USD</p><p class="data-info">24h High - ${high24} USD</p>`
}

function load() {
    btc()
    exchange()
    apiBTC()
}

addEventListener('load', load)
