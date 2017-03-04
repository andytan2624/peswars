'use strict';

var Fetch = require('whatwg-fetch');
var rootUrl = 'http://www.4mation.webdevelopmentstudio.net/wp-json/wp/v2/';
var apiKey = 'donothaveone-yet';


/*

 Get post by slug
 http://www.4mation.webdevelopmentstudio.net/wp-json/wp/v2/posts?filter[slug]=problem-solving-101&_embed


 Get all categories
 http://www.4mation.webdevelopmentstudio.net/wp-json/wp/v2/categories?per_page=99

 Get posts by category slug (slug = problem-solving)
 http://www.4mation.webdevelopmentstudio.net/wp-json/wp/v2/posts?filter[category_name]=problem-solving

* */

module.exports = window.api = {
    get(url) {
        return fetch(rootUrl + url,{
            headers: {
                'Authorization' : 'Put-auth-key-here'
            }
        })
        .then(function(response){
            return response.json()
        })
    }
};