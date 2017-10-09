import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Dibujos = new Mongo.Collection("Dibujos"); 

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('dibujos', function dibujosPublication() {
    return Dibujos.find();
  });
}


Meteor.methods({

	"dibujos.insertar"(datos){
		
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}

		check(datos,{
			"autor":String,
			"concurso":String,
			"editado":Date,
		    "likes":Number,
		    "dibujo":Array
		});

		Dibujos.insert(datos);
	},

	"dibujos.update"(id,datos){
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}
		check(id,String);
		check(datos,{
			"dibujo":Array
		});

		Dibujos.update(id, {
            $set: datos,
        });
	},

	"dibujos.updateLikes"(id, likes){
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}
		check(id,String);
		check(likes,Number);

		Dibujos.update(id, {
            $set: { likes:likes}
        });
	}
});