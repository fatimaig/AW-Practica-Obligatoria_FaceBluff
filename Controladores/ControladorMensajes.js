"use strict";

const mysql = require("mysql");
const config = require("../config");
const pool = mysql.createPool(config.mysqlConfig);

//Declaracion de modelo/s que necesitamos para realizar las consultas con bbdd
const modeloMensajes = require("../Modelos/ModeloMensajes");
let oModeloMensajes = new modeloMensajes(pool);


function mostrarMensajes(request, response, next){

    oModeloMensajes.listadoMensajesPorUsuario(request.session.usuario.Id, function(err, mensajes){

        if (err) {
            next(err);
        } else {
            response.status(200);
            //response.setFlash("¡Tu respuesta ha sido añadida!");
            response.render("ListadoMensajes", { mensajes : mensajes});

        }

    });

}

function mostrarMensaje(request, response, next){
    
    oModeloMensajes.leerMensaje(request.params.id, function(err, mensaje){

        if(err){
            next(err);
        }else{
            response.status(200);
            //response.setFlash("¡Tu respuesta ha sido añadida!");
            console.log("Datos del mensaje: ", mensaje);
            response.render("PaginaDeMensaje", { mensaje : mensaje});
        }

    });
}

function eliminarMensaje(request, response, next){
    oModeloMensajes.eliminarMensaje(request.session.usuario.Id), function(err, result){

        if(err){
            next(err);
        }
        else{
            if(result===1){
                response.status(200);
                response.setFlash("¡Se ha eliminado el mensaje!");
                response.redirect("/mensajes/");
            }
        }
    }
}

//Exportación
module.exports ={
    mostrarMensajes : mostrarMensajes,
    mostrarMensaje : mostrarMensaje, 
    eliminarMensaje: eliminarMensaje
}; 