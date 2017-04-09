const http = require('http');
const querystring = require('querystring');
const url = require('url');
const port = 3000;

const apiUrl = 'netology.tomilomark.ru';

function apiRequestHandler(res, clientResponse, clientData) {
  let apiData = '';

  res.on('data', chunk => apiData += chunk);
  res.on('end', () => {
    let parsedData = parse(apiData, res.headers['content-type']);
    clientResponse.writeHead(200, 'OK', {'Content-Type' : 'application/json', 'Content-Length' : Buffer.byteLength(apiData)});
    clientResponse.write(apiData);
    clientResponse.end();

    console.log(apiData);
  });
}

function sendRequestToApi(clientResponse, dataToSend) {
  const content = JSON.stringify({'lastname': dataToSend.lastname});
  const requestData = {
    host: apiUrl,
    method: 'post',
    path: '/api/v1/hash',
    headers: {
      'Content-Type': 'application/json',
      'Firstname': dataToSend.firstname,
      'Content-Length': Buffer.byteLength(content)
    }
  }
  const request = http.request(requestData);
  request.on('error', err => console.error(err));
  request.on('response', (res) => apiRequestHandler(res, clientResponse, dataToSend));
  request.write(content);
  request.end();

  console.log(JSON.stringify({lastname: dataToSend.lastname}));
}

function parse(data, type) {
  if (type.indexOf('application/json') != -1) {
      return JSON.parse(data);
  } else if (type.indexOf('application/x-www-form-urlencoded') != -1) {
      let parameters = url.parse(data);
      return querystring.parse(parameters.query);
  }
}

function clientRequestHandler(req, res) {
  let data = '';

  req.on('data', chunk => data += chunk);
  req.on('end', () => {
    let parsedData = parse(data || req.url, req.headers['content-type']);
    sendRequestToApi(res, parsedData);
  });
}

const server = http.createServer();
server.on('error', err => console.log(err));
server.on('request', clientRequestHandler);
server.on('listening', () => {
  console.log(`start http server on port ${port}`);
});
server.listen(port);