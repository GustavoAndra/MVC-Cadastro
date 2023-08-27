const isAuthenticated = require('./midlewareController');

module.exports = {
  HomePage: [
    isAuthenticated, // Use o middleware aqui
    (req, res) => {
      res.render('HomePage', { pageTitle: 'HomePage' });
    }
  ]
};