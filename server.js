const express = require('express');
const app = express();
const cors = require('cors');
const APIKEY = "Bearer aSuperSecretKey";
const path = require('path');
const db = require('./app/config/db.config.js');
const promisify = require('util').promisify;
const request = promisify(require('request'));
const { DownloaderHelper } = require('node-downloader-helper');

const Archivo = db.Archivo;

global.__basedir = __dirname;   
    
// settings
app.use(cors());

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
});       

let router = require('./app/routers/excel.router.js');
app.use(express.static('resources'));
app.use('/', router);   

// Lista datos de api local

let routerapi = require('./app/routers/apirouter.js');
app.use('/files', routerapi);

// Lista datos de api externa

app.get('/files/list', (req, res) => {
  const param =`?api_key=${APIKEY}`;

let options = {
  url: 'https://echo-serv.tbxnet.com/v1/secret/files' + param,
  method: 'GET',
  json: true,
  headers: {
    'secret-key': APIKEY
  }
};

request(options, function(err, r) {
  res.send(r.body);
});
});

// Filtrar archivo api externa

app.get('/files/data/:file(*)', (req, res) => {
  const param =`?api_key=${APIKEY}`;
  var file = req.params.file;
  var fileLocation = path.join('./uploads', file);

let options = {
  url: 'https://echo-serv.tbxnet.com/v1/secret/file/' + file + param,
  method: 'GET',
  json: true,
  headers: {
    'secret-key': APIKEY
  }
};

request(options, function(err, r) {
  res.send(r.body);
});
});

// Download archivos api externa

const dl = new DownloaderHelper("https://echo-serv.tbxnet.com/v1/secret/file/test1.csv?apiKey=Bearer%20aSuperSecretKey", './downloads')
const dl2 = new DownloaderHelper("https://echo-serv.tbxnet.com/v1/secret/file/test2.csv?apiKey=Bearer%20aSuperSecretKey", './downloads')
const dl3 = new DownloaderHelper("https://echo-serv.tbxnet.com/v1/secret/file/test3.csv?apiKey=Bearer%20aSuperSecretKey", './downloads')
const dl6 = new DownloaderHelper("https://echo-serv.tbxnet.com/v1/secret/file/test6.csv?apiKey=Bearer%20aSuperSecretKey", './downloads')
const dl9 = new DownloaderHelper("https://echo-serv.tbxnet.com/v1/secret/file/test9.csv?apiKey=Bearer%20aSuperSecretKey", './downloads')

dl.start()
dl2.start()
dl3.start()
dl6.start()
dl9.start()

dl.on('end', () => console.log("Archivo completado"))

// Starting Server
const server = app.listen(4000, function () { 
  console.log("App listening at http://localhost:4000"); 
})