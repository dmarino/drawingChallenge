import { Meteor } from 'meteor/meteor';

import "../imports/api/usuarios.js";
import "../imports/api/dibujos.js";
import {Concurso} from "../imports/api/concurso.js";
import {Temas} from "../imports/api/temas.js";


if(Meteor.isServer){
    SyncedCron.config({
        collectionName: 'historialCron'
    });

    SyncedCron.add({
        name: 'Definir Tema Concurso',
        schedule: function(parser) {
            return parser.text('at 0:00 am');
            //return parser.text('every 1 minutes');
        }, 
        job: function(intendedAt) {
        	var tema = Temas.find({}).fetch()[0]; 
        	var personaje = tema.personajes[Math.floor(Math.random()*(tema.personajes.length-1))].nombre;
        	var caracteristica = tema.caracteristicas[Math.floor(Math.random()*(tema.caracteristicas.length-1))].nombre;

        	var nombreConcurso = caracteristica + " " +personaje;

        	Concurso.insert({nombre:nombreConcurso, fecha: new Date(), ganador:{}})
        }
    });    
}


Meteor.startup(() => {
	   SyncedCron.start();
});
