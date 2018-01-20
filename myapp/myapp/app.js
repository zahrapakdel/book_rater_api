var express= require('express');
var bodyParser=require('body-parser');
var app =express();
var Element=require('../myapp/elements');
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


/*

var Projects = Parse.Object.extend("Projects");
var Project = new Projects();

Project.save({
  title:"project6",
  description:"des6",
  start:"2018-01-01T08:28:58.965Z",
  end:"2018-01-01T08:28:58.965Z"
}, {
  success: function(Project) {
    // The object was saved successfully.
    console.log('success'+Project);
  },
  error: function(Project, error) {
    // The save failed.
    // error is a Parse.Error with an error code and message.
    console.log(error);
  }
})
;
*/



/*Project.set("title","project6");
Project.set("description","des6");
Project.set("start","2018-01-01T08:28:58.965Z");
Project.set("end","2018-01-01T08:28:58.965Z");
Project.save(null, {
  success: function() {
    // Execute any logic that should take place after the object is saved.
    console.log('New object created with objectId:' );
  },
  error: function(error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    console.log('error'+ error );
  }
});*/


app.get('/project/getall',function(req,res){

  Element.getElements().then(function(result) {
    res.send(result);
    
  } );

 
  

});

app.post('/project/create',function(req,res){

  var body = '';
  req.on('data',function(data) { body += data; });
  req.on('end', function(data) {
    req.body = JSON.parse(body);
    console.log(req.body)
    Element.addElements(req.body.title,req.body.description,req.body.start,req.body.end).then(function(result) {
      res.send(result);
      console.log(result);

    } );
  });

   
   
  
  
});


app.post('/project/update',function(req,res){
  var body = '';
  req.on('data',function(data) { body += data; });
  req.on('end', function(data) {
    req.body = JSON.parse(body);
    Element.updateElements(req.body.objectId,req.body.title,req.body.description ).then(function(result) {
      res.send(result);
      console.log(result);
    } );
    
  });
  
});

app.post('/project/delete/',function(req,res){
  var body = '';
  req.on('data',function(data) { body += data; });
  req.on('end', function(data) {
    req.body = JSON.parse(body);
    Element.deleteElements(req.body.objectId).then(function(result) {
      res.send(result);
      console.log(result);
    } );
  });
  
  
  
});




/*app.set('view engine','ejs');*/
/*app.get('/',function(req,res){
  res.render('default',{
    title:"zahra"
  });
});*/


app.get('*',function(req,res){
  res.send('not found')
});





var httpServer = require('http').createServer(app);
httpServer.listen(4040);
console.log("App is running")




