import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Usuarios = new Mongo.Collection("Usuarios"); 

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('usuarios', function usuariosPublication() {
    return Usuarios.find();
  });
}


Meteor.methods({



});