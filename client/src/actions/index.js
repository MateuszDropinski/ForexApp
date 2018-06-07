import { defaultPanel, defaultPositions } from '../data/panel';

export const PRICE = "PRICE";
export const CHART = "CHART";
export const ERROR = "ERROR";
export const ANALYSIS = "ANALYSIS";
export const LOADING = "LOADING";
export const PANEL = "PANEL";
export const PANELINIT = "PANELINIT";
export const POSITIONSINIT = "POSITIONSINIT";
export const ADDPOSITION = "ADDPOSITION";
export const DELETEPOSITION = "DELETEPOSITION";

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
    let panel = JSON.parse(window.localStorage.getItem("myForexPanel"));
    panel[currency][id] = !panel[currency][id];
    window.localStorage.setItem("myForexPanel", JSON.stringify(panel));
    
    return {
        type: PANEL, 
        payload: { currency, id }
    }
}

export function panelInitiation()
{
    let panel;
    if(!window.localStorage.getItem("myForexPanel"))
    {
        window.localStorage.setItem("myForexPanel", JSON.stringify(defaultPanel));
    }
    
    panel = window.localStorage.getItem("myForexPanel");
    
    return {
        type: PANELINIT, 
        payload: JSON.parse(panel)
    }
}

export function positionsInitiation()
{
    let positions;
    if(!window.localStorage.getItem("myForexPositions"))
    {
        window.localStorage.setItem("myForexPositions", JSON.stringify(defaultPositions));
    }
    
    positions = window.localStorage.getItem("myForexPositions");
    
    return {
        type: POSITIONSINIT, 
        payload: JSON.parse(positions)
    }
}

export function setPosition(instrument, direction, openValue)
{   
    let positions = JSON.parse(window.localStorage.getItem("myForexPositions"));
    positions.active.push({
        instrument,
        direction,
        openValue: openValue,
        openDate: new Date()
    });
    window.localStorage.setItem("myForexPositions", JSON.stringify(positions));
    
    return {
        type: ADDPOSITION,
        payload: {
            instrument,
            direction,
            openValue: openValue,
            openDate: new Date()
        }
    }
}

export function removePosition(id, closeValue)
{
    let positions = JSON.parse(window.localStorage.getItem("myForexPositions")),
    element = positions.active.splice(id,1)[0];
    
    element.closeDate = new Date();
    element.closeValue = closeValue;
    positions.history.unshift(element);
    window.localStorage.setItem("myForexPositions", JSON.stringify(positions));
    
    return {
        type: "DELETEPOSITION",
        payload: { id, closeValue }
    }
}