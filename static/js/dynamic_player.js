(function() {
	var player = document.getElementById("player"),
		player_track = document.getElementById("player_track");

	var track_list = $(".play_img");

	var curTrack;

	// Init player with first track
	initPlayer();

	/*
	 * Event Handlers
	 */
	track_list.on("click", function() {
		if(curTrack === $(this)) {
			player.autoplay = false;
			player.pause();
		} else {
			playTrack($(this));
			player.autoplay = true;
		}
	});


	function initPlayer() {
		playTrack($(".play_img").first())
		player.autoplay = false;
	};

	function playTrack(trackFromList) {
		var track = trackFromList.parent();
			track_url = track.find("input").val(),
			track_name = track.find("span").html();

	    player.src = track_url;
	    player_track.innerHTML = track_name;

	    curTrack = trackFromList;
	}
})();