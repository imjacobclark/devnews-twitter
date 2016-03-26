var http = require('http');
    Twitter = require('twitter')
    story = 0; 

function DeveloperNewsTwitter(){
    this.client = new Twitter({
        consumer_key: process.env.CON_KEY,
        consumer_secret: process.env.CON_SEC,
        access_token_key: process.env.ACC_KEY,
        access_token_secret: process.env.ACC_SEC
    });

    this.hashtags   = ["javascript", "node", "iojs", "osx", "php", "docker", "coreos", "node", "npm", "unix", "linux", "go", "google", "cloud", "devops", "swift", "iphone", "fbi", "intel", "mongodb", "google", "microsoft", "Node.js", "JavaScript", "MongoDB", "Swift", "DevOps", "iPhone", "Unix", "Linux", "Microsoft", "Google", "Docker", "PHP", "Uber", "python", "Python"];
};

DeveloperNewsTwitter.prototype.tweet = function(tweet){
    this.client.post('statuses/update', {status: tweet},  function(error, tweet, response){
        if(error) throw error;
    });
}

DeveloperNewsTwitter.prototype.getRandomStory = function(){
    var _this = this; 
    
    try{
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
            var tweet = body[randomStory].title;
            var url = body[randomStory].url + " via http://devnews.today";
    
            for(var i = 0; i < _this.hashtags.length; i++){
                if(tweet.indexOf(_this.hashtags[i]) > -1)
                    tweet = tweet.replace(_this.hashtags[i], "#" + _this.hashtags[i]);
                }
    
                if(tweet.length > 140)
                    _this.getRandomStory();
                else
                    _this.tweet(tweet + " - " + url);
            });
        });
        
        console.log(story);
        story++;
    }catch(e){
        console.log(e);
        _this.getRandomStory();
    }
}

dnt = new DeveloperNewsTwitter();
setInterval(dnt.getRandomStory(), 600000);
