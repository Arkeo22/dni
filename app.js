const express = require('express');
const app = express();

app.use(express.static("public"));
app.use(express.json());

const dniRegex = new RegExp('^[0-9]{8}-[A-Za-z]{1}')
const dniLetters = "TRWAGMYFPDXBNJZSQVHLCKET";

app.post('/verificarDni', function (request, res) {
    let dni = request.body.dni;
    let response;
    
    console.log(dni)
    if (!dniRegex.test(dni)){
        response = {msg: "DNI no válido"};
        res.json(response);
        return;
    }
    
    let numero = dni.substr(0, 8);
    let letra = dni.charAt(dni.length - 1);
    
    let index = numero % 23;
    let letraCorrecta = dniLetters.charAt(index);

    if (letra.toUpperCase() != letraCorrecta.toUpperCase()) {
        respuesta = {msg: "Letra incorrecta, debería ser " + letraCorrecta};
    } else {
        respuesta = {msg: "DNI valido"};
    }

    res.json(respuesta);
 });

 app.listen(80);