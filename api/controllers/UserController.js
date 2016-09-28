/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// inbuilt blueprint action findOne - GET /user/:user_id
	// gives the full name with the response when requested a user
  	findOne: function (request, response) {
    	User.find(request.params.user_id).exec(function (error, users) {
      		if (error) {
    			// handle error here- e.g. `res.serverError(err);`
    			return;
  			}
      		var user = users[0];
      		// full name
      		user.fullName = user.firstName + ' ' + user.lastName;
      		response.json(user);
    	});
  	},

  	//getUsers - Send all users but not all details : Name, ID, Phone, email, designation
  	getUsers: function(request, response){
  		User.find().exec(function(error, users){
  			if (error) {
    			// handle error here- e.g. `res.serverError(err);`
    			return;
  			}
  			var userArray = [];
  			for (user of users){
  				var tempUser = {};
  				tempUser.fullName = user.firstName + ' ' + user.lastName;
  				tempUser.id = user.id;
  				tempUser.email = user.email;
  				tempUser.contactNumber = user.contactNumber;
  				tempUser.designation = user.designation;
  				userArray.push(tempUser);
  			}
  			response.json(userArray);
  		});
  	},

  	// getUser - send limited details od a user
  	getUser: function(request, response){
  		User.find(request.params.user_id).exec(function(error, users){
  			 if (error) {
    			 // handle error here- e.g. `res.serverError(err);`
    			 return;
  			 }
  			 var user = users[0];
	       var tempUser = {};
			   tempUser.fullName = user.firstName + ' ' + user.lastName;
			   tempUser.id = user.id;
			   tempUser.email = user.email;
			   tempUser.contactNumber = user.contactNumber;
			   tempUser.designation = user.designation;
	       response.json(tempUser);
  		});
  	},

  	// editUser - POST update details with UserID
  	editUser: function(request,response){
  		var data = request.body;
  		User.update(request.params.user_id, data, function(error, updated) {
        	if (error) {
    			// handle error here- e.g. `res.serverError(err);`
    			return;
  			}

  			console.log('Updated user to have name ' + updated[0].name);
  			response.json(updated);
    	});
  	}
};
