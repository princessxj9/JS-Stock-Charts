function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}
async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

//After you have the API key, in main, write a fetch request based on twelvedata's documentation.
    let response = await fetch ('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=f72af4106c2242cf840119cf9bc08bdd')
    let mockData = await response.json()

//When you make the fetch request, pass four stock symbols: GME, MSFT, DIS, and BNTX.
    const { GME, MSFT, DIS, BNTX } = mockData;

     const stocks = [GME, MSFT, DIS, BNTX];

     stocks.forEach( stock => stock.values.reverse())

// Time Chart

 // replace ctx with the 2d context for the canvas element we queried above
     new Chart(timeChartCanvas.getContext('2d'), {
//change the type of chart from bar to line
            type: 'line',
            data: {
 //Using map, we can collect an array of the properties in each value object
                labels: stocks[0].values.map(value => value.datetime),
                datasets: stocks.map( stock => ({
 // each line represents one stock use the stock's symbol
                    label: stock.meta.symbol,
//convert it from a string into a number using parseFloat
                    data: stock.values.map(value => parseFloat(value.high)),
//define a separate function so each stock can be represented by a different color; convert a stock symbol into a color
                    backgroundColor: getColor(stock.meta.symbol),
                    borderColor: getColor(stock.meta.symbol),
                }))
            }
        });      
}

main()
