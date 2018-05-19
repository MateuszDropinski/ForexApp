const checkPercentage = (percentage) =>
{
    percentage = (percentage.up >= 100) ? { up: 99, down:1 } : percentage;
    percentage = (percentage.down >= 100) ? { down: 99, up:1 } : percentage;
    
    return percentage;
}

const priceAnalysis = (candles) =>
{
    candles.splice(-1,1);
    
    let close = parseFloat(candles[candles.length-1].mid.c),
        candlesSum = 0,
        highest = candles[0].mid.h,
        lowest = candles[0].mid.l;
    
    candles.map(item => {
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
        inclination = close - average;
    
    let actualDiff = ((inclination < 0) ? downDiff : upDiff)*2;    
    
    let percentage = { up:0, down:0 };
    
    percentage.up = (50 - (inclination/actualDiff)).toFixed();
    percentage.down = (100 - parseInt(percentage.up)).toFixed();
    
    return checkPercentage(percentage);
}

const tunnelAnalysis = (candles) =>
{
    let highest = [candles[0].mid.h, 0],
        lowest = [candles[0].mid.l, 0],
        startCandle, close = parseFloat(candles.pop().mid.c);
    
    let endCandle = candles[candles.length-1]
    
    const findPoint = (ya, yb, xa) =>
    {
        let x = candles.length + 1, xb = candles.length;
        return (((ya-yb)/(xa-xb))*x)+(ya-(((ya-yb)/(xa-xb))*xa));
    }
    
    candles.map((item, index) => {
        if(index < 25)
        {
            let high = item.mid.h,
            low = item.mid.l;
            
            highest = (high > highest[0]) ? [high,index] : highest;
            lowest = (low < lowest[0]) ? [low,index] : lowest;
        }        
    });
    
    let startCandleIndex = (highest[1] < lowest[1]) ? highest[1] : lowest[1];
    startCandle = candles[startCandleIndex];
    
    let average = findPoint(((startCandle.mid.h * 1) + (startCandle.mid.l * 1)) / 2, ((endCandle.mid.h * 1) + (endCandle.mid.l * 1)) / 2, startCandleIndex);
    
    let diff = (findPoint(startCandle.mid.h * 1, endCandle.mid.h * 1, startCandleIndex ) - average) / 25;
    
    let inclination = close - average;
    
    let percentage = { up:0, down:0 };
    
    percentage.up = (50 - (inclination / diff)).toFixed();
    percentage.down = (100 - parseInt(percentage.up)).toFixed();
    
    return checkPercentage(percentage);
}

const powerAnalysis = (candles) =>
{
    candles.splice(-1,1);
    
    let close = parseFloat(candles[candles.length-1].mid.c),
        hossa = new Array(), bessa = new Array(), last = false, actual;
    
    const checkDirection = (open, close) => {
        if(open > close) return "down";
        else if(close > open) return "up";
        else return false;
    }
    
    candles.map((item, index) => {
        let direction = checkDirection(item.mid.o, item.mid.c);
        if(!last && direction === "down")
            bessa.push(item.mid.o-item.mid.c);
        else if(!last && direction === "up")
            hossa.push(item.mid.c-item.mid.o);
        else if(last === "up" && direction === "up")
            hossa[hossa.length-1]+=(item.mid.c-item.mid.o);
        else if(last === "up" && direction === "down")
            bessa.push(item.mid.o-item.mid.c);
        else if(last === "down" && direction === "up")
            hossa.push(item.mid.c-item.mid.o);
        else if(last === "down" && direction === "down")
            bessa[bessa.length-1]+=(item.mid.o-item.mid.c);
        if(direction) actual = direction;
        last = direction;
    });
    
    let averageBessa = bessa.reduce((sum, x) => sum + x)/bessa.length,
        averageHossa = hossa.reduce((sum, x) => sum + x)/hossa.length,
        lastBessa = bessa[bessa.length-1],
        lastHossa = hossa[hossa.length-1],
        maxBessa = bessa.sort((a,b) => {return a-b})[bessa.length-1],
        maxHossa = hossa.sort((a,b) => {return a-b})[hossa.length-1],
        bessaDiff = (maxBessa - averageBessa) / 40,
        hossaDiff = (maxHossa - averageHossa) / 40;
    
    let percentage = { up:0, down:0 };
    
    if(actual === "up")
    {
        percentage.up = (50 - ((lastHossa - averageHossa) / hossaDiff)).toFixed();
        percentage.down = (100 - parseInt(percentage.up)).toFixed();
    }
    else
    {
        percentage.up = (50 + ((lastBessa - averageBessa) / bessaDiff)).toFixed();
        percentage.down = (100 - parseInt(percentage.up)).toFixed();
    }

    return checkPercentage(percentage);
}

export const analysisData = [
    {
        id: 0,
        name: "Cena",
        description: "Na podstawie świec jednogodzinnych OHLC z ostatnich 30 dni (nie licząc aktualnej), określane jest czy aktualna cena jest niska czy wysoka.",
        candles: {
            granularity: "H1",
            count: 721
        },
        algorithm: priceAnalysis
    },
    {
        id:1,
        name: "Tunel",
        description: "Na podstawie świec jednodniowych OHLC z ostatnich 30 dni (nie licząc aktualnej), tworzona jest funkcja liniowa określająca średnią aktualną tendencje i jej odchyły.",
        candles: {
            granularity: "D",
            count: 31
        },
        algorithm: tunnelAnalysis
    },
    {
        id:2,
        name: "Siła Hossy/Bessy",
        description: "Na podstawie świec jednogodzinnych OHLC z ostatnich 30 dni (nie licząc aktualnej), liczona jest średnia wielkość wzrostów i spadków, oraz określana szansa na dalszą kontynuacje trendu.",
        candles: {
            granularity: "H1",
            count: 721
        },
        algorithm: powerAnalysis
    }
];
