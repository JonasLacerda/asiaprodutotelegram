var TelegramBot = require('node-telegram-bot-api')
const { Console } = require("console")
var fs = require("fs")

var token = '1615104239:AAE-5CT8qYZLAMqUQ2I6CcJOAk9eA';
var botOptions = {
    polling: true
};
var bot = new TelegramBot(token, botOptions)

bot.getMe().then(function(me)
{
    console.log('Olá! My nome é %s!', me.first_name)
    console.log('Meu ID é %s.', me.id)
    console.log('E meu username @%s.', me.username)
})

bot.on('message', (msg) => {
    console.log(msg)
    
    if(msg.text === '/vendedores'){
       console.log('vendedor')
    
    }
    else if(msg.text === '/endereco'){
        console.log('endereco')
    }
    else{
        const chatId = msg.chat.id   
        const resposta = 'Obrigado por entrar em contato com Asia Food! Para agilizar o atendimento entre em contato com um de nossos /vendedores ou ligue para (31) 3046-9803. O endereço da empresa é /endereco. Para uilizar nosso bot basta digitar @produtobot e pesquisar qual produto deseja informação ou cotação de preço.'
        bot.sendMessage(chatId, resposta)
    }
      
})

bot.onText(/\/vendedores/, (msg) => {
    const chatId = msg.chat.id            
    const resposta = 'vendedores:\u000AAline - (31) 99287-1760\u000AAdriana - (31) 99112-9765\u000ACamila - (31) 98276-8093\u000AHorario de atendimento é de 8:00 as 16:00 de seg à sab'
    bot.sendMessage(chatId, resposta);
})

bot.onText(/\/endereco/, (msg) => {
    const chatId = msg.chat.id            
    const resposta = 'R. José Barra do Nascimento, 794 - Eldorado, Contagem - MG, 32315-020'
    bot.sendMessage(chatId, resposta);
})



/*
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp); 194485037
});
*/

bot.on('inline_query', function(msg)
{
    var q_id = msg.id;
    var q_query = msg.query;
  
    console.log(q_query)
    console.log(q_id)
    var results = fs.readFileSync("./bd.json", "utf8")
    results = JSON.parse(results)
    var res = []
    if(q_query != ""){
        for (let index = 0; index < results.length; index++) {
            var produto = results[index]['input_message_content']["message_text"]
            //console.log(produto.indexOf('ABOBORA'))
            if(produto.indexOf(q_query.toUpperCase()) >-1){
                res.push(results[index])
            }
        }
        setTimeout(bot.answerInlineQuery(q_id, res), 9000)
        
    }else{
        var res = [results[1], results[2], results[3], results[4], results[5], results[6], results[7], results[8], results[9], results[10], results[11], results[12], results[13], results[14]]
        bot.answerInlineQuery(q_id, res)
    }
    


});

bot.on('chosen_inline_result', function(msg)
{
    console.log('Chosen:' + msg);
});




