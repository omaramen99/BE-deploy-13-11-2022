const { Mongoose } = require('mongoose');
const  mongoose  = require('mongoose');
const nodemailer = require('nodemailer');
var geoip = require('geoip-lite');
//contain all business logic
module.exports = {
  get(req, res, next)
  {
    var ip = "196.221.183.203";
    var geo = geoip.lookup(req.ip);
    
    //console.log(geo);
    res.status(200).send({

      ip:req.ip,
      ipDetails:geo
    })
  },
  ping(req, res, next)
  {
    res.status(200).send('pinged')
  },
  SendMail(req, res, next){
    var ip = req.ip;
    //var ip = "196.221.183.203";
    var geo = geoip.lookup(ip);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'omaramen9575@gmail.com',
        pass: 'icbejpadmqjwmbvg'
      }
    });
    var generalMailOptions = {
      from: 'omaramen9575@gmail.com',
      to: 'contact@omaramen.com',
      subject: 'Mails From My Website',
      html: `<div style="display:inline-block;border: 1px solid black;border-radius: 10px;padding: 10px; width: 400px;"><h3><span style="color:rgb(122, 122, 122);">Name: </span><span>${req.query.name}</span></h3><hr><h3><span style="color:rgb(122, 122, 122);">Mail: </span><a href="mailto:${req.query.mail}" target="_blank">${req.query.mail}</a></h3><hr><h3><span style="color:rgb(122, 122, 122);">Subject: </span><span>${req.query.subject}</span></h3><hr><h3><span style="color:rgb(122, 122, 122);">Message: </span><br><br><span>${req.query.message}</span></h3><hr><h6><span>IP: </span><a href="https://tools.keycdn.com/geo?host=${ip}">${ip}</a> | <span>Country: </span><span>${geo.country}</span> | <span>Time zone: </span><span>${geo.timezone}</span></h6></div>`
    };
    var mailOptions = {
      from: 'omaramen9575@gmail.com',
      to: 'contact@omaramen.com',
      subject: req.query.subject,
      html: `<div style="display:inline-block;border: 1px solid black;border-radius: 10px;padding: 10px; width: 400px;"><h3><span style="color:rgb(122, 122, 122);">Name: </span><span>${req.query.name}</span></h3><hr><h3><span style="color:rgb(122, 122, 122);">Mail: </span><a href="mailto:${req.query.mail}" target="_blank">${req.query.mail}</a></h3><hr><h3><span style="color:rgb(122, 122, 122);">Subject: </span><span>${req.query.subject}</span></h3><hr><h3><span style="color:rgb(122, 122, 122);">Message: </span><br><br><span>${req.query.message}</span></h3><hr><h6><span>IP: </span><a href="https://tools.keycdn.com/geo?host=${ip}">${ip}</a> | <span>Country: </span><span>${geo.country}</span> | <span>Time zone: </span><span>${geo.timezone}</span></h6></div>`
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        //console.log(error);
        res.status(500).send('fail')
      } else {
        transporter.sendMail(generalMailOptions, function(error, info){
          if (error) {
            //console.log(error);
            res.status(500).send('fail')
          } else {
            //console.log('Email sent: ' + info.response);
            res.status(200).send('success')
          }
        });
      }
    });
  },
  RecordTraficToMail(req, res, next)
  {
    var ip = req.ip;
    //var ip = "196.221.183.203";
    var geo = geoip.lookup(ip);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'omaramen9575@gmail.com',
        pass: 'icbejpadmqjwmbvg'
      }
    });
    var mailOptions = {
      from: 'omaramen9575@gmail.com',
      to: 'contact@omaramen.com',
      subject: "TRAFFIC",
      html: `<span>A user with IP: </span><a href="https://tools.keycdn.com/geo?host=${ip}">${ip}</a><span> entered the website</span>`
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.status(500).send('failed')
      } else {
        res.status(200).send('sent')
      }
    });

  }

};
