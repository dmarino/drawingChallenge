import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Temas = new Mongo.Collection("Temas"); 

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('temas', function temasPublication() {
    return Temas.find();
  });
}


Meteor.methods({



});