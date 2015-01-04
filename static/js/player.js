var Player = (function() {

	var obj = {};

	var _player, _title;
	var _prev, _play, _next, _vol, _pRange, _vRange;
	var _playlist, _curTrackId, _lastVolume;

	obj.initPlayer = function(title) {
		_title = title;
		_player = new Audio();
		_player.preload = "none";
		_player.volume = 0.5;
	}

	obj.initElements = function(prev, play, next, vol, pRange, vRange) {
		_prev = prev;
		_play = play;
		_next = next;
		_vol = vol;
		_pRange = pRange;
		_vRange = vRange;

		obj.setVolume(50);


		_next.onclick = function() {
			obj.playNext();
		}

		_prev.onclick = function() {
			obj.playPrev();
		}

		_play.onclick = function() {
			_checkPlayig();
		}

		_vRange.oninput = function() {
			obj.setVolume(this.value);
		}

		_pRange.oninput = function() {
			_setTime(this.value);
		}

		_player.ontimeupdate = function() {
			_pRange.value = _player.currentTime;
		}

		_player.onended = function() {
			obj.playNext();
		}

		_vol.onclick = function() {
			if (_player.muted) {
				obj.setVolume(_lastVolume);
				_vol.classList.remove("player_volume_off")
				_vol.classList.add("player_volume_on");
				_player.muted = false;
			} else {
				_lastVolume = _player.volume * 100;
				obj.setVolume(0);
				vol.classList.remove("player_volume_on");
				vol.classList.add("player_volume_off");
				_player.muted = true;
			}
		}
	}

	obj.setPlaylist = function(p) {
		_playlist = p;
		_setTrack(0);
	}

	obj.play = function() {
		_player.play();
		obj.isPlaying = true;
	}

	obj.pause = function() {
		_player.pause();
		obj.isPlaying = false;
	}

	obj.playNext = function() {
		if (_canPlayNext()) {
			_setTrack(_curTrackId + 1);
			_checkPlayig();
			_checkButStatus();
		}
	}

	obj.playPrev = function() {
		if (_canPlayPrev()) {
			_setTrack(_curTrackId - 1);
			_checkPlayig();
			_checkButStatus();
		}
	}

	obj.setVolume = function(vol) {
		_player.volume = vol * 0.01;
		_vRange.value = vol;
	}

	var _canPlayNext = function() {
		if (_curTrackId + 1 < _playlist.length)
			return true;
		return false;
	}

	var _canPlayPrev = function() {
		if (_curTrackId - 1 >= 0)
			return true;
		return false;
	}

	var _setTime = function(time) {
		_player.currentTime = time;
	}

	var _setTrack = function(trackId) {
		_curTrackId = trackId;
		_title.innerHTML = _playlist[_curTrackId].title;
		_player.src = _playlist[_curTrackId].src;
		_setTime(0);
		_setDuration(_playlist[_curTrackId].duration);
	}

	var _checkButStatus = function() {
		/*
		 * Prevent from clicking when player can't play next song
		 */
		_next.disabled = !_canPlayNext();
		_prev.disabled = !_canPlayPrev();
	}

	var _checkPlayig = function() {
		if (_player.paused) {
			_play.classList.remove("player_play");
			_play.classList.add("player_pause");
			obj.play();
		} else {
			_play.classList.remove("player_pause");
			_play.classList.add("player_play");
			obj.pause();
		}
	}

	var _setDuration = function(dur) {
		_pRange.setAttribute("max", dur);
	}

	return obj;
});