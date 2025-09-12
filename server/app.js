var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const sequelize = require('./config/db'); // importar la conexión a la bd

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tablerosRouter = require('./routes/tablero');

var app = express();

// autenticar la conexión
sequelize.authenticate() 
.then(() => {
  console.log('Conexión a la base de datos establecida correctamente.');
})
.catch(err => {
  console.error('No se pudo conectar a la base de datos:', err);
});

// sincronizar los modelos con la base de datos
sequelize.sync({alter: true})
.then(() => {
  console.log('Todas las tablas fueron sincronizadas correctamente.');
})
.catch(err => {
  console.error('Error al sincronizar las tablas:', err);
});

// Configurar CORS para aceptar solicitudes desde el frontend
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/tableros', tablerosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
