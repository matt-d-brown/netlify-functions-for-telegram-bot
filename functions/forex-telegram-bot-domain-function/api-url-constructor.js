
// Default base currency is USD.
const defaultBaseCurrency   = 'USD';
exports.defaultBaseCurrency = defaultBaseCurrency;

// Supported currencies pairs:
const instrumentsCurrencyPairs = [
	'EUR_USD',
	'USD_JPY',
	'GBP_USD',
	'EUR_GBP',
	'USD_CHF',
	'EUR_JPY',
	'EUR_CHF',
	'USD_CAD',
	'AUD_USD',
	'GBP_JPY',
];
exports.currencyPairs          = instrumentsCurrencyPairs;

// Regular Expression for the currency:
const currencyRegExp      = '/^[A-Z]{3}$/';
exports.currencyCodeRegEx = currencyRegExp;

// Supported currencies:
const supportedCurrencyCodes   = [
	'USD',
	'GBP',
	'EUR',
	'JPY',
	'BGN',
	'CZK',
	'DKK',
	'HUF',
	'PLN',
	'RON',
	'SEK',
	'CHF',
	'ISK',
	'NOK',
	'HRK',
	'RUB',
	'TRY',
	'AUD',
	'BRL',
	'CAD',
	'CNY',
	'HKD',
	'IDR',
	'ILS',
	'INR',
	'KRW',
	'MXN',
	'MYR',
	'NZD',
	'BHP',
	'SGD',
	'THB',
	'ZAR',
];
exports.supportedCurrencyCodes = supportedCurrencyCodes;


// Function for constructing the API request URL.
function getUrl(targetSymbol, baseCurrency = defaultBaseCurrency) {
	const apiBaseUrl         = 'https://api.exchangeratesapi.io/latest';
	const baseCurrencyQuery  = `?base=${baseCurrency}`;
	const targetCurrencySlot = `&symbols=${targetSymbol}`;
	return `${apiBaseUrl}${baseCurrencyQuery}${targetCurrencySlot}`;
}


exports.getUrl = getUrl;
