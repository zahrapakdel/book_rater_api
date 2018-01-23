/**
 * Created by Zahra on 13/01/2018.
 */
var Parse = require('parse/node');
var promise = require('promise');
Parse.serverURL = "http://localhost:1337/parse";
Parse.initialize("test","");

module.exports={
    getPosts:getPosts,
    getPostsByType:getPostsByType,
    getPostsByCategory:getPostsByCategory,
    getPostsByArtist:getPostsByArtist,
    getPostById:getPostById,
    getArtist:getArtist,
    getPublisher:getPublisher,
    getCategory:getCategory,
    addPost:addPost,
    addArtist:addArtist,
    addPublisher:addPublisher,
    addCategory:addCategory,
    updatePost:updatePost,
    updateArtist:updateArtist,
    updatePublisher:updatePublisher,
    updateCategory:updateCategory,
    deletePost:deletePost,
    deleteArtist:deleteArtist,
    deletePublisher:deletePublisher,
    deleteCategory:deleteCategory
}


function getPosts(){
    return new promise(function(resolve){
        var posts = Parse.Object.extend("Post");
        var post = new posts();
        var query = new Parse.Query(post);
        query.find().then(function(results) {
            resolve(results)
        });
    })
}

function getPostsByType(_type){
    return new promise(function(resolve){
        var posts = Parse.Object.extend("Post");
        var post = new posts();
        var query = new Parse.Query(post);
        query.equalTo("type", _type);
        query.find().then(function(results) {
            resolve(results)
        });
    })
}

function getPostsByCategory(_category){
    return new promise(function(resolve){
        var posts = Parse.Object.extend("Post");
        var post = new posts();
        var query = new Parse.Query(post);
        query.equalTo("category", _category);
        query.find().then(function(results) {
            resolve(results)
        });
    })
}

function getPostsByArtist(_artist){
    return new promise(function(resolve){
        var posts = Parse.Object.extend("Post");
        var post = new posts();
        var query = new Parse.Query(post);
        query.equalTo("artist", _artist);
        query.find().then(function(results) {
            resolve(results)
        });
    })
}

function getPostById(_id){
    return new promise(function(resolve){
        var posts = Parse.Object.extend("Post");
        var post = new posts();
        var query = new Parse.Query(post);
        query.equalTo("objectId", _id);
        query.find().then(function(results) {
            resolve(results)
        });
    })
}




function getArtist(){
    return new promise(function(resolve){
        var artists = Parse.Object.extend("Artist");
        var artist = new artists();
        var query = new Parse.Query(artist);
        query.find().then(function(results) {
            resolve(results)
        });
    })
}

function getPublisher(){
    return new promise(function(resolve){
        var publishers = Parse.Object.extend("Publisher");
        var publisher = new publishers();
        var query = new Parse.Query(publisher);
        query.find().then(function(results) {
            resolve(results)
        });
    })
}

function getCategory(){
    return new promise(function(resolve){
        var categories = Parse.Object.extend("Category");
        var category = new categories();
        var query = new Parse.Query(category);
        query.find().then(function(results) {
            resolve(results)
        });
    })
}






function addPost(_title,_description,_properties,_like_count,_share_count,_comment_count,_is_archive,_type,_category,_publisher,_artist,_is_offer,_publish_date,_cover ){

    return new promise(function(resolve){
        var Post = Parse.Object.extend("Post");
        var post = new Post();
        var parseFile = new Parse.File('cover', _cover);
        console.log(parseFile);
        var artists = Parse.Object.extend("Artist");
        var artist = new artists();
        var query = new Parse.Query(artist);
        query.equalTo("title", _artist);
        query.find().then(function (results) {
                post.set("artist",results[0]);
                post.save();
        })
        var Category = Parse.Object.extend("Category");
        var category = new Category();
        var query = new Parse.Query(category);
        query.equalTo("title", _category);
        query.find().then(function (results) {
            post.set("category",results[0]);
            post.save();
        })
        var Publisher = Parse.Object.extend("Publisher");
        var publisher = new Publisher();
        var query = new Parse.Query(publisher);
        query.equalTo("title", _publisher);
        query.find().then(function (results) {
            post.set("publisher",results[0]);
            post.save();
        })
        post.save({
            title:_title,
            description:_description,
            properties:_properties,
            like_count:0,
            share_count:0,
            comment_count:0,
            is_archive:false,
            type:_type,
            is_offer:_is_offer,
           // publish_date:_publish_date,
            cover:parseFile,
        
        }, {
            success: function(result) {
                resolve(result)
                console.log('success');
            },
            error: function(result, error) {
                console.log(error);
            }
        });
    })

}

function addArtist(_title,_description,_type){
    return new promise(function(resolve){
        var artists = Parse.Object.extend("Artist");
        var artist = new artists();

        artist.save({
            title:_title,
            description:_description,
            type:_type

        }, {
            success: function(result) {
                resolve(result)
                console.log('success');
            },
            error: function(Artist, error) {
                console.log(error);
            }
        });
    })

}

