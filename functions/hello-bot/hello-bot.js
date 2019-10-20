// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method


const BOT_TOKEN = process.env.BOT_TOKEN;
const telegram  = require('telegram-bot-api');
const Telegraf = require('telegraf');
const fetch    = require('node-fetch');

const api = new telegram({
                           token  : BOT_TOKEN,
                           updates: {
                             enabled     : true
                           }
                         });

/*

exports.handler = async (event, context) => {
  const botResponse = function () {
    /!*try {
      const subject = event.queryStringParameters.name || 'World';
      return {
        statusCode: 200,
        body: JSON.stringify({ message: `Hello ${subject}` })
        // // more keys you can return:
        // headers: { "headerName": "headerValue", ... },
        // isBase64Encoded: true,
      }
    } catch (err) {
      return { statusCode: 500, body: err.toString() }
    }*!/
    return "Hello telegram user";
  };
  /!*
  api.on('message', function (message) {
    // Received text message
    // console.log(message);
    api.sendMessage({
      chat_id: message.id,
      text: message.text,
      
                    })
  });
  
  api.on('inline.query', function (message) {
    // Received inline query
    console.log(message);
  });
  
  api.on('inline.result', function (message) {
    // Received chosen inline result
    console.log(message);
  });
  
  api.on('inline.callback.query', function (message) {
    // New incoming callback query
    console.log(message);
  });
  
  api.on('edited.message', function (message) {
    // Message that was edited
    console.log(message);
  });
  
  api.on('update', function (message) {
    // Generic update object
    // Subscribe on it in case if you want to handle all possible
    // event types in one callback
    console.log(message);
  });
  
  *!/
  
};



*/



exports.handler = async (event, context) => {
  // async/await example.
  
  async function omdbSearch(query = '') {
    const apiUrl   = `http://www.omdbapi.com/?s=${query}&apikey=9699cca`;
    const response = await fetch(apiUrl);
    const json     = await response.json();
    const posters  = (json.Search && json.Search) || [];
    return posters.filter(({Poster}) => Poster && Poster.startsWith('https://')) || [];
  }
  
  
  const bot = new Telegraf(process.env.BOT_TOKEN);
  
  bot.on('inline_query', async ({inlineQuery, answerInlineQuery}) => {
    const posters = await omdbSearch(inlineQuery.query)
    const results = posters.map((poster) => ({
      type       : 'photo',
      id         : poster.imdbID,
      caption    : poster.Title,
      description: poster.Title,
      thumb_url  : poster.Poster,
      photo_url  : poster.Poster
    }))
    return answerInlineQuery(results)
  })
  
  bot.launch();
}
