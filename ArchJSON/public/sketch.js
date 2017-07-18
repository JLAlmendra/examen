function setup() {
  noCanvas();
  // No canvas para que no haga dibujo en pantalla

  // cliente (box usuario)
  var clienteinput = select('#cliente');
  // cantidad (box usuario)
  var cantidadinput = select('#cantidad');
  var BtnCant = select('#BtnCant');
  BtnCant.mousePressed(ingresaCant);

  // ingresa cantidades al API
  function ingresaCant() {
    var url = '/add/' + clienteinput.value() + '/' + cantidadinput.value();
    // cargar JSON
    loadJSON(url, submitted);
    function submitted(result) {
      // Mensaje de resultado a la consola
      console.log(result);
    }
  }

 //Tomar el valor del boton de post
  var POSTit = select('#BtnPost');
  POSTit.mousePressed(mandaPOST);
 var txt = select('#cantidad');
   // analizar el post
  function mandaPOST() {
    var params = {
      
      text: txt.value()
    }
    httpPost('/all', params, success);
  }

  function success(result) {
    console.log(result);
  }

}
