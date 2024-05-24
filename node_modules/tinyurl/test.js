var TinyURL = require('./index.js');
const data = { 'url': 'https://google.com', 'alias': 'custom-alias-for-google' }

TinyURL.shorten('https://google.com', function(res, err) {
  if (err)
      console.log(err)
	console.log(res); //Returns a shorter version of http://google.com - http://tinyurl.com/2tx
});

// Shorten with Alias Example
TinyURL.shortenWithAlias(data, function(res, err) {
  if (err)
    console.log(err)
	console.log(res); //Returns a shorter version of http://google.com - http://tinyurl.com/2tx
});

// Promise Example
TinyURL.shorten('https://google.com').then(function(res) {
  console.log(res)
}, function(err) {
  console.log(err)
})

// Shorten with Alias Promise Example
TinyURL.shortenWithAlias(data).then(function(res) {
    console.log(res)
}, function(err) {
    console.log(err)
})

// Resolve Example
TinyURL.resolve("https://tinyurl.com/2tx").then(
  function(res) {
    console.log(res); //Returns http://google.com, the full URL located at http://tinyurl.com/2tx
  },
  function(err) {
    console.log(err);
  }
);
