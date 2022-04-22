#!/usr/bin/node

let http = require("http");
let mongo_client = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectID;

let url = "mongodb://localhost";

let db;

let fs = require("fs");

console.log("Starting Server...");

mongo_client.connect(url, function(err,conn )
{
	if (err) {
	console.log("ERROR");
	return;}

	db = conn.db("ToDoList");
	console.log("Inside Server");
}

);



http.createServer(function(req,res){

	res.writeHead(200, {	
	      'Content-Type': 'application/json',
		  'Access-Control-Allow-Origin': '*',
		  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
					    });
		
		if (req.method == "POST"){
		let task = [];
		req.on('data', function(data){
			task+= data;
		});
			
		req.on('end', function(){
			
		task = JSON.parse(task);		
		if (task.remove == "false"){
			console.log(task);
				
			console.log(task.tasks);
			db.collection("tasks").insertOne({"task":task.tasks});	
			
			let new_obj = db.collection("tasks").find().sort({"_id":-1}).limit(1);
			
			let obj_id;
			new_obj.toArray(function(err,doc){
			 
			obj_id  = JSON.stringify(doc);
						
			console.log(obj_id);
		


			res.end(obj_id);
			return;});
			}else{
			let idd = new ObjectId(task.task_id);	
			let id =  {_id: idd};
			console.log(id); 
			console.log(db.collection("tasks").deleteOne(id));
			}	
		});
		

			return;
		}

		let task_obj = db.collection("tasks").find();

		let task_json;

		task_obj.toArray(function(err,data){

			task_json = JSON.stringify(data);
		
			res.end(task_json);
			return;
	});


return;

}).listen(3030);
