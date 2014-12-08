var mongoose = require('mongoose');

// connect to mongodb using mongoose
mongoose.connect('mongodb://localhost/mydb');
// this url may need your username and password if you are not having your db on localhost

// schema for every article, e.g. ArticleSchema
// mongodb is schemaless, mongoose is not schemaless
var ArticleSchema = new mongoose.Schema({
	// every article has a TITLE and a BODY, it can have TAG's too
    title: String,
    body: String
});

// now our 'model' use our schema
var Article = mongoose.model('Articles', ArticleSchema);

// for saving an article into the database, we do this:
new Article({ title: 'my special title', body: 'my special body' });

// or we can do this:
var phparticle = new Article({ title: 'getting started wigh php', body: 'php information, haha.' });
console.log(phparticle);
console.log(phparticle.title);


// for getting every articles(title and body) we do this:
Article.find({}, function(err, docs) {
    docs.forEach(function(item) {
        console.log(item);
        console.log(item.title);
        console.log(item.body);
    });
});


// in our articles.js router we can:
router.get('/', function(req, res){
    Article.find({}, function(err, items) {
        res.render('articles', {articles: items});
    });
});
// which sends 'items' to the articles.jade template
// in articles.jade we do:
extends layout

block content
    h1 Showing All Articles

    ul
    - each article in articles
        li article Title: #{article.title}
        li article Body: #{article.body}
        hr

    a(href="articles/new") Add new Article
    br
    a(href="/") Home
