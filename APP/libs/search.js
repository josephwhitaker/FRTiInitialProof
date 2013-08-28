exports.search= function(lat, lon, callBack /*, radius, beds, budget, pageSize */) {
	if(typeof lat === 'undefined' || typeof lon === 'undefined') {
		return []; 
	}
	
	//Setup defaults
	radius = typeof radius !== 'undefined' ? radius : 15;
   	beds = typeof beds !== 'undefined' ? beds : 99;
   	budget = typeof budget !== 'undefined' ? budget : 99999;
   	pageSize = typeof pageSize !== 'undefined' ? pageSize : 20;
   	
	tempPos.latitude = inputLat;
	tempPos.longitude = inputLong;
	var url = Alloy.CFG.FRApi-SearchEndpoint + "ipad.php?latitude=" + lat + "&longitude=" + lon + "&radius=15&beds=99&maxPrice=9999&numberOfResults=20";
	
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			callBack(JSON.parse(this.responseText));
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 5000 // in milliseconds
	});
	client.open("GET", url);
	client.send();
   	
   	
	null;
};
