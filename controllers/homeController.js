module.exports = { //Função que renderiza a home.ejs
    showHomePage: (req, res) => {
      res.render('home', { pageTitle: 'home' });
    }
  };  