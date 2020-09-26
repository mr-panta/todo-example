let http = require('http');

const port = 8000;

let getTime = (req, res) => {
    const data = {
        time: Date.now()
    };
    res.write(JSON.stringify(data));
    res.end();
};


let httpHandler = (req, res) => {

    if (req.method === "GET" && req.url === "/get-time") {
        getTime(req, res);
        
    } else {
        res.write("not found");
        res.end();
    }
};

http.createServer(httpHandler).listen(port);
