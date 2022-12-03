const controller  = require('../controllers/controller');
// const middleware= require('./middleware');
module.exports = (app) =>{
  app.get('/ip/geo/location',
  controller.get);
  app.get('/api/ping',
  controller.ping);
  app.post('/api/sendmail',
  controller.SendMail);
  app.post('/api/traffic/record',
  controller.RecordTraficToMail);
  
}
