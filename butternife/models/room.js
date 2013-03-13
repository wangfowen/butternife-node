function Room(id, name) {
	this.id = id;
	this.name = name;
	this.user = [];
	this.playlist = null;
}


Room.prototype.addUser = function(id) {

	if (this.user.indexOf(id) ==  -1) {
		this.user.push(id);
	}
}

Room.prototype.deleteUser = function(id) {
	var userIndex = this.user.indexOf(id);
	if (userIndex > 0) {
		this.user.splice(userIndex, 1);
	}
}