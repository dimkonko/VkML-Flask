// var Player = (function() {

// 	var _player,
// 		_title,
// 		_playlist,
// 		_curTrackId;
// 	var isPlaying = false;


// 	var initPlayer = function(player, title) {
// 		_player = player;
// 		_title = title;
// 		_player.volume = 0.5;
// 	}

// 	var setPlaylist = function(p) {
// 		_playlist = p;
// 		_setTrack(0);
// 	}

// 	function play() {
// 		_player.load();
// 		_player.play();
// 		isPlaying = true;
// 	}

// 	function pause() {
// 		_player.pause();
// 		isPlaying = false;
// 	}

// 	var playNext = function() {
// 		if (canPlayNext) {
// 			_setTrack(_curTrackId + 1);
// 			play();
// 		} else {
// 			_setTrack(0);
// 		}
// 	}

// 	var playPrev = function() {
// 		if (canPlayPrev) {
// 			_setTrack(_curTrackId - 1);
// 			play();
// 		}
// 	}

// 	var canPlayNext = function() {
// 		if (_curTrackId + 1 < _playlist.length)
// 			return true;
// 		return false;
// 	}

// 	var canPlayPrev = function() {
// 		if (_curTrackId - 1 >= 0)
// 			return true;
// 		return false;
// 	}

// 	var _setTrack = function(trackId) {
// 		_curTrackId = trackId;
// 		console.log(_playlist[_curTrackId].title)
// 		_title.innerHTML = _playlist[_curTrackId].title;
// 		_player.src = _playlist[_curTrackId].src;
// 	}

// 	return {
// 		initPlayer: initPlayer,
// 		setPlaylist: setPlaylist,
// 		play: play,
// 		pause: pause,
// 		playNext: playNext,
// 		playPrev: playPrev,
// 		canPlayNext: canPlayNext,
// 		canPlayPrev: canPlayPrev,
// 		isPlaying: isPlaying
// 	};
// });
var Player = (function() {

	var obj = {};

	var _player,
		_title,
		_playlist,
		_curTrackId;


	obj.initPlayer = function(player, title) {
		_player = player;
		_title = title;
		_player.volume = 0.5;
		obj.isPlaying = false;
	}

	obj.setPlaylist = function(p) {
		_playlist = p;
		_setTrack(0);
	}

	obj.play = function() {
		_player.load();
		_player.play();
		obj.isPlaying = true;
	}

	obj.pause = function() {
		_player.pause();
		obj.isPlaying = false;
	}

	obj.playNext = function() {
		if (obj.canPlayNext) {
			_setTrack(_curTrackId + 1);
			obj.play();
		} else {
			_setTrack(0);
		}
	}

	obj.playPrev = function() {
		if (obj.canPlayPrev) {
			_setTrack(_curTrackId - 1);
			obj.play();
		}
	}

	obj.canPlayNext = function() {
		if (_curTrackId + 1 < _playlist.length)
			return true;
		return false;
	}

	obj.canPlayPrev = function() {
		if (_curTrackId - 1 >= 0)
			return true;
		return false;
	}

	obj.setVolume = function(vol) {
		player.volume = vol;
	}

	obj.getVolume = function(vol) {
		return _player.volume;
	}

	obj.setTime = function(time) {
		player.currentTime = time;
	}

	obj.getTime = function() {
		return _player.currentTime;
	}

	var _setTrack = function(trackId) {
		_curTrackId = trackId;
		_title.innerHTML = _playlist[_curTrackId].title;
		_player.src = _playlist[_curTrackId].src;
	}

	return obj;
});

window.onload = function() {

	var butPlayerNext = document.getElementById("player_next"),
		butPlayerPrev = document.getElementById("player_prev"),
		butPlayerPlay = document.getElementById("player_play"),
		volumeRange = document.getElementById("player_volume_range"),
		playerRange = document.getElementById("player_range");

	var player = new Player();

	function init() {
		var dom_track_list = document.getElementById("track_list").children;

		player.initPlayer(document.getElementById("player"),
			document.getElementById("player_title"));

		var playlist = [];

		for (var i = 0; i < dom_track_list.length; i++) {
			var elements = dom_track_list[i].children;
			var track = new Track(
				// elements[0],
				elements[1].innerHTML,
				elements[2].href
			);
			playlist.push(track);
		}

		player.setPlaylist(playlist);
		playerRange.value = player.getTime();
		volumeRange.value = player.getVolume() * 100;

		function Track(title, src) {
			this.title = title;
			this.src = src;
		}
	}

	init();

	console.log(player.getVolume());

	butPlayerNext.onclick = function() {
		player.playNext();
		checkButStatus();
		if (!player.isPlaying)
			checkPlayig();
	}

	butPlayerPrev.onclick = function() {
		player.playPrev();
		checkButStatus();
	}

	butPlayerPlay.onclick = function() {
		checkPlayig();
	}

	volumeRange.oninput = function() {
		player.setVolume(this.value * 0.01);
	}

	playerRange.oninput = function() {
		player.setTime(this.value);
	}

	function checkButStatus() {
		/*
		 * Prevent from clicking when player can't play next song
		 */
		butPlayerNext.disabled = !player.canPlayNext();
		butPlayerPrev.disabled = !player.canPlayPrev();
	}

	function checkPlayig() {
		if (player.isPlaying) {
			player.pause();
			butPlayerPlay.classList.remove("player_pause")
			butPlayerPlay.classList.add("player_play");
		} else {
			player.play();
			butPlayerPlay.classList.remove("player_play")
			butPlayerPlay.classList.add("player_pause");
		}
	}
};