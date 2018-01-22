/**
 * Created by Zahra on 26/12/2017.
 */
var express= require('express');
var bodyParser=require('body-parser');
var app =express();
app.use(bodyParser.json());
var server=app.listen(3000,function(){
    console.log("App is running at http://localhost:3000")
});