function addPublisher(_title,_description,_type){
    return new promise(function(resolve){
        var publishers = Parse.Object.extend("Publisher");
        var publisher = new publishers();

        publisher.save({
            title:_title,
            description:_description,
            type:_type

        }, {
            success: function(result) {
                resolve(result)
                console.log('success');
            },
            error: function(Publisher, error) {
                console.log(error);
            }
        });
    })

}

function addCategory(_title,_description,_type){
    return new promise(function(resolve){
        var categories = Parse.Object.extend("Category");
        var category = new categories();

        category.save({
            title:_title,
            description:_description,
            type:_type

        }, {
            success: function(result) {
                resolve(result)
                console.log('success');
            },
            error: function(Category, error) {
                console.log(error);
            }
        });
    })

}


function updatePost(_id ,_new_title, _new_description, _new_properties, _new_cover ,_new_type,_new_category,_new_publisher,_new_artist,_new_is_offer,_new_is_archive) {
    return new promise(function (resolve) {
        var posts = Parse.Object.extend("Post");
        var post = new posts();
        var query = new Parse.Query(post);
        query.equalTo("objectId", _id);
        query.find().then(function (results) {
            if(_new_title){
                
                results[0].set("title",_new_title);
                results[0].save();
            }
            if(_new_description){
                results[0].set("description",_new_description);
                results[0].save();
            }
            if(_new_properties){
                results[0].set("properties",_new_properties);
                results[0].save();
            }
            if(_new_cover){
                results[0].set("cover",_new_cover);
                results[0].save();
            }
            if(_new_type){
                results[0].set("type",_new_type);
                results[0].save();
            }
            if(_new_category){
                results[0].set("category",_new_category);
                results[0].save();
            }
            if(_new_publisher){
                results[0].set("publisher",_new_publisher);
                results[0].save();
            }
            if(_new_artist){
                results[0].set("artist",_new_artist);
                results[0].save();
            }
            if(_new_is_offer){
                results[0].set("is_offer",_new_is_offer);
                results[0].save();
            }
            if(_new_is_archive){
                results[0].set("is_archive",_new_is_archive);
                results[0].save();
            }
            resolve(results)
        })
    })
}

function updateArtist(_id ,_new_title, _new_description, _new_type) {
    return new promise(function (resolve) {
        var artists = Parse.Object.extend("Artist");
        var artist = new artists();
        var query = new Parse.Query(artist);
        query.equalTo("objectId", _id);
        query.find().then(function (results) {
            if(_new_title){
                results[0].set("title",_new_title);
                results[0].save();
            }
            if(_new_description){
                results[0].set("description",_new_description);
                results[0].save();
            }
            if(_new_type){
                results[0].set("type",_new_type);
                results[0].save();
            }
            resolve(results)
        })
    })
}

function updatePublisher(_id ,_new_title, _new_description, _new_type) {
    return new promise(function (resolve) {
        var publishers = Parse.Object.extend("Publisher");
        var publisher = new publishers();
        var query = new Parse.Query(publisher);
        query.equalTo("objectId", _id);
        query.find().then(function (results) {
            if(_new_title){
                results[0].set("title",_new_title);
                results[0].save();
            }
            if(_new_description){
                results[0].set("description",_new_description);
                results[0].save();
            }
            if(_new_type){
                results[0].set("type",_new_type);
                results[0].save();
            }
            resolve(results)
        })
    })
}

function updateCategory(_id ,_new_title, _new_description, _new_type) {
    return new promise(function (resolve) {
        var categories = Parse.Object.extend("Category");
        var category = new categories();
        var query = new Parse.Query(category);
        query.equalTo("objectId", _id);
        query.find().then(function (results) {
            if(_new_title){
                results[0].set("title",_new_title);
                results[0].save();
            }
            if(_new_description){
                results[0].set("description",_new_description);
                results[0].save();
            }
            if(_new_type){
                results[0].set("type",_new_type);
                results[0].save();
            }
            resolve(results)
        })
    })
}

function deletePost(_id){
    return new promise(function(resolve){
        var posts = Parse.Object.extend("Post");
        var post = new posts();
        var query = new Parse.Query(post);
        query.equalTo("objectId", _id)
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

    })

}

function deleteArtist(_id){

    return new promise(function(resolve){
        var artists = Parse.Object.extend("Artist");
        var artist = new artists();
        var query = new Parse.Query(artist);
        query.equalTo("objectId", _id)
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

    })

}

function deletePublisher(_id){
    return new promise(function(resolve){
        var publishers = Parse.Object.extend("Publisher");
        var publisher = new publishers();
        var query = new Parse.Query(publisher);
        query.equalTo("objectId", _id)
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

    })

}

function deleteCategory(id){

    return new promise(function(resolve){
        var categories = Parse.Object.extend("Category");
        var category = new categories();
        var query = new Parse.Query(category);
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

    })

}