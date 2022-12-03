const express = require('express');
var cors = require('cors');
/////////////////////////////////////////////////////////
//2
const User_route = require('./routes/routes')


const app = express();
app.use(cors());
app.set('trust proxy', true)
// // 4 make mongo connected
// const mongoose = require('mongoose')
                 
// mongoose.connect('mongodb+srv://TEAServDBusername:TEA123456789SERV@teaserves.ib0go.mongodb.net/TEAServES?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology: true})

// // //
// //
// // /*** here oreder of middleware is important***/
// // //3 first middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// // //
// // //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////
User_route(app);




app.use((err, req, res, next)=>{
  // any error should return from response
  console.log(err.message);
  res.status(422).send({err: err.message})


})
// for index
module.exports = app;