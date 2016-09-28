/**
 * PlaylistController
 *
 * @description :: Server-side logic for managing playlists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//getUsersWhoCanAnswerComments - Send users list who can answer comments with contact details 
  	getUsersWhoCanAnswerComments: function(request, response){
  		var playlist = sails.middleware.blueprints.findOne(request, response);
  		
  		Playlist.find(request.params.playlist_id).exec(function(error, playlists){
  			if (error) {
    			// handle error here- e.g. `res.serverError(err);`
    			return;
  			}
  			playlist = playlists[0];
  		});

  		User.find(id in playlist[users_who_can_answer_comments]).exec(function(error, users){
  			if (error) {
    			// handle error here- e.g. `res.serverError(err);`
    			return;
  			}
  			var userArray = [];
  			for (user of users){
  				var tempUser = {};
  				tempUser.id = user.id;
  				tempUser.email = user.email;
  				tempUser.contactNumber = user.contactNumber;
  				userArray.push(tempUser);
  			}
  			response.json(userArray);
  		});
  	},
};

