'use strict';

var Fetch = require('whatwg-fetch');
var rootUrl = 'http://45.79.68.28:8888/';
var apiKey = 'donothaveone-yet';

module.exports = window.api = {

    get(url) {

        return fetch(rootUrl + url,{
            headers: {
                'Authorization' : 'Put-auth-key-here'
            }
        })
        .then( (response) => {
            return response.json()
        })
    }
};