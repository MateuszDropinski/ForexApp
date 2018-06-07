const checkPercentage = (percentage) =>
{
    percentage = (percentage.up >= 100) ? { up: 99, down:1 } : percentage;
    percentage = (percentage.down >= 100) ? { down: 99, up:1 } : percentage;
    
    return percentage;
}

const checkDirection = (open, close) => {
    if(open > close) return "down";
    else if(close > open) return "up";
    else return "nothing";
}

const priceAnalysis = (candles) =>
{
    candles.splice(-1,1);
    
    let close = parseFloat(candles[candles.length-1].mid.c),
        candlesSum = 0,
        highest = candles[0].mid.h,
        lowest = candles[0].mid.l;
    
    candles.forEach(item => {
        let { h, l } = item.mid,
            high = parseFloat(h),
            low = parseFloat(l),
            candleAverage = (high+low)/2;
        
        candlesSum += candleAverage;
        
        highest = (high > highest) ? high : highest; 
        lowest = (low < lowest) ? low : lowest; 
    });
    
    let average = candlesSum/(candles.length),
        upDiff = (highest - average) / 40,
        downDiff = (average - lowest) / 40,
        inclination = close - average;
    
    let actualDiff = ((inclination < 0) ? downDiff : upDiff)*2;    
    
    let percentage = { up:0, down:0 };
    
    percentage.up = parseInt(50 - (inclination/actualDiff), 10);
    percentage.down = (100 - percentage.up);
    
    return checkPercentage(percentage);
}

const tunnelAnalysis = (candles) =>
{
    let highest = [candles[0].mid.h, 0],
        lowest = [candles[0].mid.l, 0],
        startCandle, close = parseFloat(candles.pop().mid.c), startCandleIndex, highestDeflection = 0,
        endCandle = candles[candles.length - 1], percentage = { up: 0, down: 0 };
    
    const findPoint = x =>
    {
        let xa = startCandleIndex + 1, xb = candles.length, ya = (((startCandle.mid.h * 1) + (startCandle.mid.l * 1))) / 2,
            yb = ((endCandle.mid.h * 1) + (endCandle.mid.l * 1)) / 2;
        return (((ya-yb)/(xa-xb))*x)+(ya-(((ya-yb)/(xa-xb))*xa));
    }
    
    candles.forEach((item, index) => {
        if(index < 25)
        {
            let high = item.mid.h,
            low = item.mid.l;
            
            highest = (high > highest[0]) ? [high,index] : highest;
            lowest = (low < lowest[0]) ? [low,index] : lowest;
        }        
    });
    
    startCandleIndex = (highest[1] > lowest[1]) ? highest[1] : lowest[1];
    startCandle = candles[startCandleIndex];
    
    candles.forEach((item, index) => {
        if(index >= startCandleIndex)
        {
            let deflection, high = item.mid.h * 1, low = item.mid.l * 1;
            if(index < candles.length - 1 && index > startCandleIndex)
                deflection = (high - findPoint(index) > findPoint(index) - low) ? high - findPoint(index) : findPoint(index) - low;
            else
                deflection = high - ((high + low) / 2) > low - ((high + low) / 2) ? high - ((high + low) / 2) : ((high + low) / 2) - low;
            highestDeflection = highestDeflection < deflection ? deflection : highestDeflection;  
        }                                                                                                              
    });
    
    let average = findPoint(candles.length + 1);   
    let diff = highestDeflection / 10;    
    percentage.up = parseInt(50 - ((close - average) / diff), 10);
    percentage.down = (100 - percentage.up);
    
    return checkPercentage(percentage);
}

const powerAnalysis = (candles) =>
{
    candles.splice(-1,1);
    
    let hossa = [], bessa = [], last = false, actual, percentage = { up: 0, down: 0 };
    
    candles.forEach((item, index) => {
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
        if(direction !== "nothing") actual = direction;
        last = direction;
    });
    
    if(actual === "up")
    {
        let lastHossa = hossa.pop(),
            averageHossa = hossa.reduce((sum, x) => sum + x)/hossa.length,
            maxHossa = hossa.sort((a,b) => {return a-b})[hossa.length-1],
            hossaDiff = (maxHossa - averageHossa) / 25;
        
        percentage.up = parseInt(50 - ((lastHossa - averageHossa) / hossaDiff), 10);
        percentage.down = (100 - percentage.up);
        
    }
    else
    {
        let lastBessa = bessa.pop(),
            averageBessa = bessa.reduce((sum, x) => sum + x)/bessa.length,
            maxBessa = bessa.sort((a,b) => {return a-b})[bessa.length-1],
            bessaDiff = (maxBessa - averageBessa) / 25;
        
        percentage.up = parseInt(50 + ((lastBessa - averageBessa) / bessaDiff), 10);
        percentage.down = (100 - percentage.up);
    }

    return checkPercentage(percentage);
}

