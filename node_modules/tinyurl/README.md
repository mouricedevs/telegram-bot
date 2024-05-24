[![NPM](https://nodei.co/npm/tinyurl.png?downloads=true&stars=true)](https://npmjs.com/package/tinyurl/)

# TinyURL [![Build Status](https://travis-ci.org/JeffResc/TinyURL-Node.js.svg?branch=master)](https://travis-ci.org/JeffResc/TinyURL-Node.js)
[http://TinyURL.com](http://tinyurl.com) URL Shortener Node.js Module

Example Shorten:

First run ```npm install TinyURL``` to install the TinyURL package to your system.

```javascript
var TinyURL = require('tinyurl');

TinyURL.shorten('http://google.com', function(res, err) {
  if (err)
    console.log(err)
	console.log(res);
});

// Shorten with Alias Example
const data = { 'url': 'https://google.com', 'alias': 'custom-alias-for-google' }

TinyURL.shortenWithAlias(data, function(res, err) {
  if (err)
    console.log(err)
	console.log(res); //Returns a shorter version of http://google.com - http://tinyurl.com/2tx
});

// Promise Example
TinyURL.shorten('http://google.com').then(function(res) {
    console.log(res)
}, function(err) {
    console.log(err)
})

// Shorten with Alias Promise Example
const data = { 'url': 'https://google.com', 'alias': 'custom-alias-for-google' }

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
```

[This Package Is Licensed Under The MIT License](https://github.com/JeffResc/TinyURL-Node.js/blob/master/LICENSE.txt)
