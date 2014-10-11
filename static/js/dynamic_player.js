(function() {
	var track_list = $(".track img");

	track_list.on("click", function() {
		var track = $(this).parent();
			track_url = track.find("input").val();

	    document.getElementById("player").src = track_url;
	});
});