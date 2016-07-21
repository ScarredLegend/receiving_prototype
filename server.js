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
var globalJob = 'job';
var globalAge = 12;
var globalDate = '3/14/55';
var globalSalary = 24124;
var ids = 'IDS';
var name;
var job;
var age;
var date;
var salary;

app.use(express.static('public'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "first.html" );
})

app.post('/process_post', urlencodedParser, function (req, res) {

   // Prepare output in JSON format
   response = {
       userName:req.body.userName,
       job:req.body.job,
       age:req.body.age,
       date:req.body.date,
       salary:req.body.salary
   };
   
   globalName = req.body.userName;
   globalJob = req.body.job;
   globalAge = req.body.age;
   globalDate = req.body.date;
   globalSalary = req.body.salary;

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
	    var user1 = {name: globalName, job: globalJob, age: globalAge, date: globalDate, salary: globalSalary};
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
    
    //get all the object Names
	     db.collection('users').distinct('name', {},{}, function(err, ress){
	     name=ress;
	    console.log("name are ",ress);
	    })
    //get all the object jobs
	     db.collection('users').distinct('job', {},{}, function(err, ress){
	     job=ress;
	    console.log("job are ",ress);
	    })
	        //get all the object age
	     db.collection('users').distinct('age', {},{}, function(err, ress){
	     age=ress;
	    console.log("age are ",ress);
	    })
	        //get all the object date
	     db.collection('users').distinct('date', {},{}, function(err, ress){
	     date=ress;
	    console.log("date are ",ress);
	    })
	        //get all the object salary
	     db.collection('users').distinct('salary', {},{}, function(err, ress){
	     salary=ress;
	    console.log("salary are ",ress);
	    })
	    
	    
	    
	    // Report all documents in collection
	    collection.find().toArray(function (err, result) {
	      if (err) {
		console.log(err);
	      } else if (result.length) {
		console.log('Found:', result);
		console.log('2name:', name);
		console.log('2job:', job);
		console.log('2age:', age);
		console.log('2date:', date);
		console.log('2salary:', salary);
		
		//console.log(result.toString());

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
  
})

var server = app.listen(8082, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
