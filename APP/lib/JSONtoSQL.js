exports.JSONtoSQL= function(JSONInput, dbName, tableName) {
	Ti.API.info(JSONInput);
	var db = Ti.Database.open(dbName), timeIn = new Date().getTime();
	db.execute("CREATE TABLE IF NOT EXISTS "+tableName+"(id INTEGER PRIMARY KEY, name TEXT, address1 TEXT, address2 TEXT, city TEXT, state TEXT, zipcode TEXT, phone TEXT, latitude NUMERIC, longitude NUMERIC,timeStamp NUMBERIC);");
	for(var index=0;index<JSONInput.length;index++){
		var statement = "INSERT INTO "+tableName+" (id,name,address1,address2,city,state,zipcode,phone,latitude,longitude,timeStamp) values (";
		statement += JSONInput[index].site_id +",'"+ JSONInput[index].name +"','"+ JSONInput[index].address1 +"','"+ JSONInput[index].address2 +"'";
		statement += ",'"+ JSONInput[index].city +"','"	+ JSONInput[index].state +"','"+ JSONInput[index].zip +"','"+ JSONInput[index].phone  +"'";
		statement += ","+ JSONInput[index].latitude  +","+ JSONInput[index].longitude  +" ," + timeIn + ")";
		Ti.API.info(statement);
		db.execute(statement);
	}
	db.close();
};

exports.deleteDataBase = function(dbName, tableName){
	var db = Ti.Database.open(dbName);
	db.execute('DROP TABLE IF EXISTS '+tableName);
	db.close();
};

exports.cleanUpDataBase= function(dbName, tableName, durationInSeconds){
	var now = new Date().getTime();
	var cleanBefore = now - durationInSeconds;
	var db = Ti.Database.open(dbName);
	db.execute("DELETE from "+ tableName +" where timeStamp <= "+ cleanBefore);
	db.close();
};

exports.SQLtoJSON = function(dbName, tableName) {
	var db = Ti.Database.open(dbName);
	var rows = db.execute("SELECT id,name,address1,address2,city,state,zipcode,phone,latitude,longitude,timeStamp from "+tableName);
	if(rows.rowCount) {
		var arr = [];
		while(rows.isValidRow()) {
	   		var obj = {};
	    	for(i=0; i<rows.fieldCount; i++) {
	      		obj[rows.fieldName(i)] = rows.field(i);
	      		arr.push(obj);
    		}
	 		rows.next();
		}
		Ti.API.info(arr);
	}
	db.close();
};
