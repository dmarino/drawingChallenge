import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Concurso = new Mongo.Collection("Concurso"); 

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('concursos', function concursosPublication() {
    return Concurso.find();
  });
}

// No es necesario tener un llamado a methods si este está vacío.
Meteor.methods({



});
