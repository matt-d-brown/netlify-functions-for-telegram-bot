



const fetch = require('node-fetch');
const constructRequestUrl = require('./construct-request-url.js');

const TEMPORARY_REQUESTED_SYMBOL = 'GBP';
// const API_ENDPOINT = (requestedSymbol) => {
//   return constructRequestUrl.getUrl(requestedSymbol);
// };
const API_ENDPOINT = constructRequestUrl.getUrl(TEMPORARY_REQUESTED_SYMBOL);

exports.handler = async function(event, context) {
  try {
    const response = await fetch(API_ENDPOINT, {
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.rates })
    }
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
};
