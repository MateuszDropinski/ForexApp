import { defaultPanel } from '../data/panel';

export const PRICE = "PRICE";
export const CHART = "CHART";
export const ERROR = "ERROR";
export const ANALYSIS = "ANALYSIS";
export const LOADING = "LOADING";
export const PANEL = "PANEL";
export const PANELINIT = "PANELINIT"

export function sendData({ type, data })
{   
    return {
        type:type,
        payload:data
    }
}

export function sendingRequest(data)
{
    return {
        type: LOADING,
        payload: data
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
        dispatch(sendingRequest({ currency, id }));
        
        fetch("/api/getcandles", {
            method: "post",
            body: JSON.stringify(candles),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(data =>  dispatch(sendData({type: ANALYSIS, data: { result: algorithm(data.candles), id, currency }})));
    }
}

export function togglePanel(currency, id)
{
    return dispatch =>
    {
        let panel = JSON.parse(window.localStorage.getItem("myForexPanel"));
        panel[currency][id] = !panel[currency][id];
        window.localStorage.setItem("myForexPanel", JSON.stringify(panel));
        
        dispatch(sendData({type: PANEL, data: { currency, id }}));
    }
}

export function panelInitiation()
{
    return dispatch =>
    {
        let panel;
        if(!window.localStorage.getItem("myForexPanel"))
        {
            window.localStorage.setItem("myForexPanel", JSON.stringify(defaultPanel));
            panel = defaultPanel;
        }
        else panel = window.localStorage.getItem("myForexPanel");
        
        dispatch(sendData({type: PANELINIT, data: JSON.parse(panel)}));
    }    
}