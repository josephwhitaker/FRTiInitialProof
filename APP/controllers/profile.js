function alertHere(){
	var guestcard = Alloy.createController("guestcard").getView();
	guestcard.open();
}

function initProfileLocal(){
	var db = Ti.Database.open(Alloy.CFG.profiles_database);
	db.execute('CREATE TABLE IF NOT EXISTS siteProfile(id INTEGER PRIMARY KEY, name TEXT, address1 TEXT, address2 TEXT, city TEXT, state TEXT, zipcode TEXT, lat REAL, long REAL, phone TEXT, imageURL TEXT);');
    db.close();
}

function emptyProfileLocal(){
	var db = Ti.Database.open(Alloy.CFG.profiles_database);
	db.execute('DELETE FROM siteProfile');
    db.close();
}

function killProfileLocal(){
	var db = Ti.Database.open(Alloy.CFG.profiles_database);
	db.execute('DROP TABLE IF EXISTS siteProfile');
    db.close();
}

function saveProfileToLocalDB(){
	var propObj = Alloy.Collections.result, 
	db = Ti.Database.open(Alloy.CFG.profiles_database);
	db.execute('INSERT INTO siteProfile(id, name, address1, address2, city, state, zipcode, lat, long,  phone, imageURL) VALUES (?,?,?,?,?,?,?,?,?,?, ?)',propObj.site_id,propObj.name,propObj.address1,propObj.address2,propObj.city,propObj.state,propObj.zip,propObj.latitude,propObj.longitude,propObj.phone, propObj.images[0]);
	//db.execute('INSERT INTO siteProfile(id, name) VALUES (?,?)',propObj.site_id,propObj.name);
	db.close();
	readFromLocalDB();
}

function readFromLocalDB(){
	var db = Ti.Database.open(Alloy.CFG.profiles_database);
	var dbReturn = db.execute("Select * from siteProfile");
	Ti.API.info(dbReturn.fieldByName("id"));
	Ti.API.info(dbReturn.fieldByName("name"));
	Ti.API.info(dbReturn.fieldByName("address1"));
	Ti.API.info(dbReturn.fieldByName("address2"));
	Ti.API.info(dbReturn.fieldByName("city"));
	Ti.API.info(dbReturn.fieldByName("state"));
	Ti.API.info(dbReturn.fieldByName("zipcode"));
	Ti.API.info(dbReturn.fieldByName("lat"));
	Ti.API.info(dbReturn.fieldByName("long"));
	Ti.API.info(dbReturn.fieldByName("phone"));
	db.close();
}
initProfileLocal();
