window.onload = function() {

	var player = new Player();
	var dom_track_list = document.getElementById("track_list").children;

	player.initPlayer(document.getElementById("player_title"));
	player.initElements(document.getElementById("player_prev"),
		document.getElementById("player_play"),
		document.getElementById("player_next"),
		document.getElementById("player_volume"),
		document.getElementById("player_range"),
		document.getElementById("player_volume_range")
	);

	var playlist = [];

	for (var i = 0; i < dom_track_list.length; i++) {
		var elements = dom_track_list[i].children;
		var track = new Track(
			// elements[0],
			elements[1].innerHTML,
			elements[2].href,
			dom_track_list[i].dataset.duration
		);
		playlist.push(track);
	}

	player.setPlaylist(playlist);

	function Track(title, src, duration) {
		this.title = title;
		this.src = src;
		this.duration = duration;
	}
};