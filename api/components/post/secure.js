const auth = require('../../../auth');

module.exports = function checkAuth(action) {
  function middleWare(req, res, next) {
    switch(action) {
      case 'update':
        const owner = req.body.owner;
        auth.check.own(req,owner);
        next();
        break;

      default:
        next();
    }
  }

  return middleWare;
}