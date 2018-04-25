import React, { Component } from 'react';

class App extends Component {
    constructor()
    {
        super();
        
        this.state = {}
    }
    
    componentDidMount()
    {
        fetch("/api/startstream", {
            method: "post"
        }).then(res => {            
            const ws = new WebSocket("ws://localhost:5000/stream");
            
            ws.onmessage = event => {
                try
                {
                    console.log(typeof event.data);
                    let data = JSON.parse(event.data);
                }
                catch(e) 
                {
                    // Catching errors
                }
            };            
        })
        
        fetch("/api/getcandles", {
            method: "post",
            body: JSON.stringify({
                instrument: "EUR_USD"
            }),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }
    
    render() {
        return (
            <div>
                 
            </div>
        );
    }
}

export default App;
