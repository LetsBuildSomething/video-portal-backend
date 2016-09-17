/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// inbuilt blueprint action findOne - GET /user/:id
	// gives the full name with the response when requested a user
  	findOne: function (request, response) {
    	User.find(request.params.id).exec(function (error, users) {
      		var user = users[0];
      		// full name
      		user.fullName = user.firstName + ' ' + user.lastName;
      		response.json(user);
    	});
  	}

  	//getUsers - Send all users but not all details : Name, ID, Phone, email, designation
  	getUsers: function(request, response){
  		User.find().exec(function(error, users){
  			var userArray = [];
  			for (user of users){
  				var tempUser;
  				tempUser.fullName = user.firstName + ' ' + user.lastName;
  				tempUser.id = user.id;
  				tempUser.email = user.email;
  				tempUser.contactNumber = user.contactNumber;
  				tempUser.designation = user.designation;
  				userArray.push(json(tempUser));
  			}
  			response.json(userArray);
  		});
  	}

  	// getUser - send limited details od a user
  	getUser: function(request, response){
  		User.find(request.params.id).exec(function(error, users){
  			var user = users[0];
	      	var tempUser = {};
			tempUser.fullName = user.firstName + ' ' + user.lastName;
			tempUser.id = user.id;
			tempUser.email = user.email;
			tempUser.contactNumber = user.contactNumber;
			tempUser.designation = user.designation;
	      	response.json(tempUser);
  		});
  	}

  	// editUser - POST update details with UserID
  	editUser: function(request,response){
  		var data = req.body;
  		User.update(request.params.id, data, function(err, record) {
        	User.tree.fix(function() {
            	response.ok(record);
        	});
    	});
  	}
};
