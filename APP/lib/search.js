exports.search= function(lat, lon, callBack /*, radius, beds, budget, pageSize */) {
	if(typeof lat === 'undefined' || typeof lon === 'undefined') {
		return []; 
	}
	   	
	var url = Alloy.CFG.FRApi_SearchEndpoint + "?latitude=" + lat + "&longitude=" + lon + "&radius=15&beds=99&maxPrice=9999&numberOfResults=20";
	
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			callBack(JSON.parse(this.responseText));
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			Ti.API.info(url);
			Ti.API.debug(JSON.stringify(e));
			alert('error');
		},
		timeout : 5000 // in milliseconds
	});
	client.open("GET", url);
	client.send();
};
