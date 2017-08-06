var moongose = require('mongoose');

var beerSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    history: String,
    harmonization: String,
    content: Number, //Teor alcoolico - porcentagem
    extract: Number, //Extrato primitivo: 0 - leve, 1 - comum, 2 - extra, 3 - forte
    color: Number, //Cor: 0 - clara, 1 - escura
    barley: Number, //Malte Cevada 0 - puro malte, 1 - cerveja, 2 - nome do vegetal predominante
    ferment: Number, //Fermentacao: 0 - baixa, 1 - alta
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Beer", beerSchema);