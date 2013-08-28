exports.search= function(lat, lon, radius, beds, budget, pageSize) {
	if(typeof lat === 'undefined' || typeof lon === 'undefined') {
		return []; 
	}
	
	//Setup defaults
	radius = typeof radius !== 'undefined' ? radius : 15;
   	beds = typeof beds !== 'undefined' ? beds : 99;
   	budget = typeof budget !== 'undefined' ? budget : 99999;
   	pageSize = typeof pageSize !== 'undefined' ? pageSize : 20;
   	
   	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		Ti.API.info(this.responseText);
		callback(JSON.parse(this.responseText));
	}
	xhr.open('GET', 'http://bountyhunterapp.appspot.com/bounties');
	xhr.send();
   	
   	
	null;
};
