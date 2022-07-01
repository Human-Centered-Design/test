const fs = require('fs');
const http = require('http');
const url = require('url');

//server
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);
const server = http.createServer((req, res) => {
  const pathName = req.url;

  //Overview Page
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end('<h1>Hello World!</h1>')

    //API
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application.json'
    });
    res.end(data);

    //Not Found
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
    });
    res.end('<h1>Not Found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
})
