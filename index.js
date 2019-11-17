// var app = require('express')();
var express = require('express')
var app = express()
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
const cors = require('cors')

require('./routes/socketRoutes.js')(io) //connecting socket.io from socketRoutes
require('./routes/chatAppRoutes')(app);

require('dotenv/config')

// console.log(process.env.MONGODB_URI)

const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const db = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

mongoose.connect(
  process.env.MONGODB_URI,{  
  useNewUrlParser: true,
  useUnifiedTopology: true
},()=>console.log('connected to DB')
)

mongoose.set('useFindAndModify', false)

if (process.env.NODE_ENV === 'production') {

  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 80;
  
http.listen(PORT, function(){
  console.log('listening on *:80');
});
