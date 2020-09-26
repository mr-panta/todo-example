const http = require('http');
const querystring = require('querystring');

const port = 8080;

let getTime = (req, res, query) => {
    const data = {
        time: Date.now(),
    };
    data.output = query.input * 2;
    res.write(JSON.stringify(data));
    res.end();
};

let httpHandler = (req, res) => {
    // Prepare
    const params = req.url.split('?');
    let urlObj = null;
    if (params.length > 1) {
        urlObj = querystring.parse(params[1]);
    }
    // Routing
    if (req.method === "GET" && params[0] === "/get-time") {
        getTime(req, res, urlObj);
    } else {
        res.write("not found");
        res.end();
    }
};

http.createServer(httpHandler).listen(port);
