var dbAccess = require('saveProfiles');

function alertHere(){
	var guestcard = Alloy.createController("guestcard").getView();
	guestcard.open();
}

function saveProfileToLocalDB(){
	dbAccess.saveProfileToLocalDB();
}
dbAccess.initProfileLocal();
