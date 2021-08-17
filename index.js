/*
Projeto utilizando a biblioteca twit para
facilitar a utilização de api e funlçoes do twitter
*/
var twit = require("twit");

require("dotenv").config();

const Bot = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 + 1000,
});

var n = 5 // variavel para controlar delay em minutos que o bot irá executar o rt

//Função para identificar se bot conseguiu identificar tweet
function BotGotLatestTweet(error, data, response) {
    if (error) {
        console.log("Não identificou tweets recentes")
    } else {
        //Caso ele encontre ele guarda o id do tweet
        var id = {
            id: data.statuses[0].id_str,
        };
    }

    // Comando para dar rt no tweet selecionado
    Bot.post("statuses/retweet/:id", id, BotRetweet);

    //Função para identificar se tweet conseguiu dar rt
    function BotRetweet(error, response) {
        if (error) {
            // Se dar erro posta o código dele no console para faciltiar encontarar bugs
            console.log("Não conseguiu retwettar tweet recente " + error);
        } else {
            // Caso consiga dar rt ele posta o id no console
            console.log("Conseguiu retwettar " + id.id);
        }
    }
}

//Função para dar start no bot
function BotInit() {

    //Variavel de busca/query
    var query = {
        q: "#PS4share", // Keyword/Palavra chave
        result_type: "recent",
    }

    // Coomando para puxar tweets baseados na query
    Bot.get("search/tweets", query, BotGotLatestTweet);
}
//Seta o intervalo de ação da função bot init
setInterval(BotInit, n * 60 * 1000);

//Executa função bot init
BotInit();