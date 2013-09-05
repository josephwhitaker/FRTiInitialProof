
exports.initProfileLocal = function(){
	var db = Ti.Database.open(Alloy.CFG.profiles_database);
	db.execute('CREATE TABLE IF NOT EXISTS siteProfile(id INTEGER PRIMARY KEY, name TEXT, address1 TEXT, address2 TEXT, city TEXT, state TEXT, zipcode TEXT, lat REAL, long REAL, phone TEXT, imageURL TEXT);');
    db.close();
};

exports.emptyProfileLocal = function(){
	var db = Ti.Database.open(Alloy.CFG.profiles_database);
	db.execute('DELETE FROM siteProfile');
    db.close();
};

exports.killProfileLocal = function(){
	var db = Ti.Database.open(Alloy.CFG.profiles_database);
	db.execute('DROP TABLE IF EXISTS siteProfile');
    db.close();
};

exports.saveProfileToLocalDB = function(){
	var propObj = Alloy.Collections.result, 
	db = Ti.Database.open(Alloy.CFG.profiles_database);
	db.execute('INSERT INTO siteProfile(id, name, address1, address2, city, state, zipcode, lat, long,  phone, imageURL) VALUES (?,?,?,?,?,?,?,?,?,?,?)',propObj.site_id,propObj.name,propObj.address1,propObj.address2,propObj.city,propObj.state,propObj.zip,propObj.latitude,propObj.longitude,propObj.phone, propObj.images[0]);
	//db.execute('INSERT INTO siteProfile(id, name) VALUES (?,?)',propObj.site_id,propObj.name);
	db.close();
	readFromLocalDB();
};

exports.readFromLocalDB = function(){
	var db = Ti.Database.open(Alloy.CFG.profiles_database);
	var dbReturn = db.execute("Select * from siteProfile");
	db.close();
};


exports.getFavNameId = function(){
	var db = Ti.Database.open(Alloy.CFG.profiles_database),
		retVal = [],
		dbReturn = db.execute("Select id, name from siteProfile");
	for(var index=0;index < dbReturn.rowCount; index++){
		retVal.push({
			id: dbReturn.fieldByName("id"), 
			name: dbReturn.fieldByName("name")
		});
		dbReturn.next();
	};
	db.close();
	return retVal;
};