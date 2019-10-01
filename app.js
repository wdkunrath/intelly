const {app, express} = require('./config/server');
const http = require('http');
const moment = require('moment');
const numeral = require('numeral');
const q = require( 'jquery' );
const dt = require = require('datatables.net')();

app.use(express.static(__dirname + '/app/public'));

app.get('/', function(req,res){
    res.render('pages/index');
});

app.post('/', function(req,res){
    http.get('http://api.myjson.com/bins/w67vh', (resp) => {
      let data = '';
       
      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        res.render('pages/result', 
        {
          info: JSON.parse(data)['encomendas'],
          moment: moment,
          numeral: numeral
        });      
      });

    }).on("error", (err) => {
      res.render('pages/index');
    });
});

app.listen(3000);
