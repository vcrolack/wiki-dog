const express = require('express');
const path = require('path'); 
const app = express();

//configuraciones
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//rutas
app.use(require('./routes/'))

//archivos static
app.use(express.static(path.join(__dirname, 'public')));

//server escuchando...
app.listen(app.get('port'), () => {
  console.log('Servidor corriendo en el puerto ', app.get('port'));
})