
var express = require('express');
// Creacion del app
var app = express();

// Para los archivos (libreria)
var fs = require('fs');

var cors = require('cors');
app.use(cors());

// para hostear archivos
app.use(express.static('public'));


//Checar si hay clientes y conexion con el json
var clientes;
var existe = fs.existsSync('clientes.json');
if (existe) {
  // RLee el archivo
  console.log('Cargando clientes');
  var txt = fs.readFileSync('clientes.json', 'utf8');
  // Parsea de regreso
  clientes = JSON.parse(txt);
} else {
  // Si no hay datos te avisa
  console.log('No hay clientes');
  clientes = {};
}

// Configura el server en el puerto 3000
var server = app.listen(process.env.PORT || 3000, listen);

// Aviso de que está coorriendo
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('El proyecto corre en http://' + host + ':' + port);
}

// ruta para agregar nuevos clientes
app.get('/add/:cliente/:cantidad', addCliente);

// funcion de la ruta
function addCliente(req, res) {
  // cliente and cantidad
  var cliente = req.params.cliente;
  // checar que no sea String
  var cantidad = Number(req.params.cantidad);

  // Pones el dato en el objeto
  clientes[cliente] = cantidad;

  // Mandas confirmación de info correcta
  var reply = {
    status: 'satisfactorio',
    cliente: cliente,
    cantidad: cantidad
  }
  console.log('adding: ' + JSON.stringify(reply));

  // Escribe un nuevo JSON cada que se ignresa un nuevo cliente
  var json = JSON.stringify(clientes, null, 2);
  fs.writeFile('clientes.json', json, 'utf8', finished);
  function finished(err) {
    console.log('clientes.json modificado');
    // Cuando termina manda la respuesta
    res.send(reply);
  }
}

// Ruta que muestra todos los clientes actualmente
app.get('/all', muestraClientes);
app.post('/all', muestraClientesPOST);

// Callback
function muestraClientes(req, res) {
  // Envía todo el dataset
  var json = JSON.stringify(clientes, 1, 2);
  res.send(json); 
}


function muestraClientesPOST(req, res) {
  // Envía todo el dataset
  console.log(clientes);
  var json = JSON.stringify(clientes, null, 2);
  res.send(json);
}