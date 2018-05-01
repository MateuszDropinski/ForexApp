const priceAnalysis = (candles) =>
{
    console.log("cena");
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
        description: "Na podstawie świec jedno dniowych OHLC z ostatnio 30 dni określane jest czy aktualna cena jest niska czy wysoka.",
        candles: {
            granularity: "D1",
            count: "30",
            price: "BA"
        },
        algorithm: priceAnalysis
    }
];
