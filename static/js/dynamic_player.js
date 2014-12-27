(function() {
	var player = $("#player"),
		playerTrack = $("#player_track"),
		playIcon = $(".play_img"),
		curTrack = playIcon.first().parent(),
		el,
		trackUrl,
		trackName;

	/*
	 * Event Handlers
	 */
	playIcon.on("click", function() {
		$(".track_playing").removeClass('track_playing');

		playTrack(el = $(this).parent());

		player.on('ended', function() {
			el.removeClass('track_playing');
			playTrack(el = el.next());
		});
	});

	function playTrack(el) {
		trackUrl = el.data("track-url");
		trackName = el.find("span").html();

		el.addClass('track_playing');

		player.attr("src", trackUrl);
		playerTrack.html(trackName);

		player[0].play();
	}
})();