const hoursAnalysis = (candles) =>
{
    candles.splice(-1,1);
    
    let closeHour = new Date(candles[candles.length-1].time).getHours(),
        movementsUp = 0, movementsAmount = 0,
        percentage = { up: 0, down: 0 };
    
    candles.forEach((item, index) => {
        let candleHour = new Date(item.time).getHours();
        if(candleHour === closeHour && candles[index+1])
        {
            let afterHourMovement = candles[index+2].mid.c - item.mid.o;
            (afterHourMovement > 0) ? movementsUp++ : null;
            movementsAmount++;
        }
    });
    
    percentage.up = parseInt((movementsUp / movementsAmount)*100, 10);
    percentage.down = 100 - percentage.up;
    
    return checkPercentage(percentage);
}

const formationAnalysis = (candles) =>
{
    candles.splice(-1, 1);
    let lastCandles = [candles[candles.length - 3], candles[candles.length - 2], candles[candles.length - 1]],
        lastFormationDirections = [
            checkDirection(lastCandles[0].mid.o,lastCandles[0].mid.c),
            checkDirection(lastCandles[1].mid.o,lastCandles[1].mid.c),
            checkDirection(lastCandles[2].mid.o,lastCandles[2].mid.c)
        ],
        closest = [],
        lowestNumber = candles[0].mid.h.split('.')[1].length;
    
    const countDifference = (x,y) => {
        let result = Math.abs(x-y) === 0 ? 1/(Math.pow(10, lowestNumber)) : Math.abs(x-y);
        return result;
    }
    
    const calculateSimilarity = (candle, lastCandle) => {
        let { o, h, l, c } = candle.mid,
            { o: lo, h: lh, l: ll, c: lc } = lastCandle.mid,
            body = countDifference(o,c), high = countDifference(h,o), low = countDifference(c,l),
            lastBody = countDifference(lo,lc), lastHigh = countDifference(lh,lo), lastLow = countDifference(lc,ll),
            highBody = Math.abs((high/body) - (lastHigh/lastBody)),
            highLow = Math.abs((high/low) - (lastHigh/lastLow)),
            bodyLow = Math.abs((body/low) - (lastBody/lastLow));
        
        return highBody + highLow + bodyLow;
    };
    
    candles.forEach((item, index) => {
        if(candles[index+5] && index < candles.length - 3)
        {
            if(checkDirection(item.mid.o,item.mid.c) === lastFormationDirections[0] && 
               checkDirection(candles[index+1].mid.o, candles[index+1].mid.c) === lastFormationDirections[1] &&
               checkDirection(candles[index+2].mid.o, candles[index+2].mid.c) === lastFormationDirections[2] 
              )
            {
                closest.push([calculateSimilarity(item,lastCandles[0]) + 
                             calculateSimilarity(candles[index+1], lastCandles[1]) + 
                             calculateSimilarity(candles[index+2], lastCandles[2]),
                             candles[index+5].mid.c - candles[index+3].mid.o]);
            }
        }
    });
    
    let newClosest = closest.sort((a,b) => {return a[0]-b[0]}).slice(0,21),
        movementUp = 0, percentage = { up: 0, down: 0 };
    
    newClosest.forEach(item => {
        item[1] > 0 ? movementUp++ : null;
    });
    
    if(!newClosest.length)percentage.up = 50;
    else percentage.up = parseInt((movementUp / newClosest.length)*100,10);
    
    percentage.down = 100 - percentage.up;
    
    return checkPercentage(percentage);
}

export const analysisData = [
    {
        id: 0,
        name: "Cena",
        description: "Na podstawie świec czterogodzinnych OHLC z ostatnich 30 dni (nie licząc aktualnej), określane jest czy aktualna cena jest niska czy wysoka.",
        candles: {
            granularity: "H4",
            count: 181
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
        description: "Na podstawie świec jednogodzinnych OHLC z ostatnich 10 dni (nie licząc aktualnej), liczona jest średnia wielkość wzrostów i spadków, oraz określana szansa na dalszą kontynuacje trendu.",
        candles: {
            granularity: "H1",
            count: 241
        },
        algorithm: powerAnalysis
    },
    {
        id:3,
        name: "Godziny",
        description: "Na podstawie zachowania wykresu o określonych godzinach w ostatnich 30 dniach, obliczane jest aktualne prawdopodobieństwo konkretnego ruchu.",
        candles: {
            granularity: "H1",
            count: 721
        },
        algorithm: hoursAnalysis
    },
    {
        id:4,
        name: "Formacje",
        description: "Na podstawie podobieństwa 3 ostatnich świec z innymi takimi formacjami w ostatnich 30 dniach, określane jest prawdopodobieństwo dalszego ruchu.",
        candles: {
            granularity: "H1",
            count: 721
        },
        algorithm: formationAnalysis
    }
];
