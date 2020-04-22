'use strict';

var express = require('express');
var cors = require('cors');

var multer  = require('multer');
var upload = multer().single('upfile');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', (req, res) => {  
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.send('A Multer error occurred when uploading.')
    } else if (err) {
      res.send('An unknown error occurred when uploading')
    }
 
    const {originalname, mimetype, size} = req.file;
  res.send({name:originalname, type:mimetype, size});
  })
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
