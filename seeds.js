var mongoose = require('mongoose');
var Beer = require('./models/beer');
var Comment = require('./models/comment');

var data = [
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
    Beer.remove({}, function(err){
       if(err) {
           console.log(err);
       }
        console.log("Cleaning beer database");
       //add a few beers
        data.forEach(function(seed){
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
    });
}

module.exports = seedDB;