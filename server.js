const app = require('./app');
app.use (function (req, res, next) {
    next();
});

let port = process.env.PORT || 3000;

app.listen(port);
console.log("Iniciado o servidor na porta " + port);