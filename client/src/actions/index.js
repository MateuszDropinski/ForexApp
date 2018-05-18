/*

        
        fetch("/api/getcandles", {
            method: "post",
            body: JSON.stringify({
                instrument: "EUR_USD"
            }),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(data => console.log(data));
*/
export const PRICE = "PRICE";
export const CHART = "CHART";
export const ERROR = "ERROR";
export const ANALYSIS = "ANALYSIS";

export function sendData(data)
{   
    return {
        type:data.type,
        payload:data.data
    }
}

export function startStream()
{
    return dispatch =>
    {
        fetch("/api/startstream", {
            method: "post"
        }).then(res => {            
            const ws = new WebSocket("ws://localhost:5000/stream");
            
            ws.onmessage = event => {
                try
                {
                    const parsedData = JSON.parse(event.data);
                    const { closeoutBid, closeoutAsk, type, instrument } = parsedData
                    dispatch(sendData({type, data: { closeoutBid, closeoutAsk, instrument }}));
                }
                catch(e) 
                {
                    // Catching errors
                }
            };            
        })
    }
}

export function getChart(instrument)
{
    return dispatch =>
    {
        fetch("/api/getcandles", {
            method: "post",
            body: JSON.stringify({
                instrument,
                granularity: "D",
                count: "31"
            }),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(data => {
            data.errorMessage ? dispatch(sendData({type: ERROR, data: data})) : dispatch(sendData({type: CHART, data: {...data, instrument}}));
        });
    }
}

export function getAnalysis(candles, currency, algorithm, id)
{
    candles.instrument = currency;
    
    return dispatch =>
    {
        fetch("/api/getcandles", {
            method: "post",
            body: JSON.stringify(candles),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(data => {data.candles.splice(-1,1); dispatch(sendData({type: ANALYSIS, data: { result: algorithm(data.candles), id, currency}}))});
    }
}