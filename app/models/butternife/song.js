module.exports = {
	function Song(id, name, url, img, artist, album, songDuration, userId) {
		this.id = id;
		this.name = name;
		this.url = url;
		this.img = img;
		this.artist = artist;
		this.album = album;
		this.songDuration = songDuration;
		this.userId = userId;
	}
}