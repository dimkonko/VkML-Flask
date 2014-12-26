(function() {
	var player = $("#player"),
		playerTrack = $("#player_track"),
		playIcon = $(".play_img"),
		curTrack = playIcon.first().parent();

	/*
	 * Event Handlers
	 */
	playIcon.on("click", function() {
		playTrack(el = $(this).parent());

		player.on('ended', function() {
			el.removeClass('track_playing');
			playTrack(el = el.next());
		});
	});

	function playTrack(el) {
		var icon = el.find('.play_img'),
		trackUrl = el.data("track-url"),
		trackName = el.find("span").html();

		el.addClass('track_playing');

		icon.removeClass('play_img_not_playing')
		.addClass('play_img_playing');

		player.attr("src", trackUrl);
		playerTrack.html(trackName);

		player[0].play();
	}
})();