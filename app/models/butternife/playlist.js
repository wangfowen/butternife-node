module.exports = {
	function Playlist(id, name) {
		this.id = id;
		this.name = name;
		this.songs = [];
		this.currentSongId;
		this.currentSongTime;
		this.currentPlayState;
		this.currentSongUpdatedTime;
	}

	Playlist.prototype.addSong = function(song) {
		this.songs.push(song);
	}

	Playlist.prototype.deleteSong = function(id) {
		this.songs.splice(id, 1);
	}
}