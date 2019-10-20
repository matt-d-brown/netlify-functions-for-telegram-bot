'use strict';

const fetch = require('node-fetch');
const urlConstructor = require('./api-url-constructor');

function mainFetch(targetCurrency) {
	try {
		const response = await fetch(urlConstructor.getUrl(targetCurrency), {
			headers: {Accept: 'application/json'}
		});
		if (!response.ok) {
			// NOT res.status >= 200 && res.status < 300
			return {statusCode: response.status, body: response.statusText}
		}
		const data = await response.json();
		
		return {
			statusCode: 200,
			body      : JSON.stringify({rate: data.rates[targetCurrency]})
		}
	}
	catch (err) {
		console.log(err) // output to netlify function log
		return {
			statusCode: 500,
			body      : JSON.stringify({msg: err.message}) // Could be a custom message or object i.e. JSON.stringify(err)
		}
	}
}

exports.mainFetch = mainFetch;
