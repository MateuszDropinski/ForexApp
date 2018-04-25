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

export function getDataDone(data)
{
    return {
        type:data.type,
        payload:data
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
                    dispatch(getDataDone(JSON.parse(event.data)));
                }
                catch(e) 
                {
                    // Catching errors
                }
            };            
        })
    }
}