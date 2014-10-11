(function() {
	var player = document.getElementById("player"),
		player_track = document.getElementById("player_track");

	var track_list = $(".track img");

	track_list.on("click", function() {
		var track = $(this).parent();
			track_url = track.find("input").val(),
			track_name = track.find("span").html();

	    player.src = track_url;
	    player_track.innerHTML = track_name;
	});
})();