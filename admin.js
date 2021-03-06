/**
 * Created by Zahra on 13/01/2018.
 */
var express= require('express');
var bodyParser=require('body-parser');
var app =express();
var adminCtrl=require('./controller/adminController');
var ParseDashboard = require('parse-dashboard');
var Parse = require('parse/node');Parse.serverURL = "http://localhost:1337/parse";
/*
var dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": "http://localhost:1337/parse",
            "appId": "test",
            "masterKey": "123",
            "appName": "MyApp"
        }
    ]
});
*/

app.use('/dashboard', dashboard);
app.use(bodyParser.json());


app.post('/api/v1/users/login',function(req,res){
    var body = '';
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);
        adminCtrl.login(req.body.email,req.body.password).then(function(result) {
            res.send(result);
        } );
    });
});



app.get('/api/v1/Posts',function(req,res){
    adminCtrl.getPosts().then(function(result) {
        res.send(result);
    } );
});

app.get('/api/v1/PostsByType/:type',function(req,res){
    adminCtrl.getPostsByType(req.params.type).then(function(result) {
        res.send(result);
    } );
});

app.get('/api/v1/ArtistByType/:type',function(req,res){
    adminCtrl.getArtistByType(req.params.type).then(function(result) {
        res.send(result);
    } );
});
app.get('/api/v1/PublisherByType/:type',function(req,res){
    adminCtrl.getPublisherByType(req.params.type).then(function(result) {
        res.send(result);
    } );
});
app.get('/api/v1/CategoryByType/:type',function(req,res){
    adminCtrl.getCategoryByType(req.params.type).then(function(result) {
        res.send(result);
    } );
});

app.get('/api/v1/PostsByCategory/:category',function(req,res){
    adminCtrl.getPostsByCategory(req.params.category).then(function(result) {
        res.send(result);
    } );
});

app.get('/api/v1/PostsByArtist/:artist',function(req,res){
    adminCtrl.getPostsByArtist(req.params.artist).then(function(result) {
        res.send(result);
    } );
});

app.get('/api/v1/Post/:id',function(req,res){
    adminCtrl.getPostById(req.params.id).then(function(result) {
        res.send(result);
    } );
});


app.get('/api/v1/category',function(req,res){
    adminCtrl.getCategory().then(function(result) {
        res.send(result);
    } );
});


app.get('/api/v1/publisher',function(req,res){
    adminCtrl.getPublisher().then(function(result) {
        res.send(result);
    } );
});


app.get('/api/v1/artist',function(req,res){
    adminCtrl.getArtist().then(function(result) {
        res.send(result);
    } );
});


app.get('/api/v1/comment/all',function(req,res){
    adminCtrl.getAllComments().then(function(result) {
        res.send(result);
    } );
});

app.get('/api/v1/comment/archived',function(req,res){
    adminCtrl.getArchivedComments().then(function(result) {
        res.send(result);
    } );
});

app.get('/api/v1/comment/public',function(req,res){
    adminCtrl.getPublicComments().then(function(result) {
        res.send(result);
    } );
});


app.post('/api/v1/comment/archive',function(req,res){
    var body = '';
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);
        adminCtrl.archiveComment(req.body.objectId).then(function(result) {
            res.send(result);
        } );
    });
});

app.post('/api/v1/comment/unarchive',function(req,res){
    var body = '';
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);
        adminCtrl.unArchiveComment(req.body.objectId).then(function(result) {
            res.send(result);
        } );
    });
});

app.post('/api/v1/publisher/analytics',function(req,res){
    var body = '';
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);
        adminCtrl.publisherAnalytics(req.body.publisher).then(function(result) {
            res.send(result);
        } );
    });
});

app.post('/api/v1/artist/analytics',function(req,res){
    var body = '';
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);
        adminCtrl.artistAnalytics(req.body.artist).then(function(result) {
            res.send(result);
        } );
    });
});

app.post('/api/v1/post/insert',function(req,res){

    var body = '';
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);

        adminCtrl.addPost(
            req.body.title,
            req.body.description,
            req.body.properties,
            req.body.like_count,
            req.body.share_count,
            req.body.comment_count,
            req.body.is_archive,
            req.body.type,
            req.body.category,
            req.body.publisher,
            req.body.artist,
            req.body.is_offer,
            req.body.notification,
            req.body.publish_date,
            req.body.cover).then(function(result) {
            res.send(result);
        } );

    });

});

app.post('/api/v1/category/insert',function(req,res){
    
    var body = '';
    
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);
        adminCtrl.addCategory(req.body.title,req.body.description,req.body.type).then(function(result) {
            res.send(result);
        } );
    });
});

app.post('/api/v1/publisher/insert',function(req,res){
    var body = '';
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);
        adminCtrl.addPublisher(req.body.title,req.body.description,req.body.type).then(function(result) {
            res.send(result);
        } );
    });
});

app.post('/api/v1/artist/insert',function(req,res){
    var body = '';
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);
        adminCtrl.addArtist(req.body.title,req.body.description,req.body.type).then(function(result) {
            res.send(result);
        } ); 
    });
    
});

app.post('/api/v1/post/edit',function(req,res){
    var body = '';
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);

        adminCtrl.updatePost(req.body.objectId,
            req.body.title,
            req.body.description,
            req.body.properties,
            req.body.category,
            req.body.publisher,
            req.body.artist,
            req.body.is_archive
            ).then(function(result) {
            
            res.send(result);
        } );
    });
});

app.post('/api/v1/category/edit',function(req,res){
    var body = '';
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);
        adminCtrl.updateCategory(req.body.objectId,req.body.title,req.body.description,req.body.type).then(function(result) {
            res.send(result);
        } );
    });
});

app.post('/api/v1/publisher/edit',function(req,res){
    var body = '';
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);
        adminCtrl.updatePublisher(req.body.objectId,req.body.title,req.body.description ,req.body.type).then(function(result) {
            res.send(result);
        } );
    });
});

app.post('/api/v1/artist/edit',function(req,res){
    var body = '';
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);
        adminCtrl.updateArtist(req.body.objectId,req.body.title,req.body.description,req.body.type ).then(function(result) {
            res.send(result);
        } );
    });
});

app.post('/api/v1/post/delete',function(req,res){
    var body = '';
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);
        adminCtrl.deletePost(req.body.objectId).then(function(result) {
            res.send(result);
        } );
    });
});

app.post('/api/v1/category/delete',function(req,res){
    var body = '';
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);
        adminCtrl.deleteCategory(req.body.objectId).then(function(result) {
            res.send(result);
        } );
    });
});

app.post('/api/v1/publisher/delete',function(req,res){
    var body = '';
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);
        adminCtrl.deletePublisher(req.body.objectId).then(function(result) {
            res.send(result);
        } );
    });
});

app.post('/api/v1/artist/delete',function(req,res){
    var body = '';
    req.on('data',function(data) { body += data; });
    req.on('end', function(data) {
        req.body = JSON.parse(body);
        adminCtrl.deleteArtist(req.body.objectId).then(function(result) {
            res.send(result);
        } );
    });
});

app.get('*',function(req,res){
    res.send('not found')
});

var httpServer = require('http').createServer(app);
var port =4040;
httpServer.listen(port);
console.log("App is running on port "+port)




