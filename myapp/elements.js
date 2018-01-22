/**
 * Created by Zahra on 30/12/2017.
 */
var Parse = require('parse/node');
var promise = require('promise');
Parse.serverURL = "http://localhost:1337/parse";
Parse.initialize("test","");

module.exports={
    getElements:getElements,
    addElements:addElements,
    updateElements:updateElements,
    deleteElements:deleteElements
}


function getElements(){
    return new promise(function(resolve){
        var Projects = Parse.Object.extend("Projects");
        var Project = new Projects();
        var query = new Parse.Query(Project);
        var object =[];
        query.find().then(function(results) {
            for (var i = 0; i < results.length; i++) {
                object.push({"objectId":results[i].get('objectId'),"title":results[i].get('title'), "description":results[i].get('description'), "start":results[i].get('start'),"end":results[i].get('end')}) ;
            }
            resolve(results)
        });
    })
}


function addElements(t,d,s,e){
    return new promise(function(resolve){
        var Projects = Parse.Object.extend("Projects");
        var Project = new Projects();
       
        Project.save({
            title:t,
            description:d,
            start:s,
            end:e
            
        }, {
            success: function(result) {
                resolve(result)
                console.log('success');
            },
            error: function(Project, error) {
                console.log(error);
            }
        });
    })
    
}

function updateElements(id ,new_t , new_d) {
    return new promise(function (resolve) {
        var Projects = Parse.Object.extend("Projects");
        var Project = new Projects();
        var query = new Parse.Query(Project);
        query.equalTo("objectId", id);
        query.find().then(function (results) {
            if(new_t){
                results[0].set("title",new_t);
                results[0].save();
            }
            if(new_d){
                results[0].set("description",new_d);
                results[0].save();
            }
            resolve(results)
        })
    })
}

function deleteElements(id){

    return new promise(function(resolve){
        var Projects = Parse.Object.extend("Projects");
        var Project = new Projects();
        var query = new Parse.Query(Project);
        query.equalTo("objectId", id)
            query.find().then(function (results) {
                results[0].destroy({
                    success: function(result) {
                        resolve("The object deleted!")
                    },
                    error: function(myObject, error) {
                        resolve(error)
                    }
                });
            })

       /* if(!query.equalTo("objectId", id)) {
            resolve("your id doesn't exist!")
        }*/
    })

}

