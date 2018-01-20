/**
 * Created by Zahra on 13/01/2018.
 */
var express= require('express');
var bodyParser=require('body-parser');
var app =express();
var Element=require('../myapp/adminController');
var ParseDashboard = require('parse-dashboard');
var Parse = require('parse/node');Parse.serverURL = "http://localhost:1337/parse";var dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": "http://localhost:1337/parse",
            "appId": "test",
            "masterKey": "123",
            "appName": "MyApp"
        }
    ]
});
Parse.initialize("test","");


app.use('/dashboard', dashboard);
app.use(bodyParser.json());

app.get('/api/v1/Posts',function(req,res){
    Element.getPosts().then(function(result) {
        res.send(result);
    } );
});

app.get('/api/v1/PostsByType/:type',function(req,res){
    Element.getPostsByType(req.params.type).then(function(result) {
        res.send(result);
    } );
});

app.get('/api/v1/PostsByCategory/:category',function(req,res){
    Element.getPostsByCategory(req.params.category).then(function(result) {
        res.send(result);
    } );
});

app.get('/api/v1/PostsByArtist/:artist',function(req,res){
    Element.getPostsByArtist(req.params.artist).then(function(result) {
        res.send(result);
    } );
});

app.get('/api/v1/Post/:id',function(req,res){
    Element.getPostById(req.params.id).then(function(result) {
        res.send(result);
    } );
});


app.get('/api/v1/category',function(req,res){
    Element.getCategory().then(function(result) {
        res.send(result);
    } );
});


app.get('/api/v1/publisher',function(req,res){
    Element.getPublisher().then(function(result) {
        res.send(result);
    } );
});


app.get('/api/v1/artist',function(req,res){
    Element.getArtist().then(function(result) {
        res.send(result);
    } );
});


app.post('/api/v1/post/insert',function(req,res){
    Element.addPost(req.body.title,req.body.description,req.body.properties,req.body.cover,req.body.like_count,req.body.share_count,req.body.comment_count,req.body.is_archive,req.body.type,req.body.category,req.body.publisher,req.body.artist,req.body.is_offer,req.body.publish_date).then(function(result) {
        res.send(result);
    } );
});

app.post('/api/v1/category/insert',function(req,res){
    Element.addCategory(req.body.title,req.body.description,req.body.type).then(function(result) {
        res.send(result);

    } );
});

app.post('/api/v1/publisher/insert',function(req,res){
    Element.addPublisher(req.body.title,req.body.description,req.body.type).then(function(result) {
        res.send(result);
        console.log(result);
    } );
});

app.post('/api/v1/artist/insert',function(req,res){
    Element.addArtist(req.body.title,req.body.description,req.body.type).then(function(result) {
        res.send(result);
        console.log(result);
    } );
});

app.post('/api/v1/post/edit',function(req,res){

    Element.updatePost(req.body.objectId,req.body.title,req.body.description,req.body.properties,req.body.cover,req.body.is_archive,req.body.type,req.body.category,req.body.publisher,req.body.artist,req.body.is_offer ).then(function(result) {
        res.send(result);
    } );
});

app.post('/api/v1/category/edit',function(req,res){

    Element.updateCategory(req.body.objectId,req.body.title,req.body.description,req.body.type).then(function(result) {
        res.send(result);
    } );
});

app.post('/api/v1/publisher/edit',function(req,res){

    Element.updatePublisher(req.body.objectId,req.body.title,req.body.description ,req.body.type).then(function(result) {
        res.send(result);
        console.log(result);
    } );
});

app.post('/api/v1/artist/edit',function(req,res){

    Element.updateArtist(req.body.objectId,req.body.title,req.body.description,req.body.type ).then(function(result) {
        res.send(result);
        console.log(result);
    } );
});

app.post('/api/v1/post/delete',function(req,res){

    Element.deletePost(req.body.objectId).then(function(result) {
        res.send(result);
    } );
});

app.post('/api/v1/category/delete',function(req,res){

    Element.deleteCategory(req.body.objectId).then(function(result) {
        res.send(result);
    } );
});

app.post('/api/v1/publisher/delete',function(req,res){

    Element.deletePublisher(req.body.objectId).then(function(result) {
        res.send(result);
    } );
});

app.post('/api/v1/artist/delete',function(req,res){

    Element.deleteArtist(req.body.objectId).then(function(result) {
        res.send(result);
    } );
});

app.get('*',function(req,res){
    res.send('not found')
});

var httpServer = require('http').createServer(app);
httpServer.listen(4040);
console.log("App is running")




