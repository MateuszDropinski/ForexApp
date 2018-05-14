const priceAnalysis = (candles) =>
{
    candles.splice(-1,1);
    
    let close = parseFloat(candles[candles.length-1].mid.c),
        candlesSum = 0,
        highest = candles[0].mid.h,
        lowest = candles[0].mid.l;
    
    candles.map((item, index) => {
        let { h, l } = item.mid,
            high = parseFloat(h),
            low = parseFloat(l),
            candleAverage = (high+low)/2;
        
        candlesSum += candleAverage;
        
        highest = (high > highest) ? high : highest; 
        lowest = (low < lowest) ? low : lowest; 
    });
    
    let average = candlesSum/(candles.length),
        upDiff = (highest - average) / 50,
        downDiff = (average - lowest) / 50,
        difference = close - average,
        up, down;
    
    let actualDiff = (difference < 0) ? downDiff : upDiff;    
    
    up = (50 - (difference/actualDiff)).toFixed();
    down = (100 - parseInt(up)).toFixed();
    
    if(up === 100)
    {
        down = 1;
        up = 99;
    }
    else if(down === 100)
    {
        down = 99;
        up = 1;
    }
    
    return { up, down };
}

export const analysisData = [
    {
        id: 0,
        name: "Cena",
        correctness: {
            all: "75%",
            EUR_USD: "50%",
            GBP_JPY: "50%",
            GBP_USD: "50%",
            USD_JPY: "50%",
            EUR_GBP: "50%",
            EUR_JPY: "50%"
        },
        description: "Na podstawie świec jedno godzinowych OHLC (nie licząc aktualnej) z ostatnich 30 dni określane jest czy aktualna cena jest niska czy wysoka.",
        candles: {
            granularity: "H1",
            count: "720"
        },
        algorithm: priceAnalysis
    }
];
