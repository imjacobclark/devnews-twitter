var http = require('http');
	Twitter = require('twitter'); 

function DeveloperNewsTwitter(){
    this.client = new Twitter({
        consumer_key: process.env.CON_KEY,
        consumer_secret: process.env.CON_SEC,
        access_token_key: process.env.ACC_KEY,
        access_token_secret: process.env.ACC_SEC
    });

    this.hashtags = ["javascript", "node", "iojs", "osx", "php", "docker", "coreos", "node", "npm", "unix", "linux"];
};

DeveloperNewsTwitter.prototype.tweet = function(tweet){
    this.client.post('statuses/update', {status: tweet},  function(error, tweet, response){
        if(error) throw error;
    });
}

DeveloperNewsTwitter.prototype.getRandomStory = function(){
    var _this = this; 

    http.get({
        host: 'api.devnews.today'
    }, function(response){
        var body = '';

        response.on('data', function(d) {
            body += d;
        });

        response.on('end', function() {
        body = JSON.parse(body);

        var randomStory = Math.floor(Math.random() * body.length + 1);
        var tweet = (randomStory + 1) + ": " + body[randomStory].title + " - " + body[randomStory].url + " via http://devnews.today";

        for(var i = 0; i < _this.hashtags.length; i++){
            if(tweet.indexOf(_this.hashtags[i]) > -1)
                tweet = tweet.replace(_this.hashtags[i], "#" + _this.hashtags[i]);
            }

            if(tweet.length > 140)
                _this.getRandomStory();
            else
                _this.tweet(tweet);
        });
    });
}

dnt = new DeveloperNewsTwitter();
setInterval(dnt.getRandomStory(), 1000 * 60 * 60);