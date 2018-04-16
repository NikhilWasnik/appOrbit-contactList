const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post('/saveUser',(req,res)=>{
	if(req.body){
		fs.readFile('./users.json', 'utf8', (err, data)=>{
		    if (err){
		        console.log('err==',err);
		    }
		    else {
		    	var jsonStr = "";
		    	if(data != "" && data != undefined && data != null){
		    		if(req.body.editFlag){
		    			//code for edit user
		    			var arr = JSON.parse(data);
		    			arr.splice(arr.findIndex(function(i){
						    return i.id === req.body.id;
						}), 1);
		    			arr.push(req.body);
				    	jsonStr = JSON.stringify(arr);
		    		}
		    		else{
		    			//code for add user
		    			var arr = JSON.parse(data);
				    	arr.push(req.body);
				    	jsonStr = JSON.stringify(arr);
		    		}
		    	}
		    	else{
		    		var arr = [];
		    		arr.push(req.body);
		    		jsonStr = JSON.stringify(arr);
		    	}			    
			    fs.writeFile('./users.json', jsonStr, 'utf8', (done)=>{
			    	res.send({status:200,message:"User added"});
			    });
			}
		});
	}
})

router.get('/getUsers',(req,res)=>{
	fs.readFile('./users.json', 'utf8', (err, data)=>{
		    if (err){
		        console.log('err==',err);
		    }
		    else {
		    	var users = [data];
		    	res.send({status:200,data:users});
			}
		});
})

module.exports = router;