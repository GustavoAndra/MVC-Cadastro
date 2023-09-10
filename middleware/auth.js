// Middleware de autenticação
async function isAuthenticated(req, res, next){
    // Verifique se o usuário está autenticado
    if (req.session.user){
      // O usuário está autenticado, continue com a próxima etapa
      next();
    } else {
      // O usuário não está autenticado
      res.redirect('/user'); 
    }
  }
  
  module.exports = isAuthenticated;