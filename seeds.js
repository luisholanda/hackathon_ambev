var mongoose = require('mongoose');
var fs = require('fs');

var Beer = require('./models/beer');
var Comment = require('./models/comment');
var User = require('./models/user');

var userData = [
  {
    username: "a",
    password: "b",

    name: "Precs",
    self_description: "Water is my favorite beer",
    photo: './public/img/eric.jpg',

    rank_name: "Noob",
    level: 1,
    exp: 24
  },
  {
    username: "b",
    password: "c",

    name: "Coimbra",
    self_description: "I like drinking",
    photo: './public/img/coimbra.jpg',

    rank_name: "Cerva-Boy",

    level: 5,
    exp: 570
  },
  {
    username: "c",
    password: "d",

    name: "Tchola",
    self_description: "I dont drink",
    photo: './public/img/luisclaudio.jpg',

    rank_name: "Virgin",
    level: -1,
    exp: 0
  }
];

var beerData = [
    {
        name: "Stella Artois",
        description: "Aroma suave, notas maltadas e mais de 600 anos de tradição em produção de cerveja.",
        price: 6.49,
        history: "Stella Artois chegou ao Brasil em 2005. Para viabilizar sua produção no país, um mestre-cervejeiro passou cerca de seis meses entre São Paulo e Leuven estudando sua receita, seu processo especial de fabricação, seu ritual de degustação e todos os detalhes que fazem Stella Artois ser Stella Artois.",
        harmonization: "Combina perfeitamente com churrasco e carnes vermelhas.",
        content: 5,
        color: 0,
        ferment: 0
    }
];

function seedDB(){
  seedBeers();
  seedUsers();
}

function seedBeers(){
    Beer.remove({}, function(err){
      console.log("Cleaning beer database");
       if(err) {
           console.log(err);
       }
       else{
       //add a few beers
        beerData.forEach(function(seed){
            Beer.create(seed, function(err, beer){
                if(err){
                    console.log(err);
                } else {
                    console.log("added an beer");
                    //create a comment
                    Comment.create(
                        {
                            text: "Great beer",
                            author: {
                                username: "PrecsBeerKing"
                            }
                        }, function(err, comment) {
                            if(err){
                                console.log(err);
                            } else {
                                beer.comments.push(comment);
                                beer.save();
                                console.log("Created new comment");
                            }
                        }
                    );
                }
            });
        });
      }
    });
}

function seedUsers(){
    User.remove({}, function(err){
    console.log('Cleaning user database');

    if(err)
      console.log(err);
    else{
      userData.forEach(function(seed){
        User.register(seed, seed.password, function(err,user){
          if(err){
            console.log(err);
          }
          else{
            console.log("Added new user");
          }
        });
      });
    }
  });
}

module.exports = seedDB;
