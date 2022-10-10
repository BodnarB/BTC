const buyInput = document.querySelector('.buy-js')
const sellInput = document.querySelector('.sell-js')
const usdBalanceHTML = document.querySelector('.usd-balance')
const btcBalanceHTML = document.querySelector('.btc-balance')
const tradesHistory = document.querySelector('.trades-history')
let btcPrice
let btcHistory = []
let timestamps = []
let myTrades = []
let time
let currentTime
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
            time = new Date()
            currentTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
            myTrades.push({ 'price': btcPrice, 'btc': buyInput.value, 'time': currentTime, 'event': 'purchased', 'icon': 'left' })
            renderTrades()
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

            time = new Date()
            currentTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
            myTrades.push({ 'price': btcPrice, 'btc': sellInput.value, 'time': currentTime, 'event': 'sold', 'icon': 'right' })
            renderTrades()
            sellInput.value = 0
        }
        else {
            document.querySelector('.info').classList.toggle('hide')
            sellInput.value = 0
            setTimeout(function () { document.querySelector('.info').classList.toggle('hide') }, 1700)
        }
    })
}

function renderTrades() {
    tradesHistory.innerHTML = ``
    for (let trade of myTrades) {
        tradesHistory.innerHTML += `
        <div class="trades-items">          
        <p>${trade.price}</p><img class="buy-icon" src="./assets/arrow-${trade.icon}-short.svg" alt=""> <p class="buy-icon-info">BTC ${trade.event}</p> 
        <p>${trade.btc}</p> 
        </div>`
    }
}

function btc() {
    if (timestamps.length === 11) {
        timestamps.shift()
        btcHistory.shift()
    }
    btcPrice = Math.floor(Math.random() * 100) + 20000
    btcHistory.push(btcPrice)
    time = new Date()
    currentTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
    timestamps.push(currentTime)
    document.querySelector('.data-div').innerText = `BTC current price: ${new Intl.NumberFormat().format(btcPrice)} $`
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
    document.querySelector('.api-data').innerHTML += `<p class="data-info">24h Low - ${result[0].low_24h} USD</p><p class="data-info">24h High - ${result[0].high_24h} USD</p>`
}

function load() {
    btc()
    exchange()
    apiBTC()
}

addEventListener('load', load)
