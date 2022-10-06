const buyBtn = document.querySelector('.buy-btn')
const sellBtn = document.querySelector('.sell-btn')
const buyInput = document.querySelector('.buy-js')
const sellInput = document.querySelector('.sell-js')
const usdBalanceHTML = document.querySelector('.usd-balance')
const btcBalanceHTML = document.querySelector('.btc-balance')
const buyMaxBtn = document.querySelector('.buy-max')
const sellMaxBtn = document.querySelector('.sell-max')
let btcPrice
let btcDisplay
let btcHistory = []
let timestamps = []
let sortedY = btcHistory.slice().sort((a, b) => a - b)
let usdBalanceNUM = parseFloat(document.querySelector('.usd-balance').innerText)
let btcBalanceNUM = parseFloat(document.querySelector('.btc-balance').innerText)

function exchange() {
    buyMaxBtn.addEventListener('click', () => {
        buyInput.value = Math.floor((usdBalanceNUM / btcPrice) * 100000) / 100000
    })
    buyBtn.addEventListener('click', () => {
        if (buyInput.value > parseFloat(usdBalanceNUM / btcPrice).toFixed(5)) {
            document.querySelector('.info').classList.toggle('hide')
            buyInput.value = 0
            setTimeout(function () { document.querySelector('.info').classList.toggle('hide') }, 1600)
        }
        else {
            usdBalanceNUM -= (buyInput.value * btcPrice).toFixed(2)
            btcBalanceNUM += parseFloat(buyInput.value)
            btcBalanceHTML.innerText = btcBalanceNUM.toFixed(5)
            usdBalanceHTML.innerText = usdBalanceNUM.toFixed(2)
            buyInput.value = 0
        }
    })
    sellMaxBtn.addEventListener('click', () => {
        sellInput.value = btcBalanceNUM.toFixed(5)
    })
    sellBtn.addEventListener('click', () => {
        if (sellInput.value > btcBalanceNUM.toFixed(5)) {
            document.querySelector('.info').classList.toggle('hide')
            sellInput.value = 0
            setTimeout(function () { document.querySelector('.info').classList.toggle('hide') }, 1600)
        }
        else {
            btcBalanceNUM -= parseFloat(sellInput.value)
            btcBalanceHTML.innerText = btcBalanceNUM.toFixed(5)
            usdBalanceNUM += parseFloat((sellInput.value * btcPrice).toFixed(5))
            usdBalanceHTML.innerText = usdBalanceNUM.toFixed(2)
            sellInput.value = 0
        }
    })
}
// parseFloat(usdBalanceNUM / btcPrice).toFixed(5)
// (Math.floor((buyInput.value * btcPrice) * 100000) / 100000)
// (Math.floor((usdBalanceNUM / btcPrice) * 100000) / 100000)


exchange()

// function exchange() {
//     let usdBalance = Math.floor((usdOwned.innerText) * 100000) / 100000
//     let btcBalance = Math.floor((btcOwned.innerText) * 100000) / 100000
//     if (btcBalance <= 0) {
//         sell.disabled = true
//     }
//     if (btcBalance > 0) {
//         sell.disabled = false
//     }
//     if (usdBalance <= 1) {
//         buy.disabled = true
//     }
//     if (usdBalance > 1) {
//         buy.disabled = false
//     }
//     buyMaxBtn.addEventListener('click', () => {
//         buy.value = Math.floor((usdBalance / btcPrice) * 100000) / 100000
//     })
//     buyBtn.addEventListener('click', () => {
//         if (buy.value > (usdBalance / btcPrice).toFixed(5)) {
//             document.querySelector('.info').classList.toggle('hide')
//             buy.value = 0
//             setTimeout(function () { document.querySelector('.info').classList.toggle('hide') }, 1600)
//         }
//         btcOwned.innerText = buy.value
//         usdOwned.innerText = (usdBalance - Math.floor((buy.value * btcPrice) * 100000) / 100000).toFixed(3)
//         buy.value = 0
//         exchange()
//     })
//     sellMaxBtn.addEventListener('click', () => {
//         sell.value = btcBalance

//     })
//     sellBtn.addEventListener('click', () => {
//         btcBalance = Math.floor((btcOwned.innerText) * 100000) / 100000
//         console.log(sell.value,btcBalance)
//         if (sell.value > btcBalance) {
//             document.querySelector('.info').classList.toggle('hide')
//             buy.value = 0
//             setTimeout(function () { document.querySelector('.info').classList.toggle('hide') }, 1600)
//         }
//         btcOwned.innerText = btcBalance - sell.value
//     })
// }



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

