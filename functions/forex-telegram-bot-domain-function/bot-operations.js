const telegram = require('telegram-bot-api');
const forexFetcher = require('./forex-api-operations.js');
const promisedRequest = require('request-promise');

function botstuff() {
	
	const api = new telegram({
		                         token  : BOT_TOKEN,
		                         updates: {
			                         enabled     : true,
			                         get_interval: 1000
		                         }
	                         });
	return api;
}


api.on('message', function (message) {
	const chat_id = message.chat.id;

// It'd be good to check received message type here
// And react accordingly


// We consider that only text messages can be received here
	
	
	const options = {
		//uri    : `https://api.exchangeratesapi.io/latest?base=USD\&symbols=${targetCurr}`,
		uri    : 'https://api.exchangeratesapi.io/latest?base=USD\&symbols=GBP',
		headers: {'User-Agent': 'Request-Promise'},
		json   : true
	};
	const results = promisedRequest(options)
			.then(function (parsedBody) {
				api.sendMessage({chat_id: message.chat.id, text: parsedBody.rates["GBP"]})
						.then(function (message) {
							console.log(`sent message with result: ${message.text}`);
						})
						.catch(function (err) {
							console.log(err);
						});
			})
			.catch(function (err) {
				console.log('error');
			});
	
	
	
});
