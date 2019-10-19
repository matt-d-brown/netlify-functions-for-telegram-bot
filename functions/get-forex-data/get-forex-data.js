'use strict';

const requests = require('requests');
const got = require('got');
const env = require('env');
const constructRequestUrl = require('./construct-request-url.js');
const fetch = require('node-fetch');

const API_ENDPOINT = (requestedSymbol) => {
	return constructRequestUrl.getUrl(requestedSymbol);
};

exports.handler = async (event, context) => {
	let response
	try {
		response = await fetch(API_ENDPOINT)
		// handle response
	}
	catch (err) {
		return {
			statusCode: err.statusCode || 500,
			body      : JSON.stringify({
				                           error: err.message
			                           })
		}
	}
	
	return {
		statusCode: 200,
		body      : JSON.stringify({
			                           data: response
		                           })
	}
};

