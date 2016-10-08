// api/services/UserService.js

var UserService = {

  /**
   * get a single user from the database
   * 
   */
  getSingleUser: function (options, callback){
    var tempUser = {};

    User.find(options.user_id).exec(function(error, users){
      if (error) {
        // handle error here- e.g. `res.serverError(err);`
        return;

      }else if ( users.length > 0){
        var user = users[0];
   
        tempUser.name = user.firstName + ' ' + user.lastName;
        tempUser.id = user.id;
        tempUser.email = user.email;
        tempUser.contactNumber = user.contactNumber;
        tempUser.designation = user.designation;

      }
      callback(null, tempUser);
    });

  },

};

module.exports = UserService;
