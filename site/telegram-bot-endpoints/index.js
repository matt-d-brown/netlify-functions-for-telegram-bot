'use strict';

const config = require('./config.js');
const BOT_TOKEN = process.env.BOT_TOKEN;
const telegram  = require('telegram-bot-api');


const api = new telegram({
	                         token  : BOT_TOKEN,
	                         updates: {
		                         enabled     : true
	                         }
                         });

api.on('message', function (message) {
	// Received text message
	// console.log(message);
	api.sendMessage({
		chat_id: message.id,
		text: "abc hello 123 !"
	});
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
