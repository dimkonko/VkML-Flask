(function() {
	var play_icon = "static/img/play-icon.png",
		pause_icon = "static/img/pause-icon.png";

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
		playTrack($(this));
	    curTrack.attr("id", "track_playing");

		player.autoplay = true;
	});


	function initPlayer() {
		curTrack = $(".play_img").first();
		playTrack(curTrack);
		player.autoplay = false;
		curTrack.find(".play_img").attr("src", play_icon);
	};

	function playTrack(trackFromList) {
		var track = trackFromList.parent();
			track_url = track.find("input").val(),
			track_name = track.find("span").html();

		curTrack.removeAttr("id");
		curTrack.find(".play_img").attr("src", play_icon);

	    player.src = track_url;
	    player_track.innerHTML = track_name;

	    trackFromList.attr("src", pause_icon);
	    curTrack = track;
	}
})();