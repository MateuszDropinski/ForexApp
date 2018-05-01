"use strict";

const express = require("express"),
      bodyParser = require("body-parser"),
      WebSocket = require("faye-websocket"),
      request = require("request"),
      path = require("path"),
      app = express(),
      port = 5000,
      staticFiles = express.static,
      router = express.Router(),
      jsonParser = bodyParser.json(),
      accessToken = "e6b737dd35659db08acc8bfb45c7759c-c2856cb9ed30e7b6e27fd3635afd4637",
      accountId = "101-004-8182393-001",
      initialSnapshots = [],
      instruments = [
        "EUR_USD",
        "GBP_JPY",
        "GBP_USD",
        "USD_JPY",
        "EUR_GBP",
        "EUR_JPY"
      ],
      url = 'https://api-fxpractice.oanda.com/v3/instruments';

let pricesStreaming, ws;

function startStream(req, res) 
{
    const stream = 'https://stream-fxpractice.oanda.com',
          pricesUrl = `${stream}/v3/accounts/${accountId}/pricing/stream`,
          authHeader = {
              Authorization: `Bearer ${accessToken}`
          };

    pricesStreaming ? pricesStreaming.abort() : null;

    pricesStreaming = request({
        url: pricesUrl,
        qs: {
            instruments: instruments.join(",")
        },
        headers: authHeader
    })
    .on("response", () => res.sendStatus(200))
    .on("data", data => processChunks(data));
}

function processChunks(chunk) 
{
    const data = chunk.toString();
    
    if(ws && initialSnapshots.length > 0)   
        initialSnapshots.forEach(() =>  ws.send(initialSnapshots.pop()));
    else if(ws)
        ws.send(data);
    else 
        initialSnapshots.push(data);
}

function getCandles(req, res)
{
    console.log(req.body);
    let gettingCandles = request({
        url: `${url}/${req.body.instrument}/candles`,
        qs: {
            granularity: "H1",
            count: "10",
            price:"BA"
        },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }, function(error, response, body){
        res.status(200).send(body);
    });
}

app.use(staticFiles(path.resolve(__dirname, "../client/")));
app.use('/api', router);

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
}).on("upgrade", (req, socket, body) => {
    (WebSocket.isWebSocket(req)) ? ws = new WebSocket(req, socket, body) : null;
});

router.post("/startstream", jsonParser, startStream);
router.post("/getcandles", jsonParser, getCandles);