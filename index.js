var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/mydb';
var globalName = 'One';
var globalAge = 12;
var globalRole = 'two';

app.use(express.static('public'));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.post('/process_post', urlencodedParser, function (req, res) {

   // Prepare output in JSON format
   response = {
       name:req.body.name,
       age:req.body.age,
       role:req.body.role
       
   };
   globalName = req.body.name;
   globalAge = req.body.age;
   globalRole = req.body.role;
  
   //console.log('name: ' + req.body.name);
   //console.log('global_updated: ' + global);
 
   //res.send('Received data correct data and now responding back'+ globalName);
   //res.send('GlobalName: ' + globalName);
  
//insert function  
  MongoClient.connect(url, function (err, db) {
	  if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	  } else {
	    //HURRAY!! We are connected. :)
	    console.log('Insert connection established to', url);

	    // Get the documents collection
	    var collection = db.collection('users');

	    //Create some users
	    var user1 = {name: globalName, age: globalAge, roles: globalRole};
	    //var user2 = {name: 'modulus user', age: 22, roles: ['user']};
	    //var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};

	    // Insert some users
	    collection.insert(user1, function (err, result) {
	      if (err) {
		console.log(err);
	      } else {
		console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
		//res.send(result);
	      }
	      //Close connection
	      db.close();
	    });
	  }
	});
	
//Find function	
 MongoClient.connect(url, function (err, db) {
	  if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	  } else {
	    //HURRAY!! We are connected. :)
	    console.log('Find connection established to', url);

	    // Get the documents collection
	    var collection = db.collection('users');

	    // Report all documents in collection
	    collection.find().toArray(function (err, result) {
	      if (err) {
		console.log(err);
	      } else if (result.length) {
		console.log('Found:', result);
	      res.send(result);
	      } else {
		console.log('No document(s) found with defined "find" criteria!');
	      res.send('Nothing in DB');
	      }
	      //Close connection
	      db.close();
	    });
	  }
	});	

	app.get('/', function(req, res) {
	    res.sendFile(path.join(__dirname + '/index.html'));
	});
   
})

/*   
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  
  console.log("Example app listening at http://%s:%s", host, port)

})*/


/*
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('users');

    //Create some users
    var user1 = {name: global, age: 42, roles: ['admin', 'moderator', 'user']};
    var user2 = {name: 'modulus user', age: 22, roles: ['user']};
    var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};

    // Insert some users
    collection.insert([user1, user2, user3], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      }
      //Close connection
      db.close();
    });
  }
});*/
