module.exports = {
    showHomePage: (req, res) => {
      res.render('home', { pageTitle: 'Home' });
    }
  };  