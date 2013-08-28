var baseUrl = "http://services.forrent.com/", 
globalResponses = {}, 
tempPos = {
	latitude:0,
	longitude:0
};

function searchFromLatLong(inputLat, inputLong){
	if(inputLat != tempPos.latitude & inputLong != tempPos.longitude){
		tempPos.latitude = inputLat;
		tempPos.longitude = inputLong;
		var url = baseUrl + "ipad.php?latitude=" + inputLat + "&longitude=" + inputLong + "&radius=15&beds=99&maxPrice=9999&numberOfResults=20";
		
		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
				globalResponses = JSON.parse(this.responseText);
				publishResponses();
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
	}
}

function publishResponses(){
	for(var index=0; index < globalResponses.length; index++){
		var result = globalResponses[index],
	 	resultToMap = Ti.Map.createAnnotation();	
		resultToMap.setLatitude(result.latitude);
		resultToMap.setLongitude(result.longitude);
		resultToMap.setTitle(result.name);
		$.view1.addAnnotation(resultToMap);
		result = null;
	}
}

function setMapToFitResults(){
	var olLeft=0, olRight=0, olTop=0, olBottom=0;
	for(var index=0; index < globalResponses.length; index++){
		var result = globalResponses[index];
		if(index===0){
			olLeft=result.longitude;
			olRight=result.longitude;
			olTop=result.latitude;
			olBottom=result.latitude;
		} else {
			if(result.latitude > olTop){
				olTop = result.latitude;
			}
			if(result.latitude < olBottom){
				olBottom = result.latitude;
			}
			if(result.longitude > olRight){
				olRight = result.longitude;
			}
			if(result.longitude < olLeft){
				olLeft = result.longitude;
			}
		}
		result = null;
	}
	var dLat = (olRight - olLeft) + .005;
	var dLon = (olTop - olBottom) + .005;
	$.view1.region = {
        latitude:tempPos.latitude, longitude:tempPos.longitude,
        latitudeDelta:dLat, longitudeDelta:dLon
    };
}

function setRegion(evt) {
    Ti.Geolocation.purpose = "We want to know where you are";
    Ti.Geolocation.getCurrentPosition(function(position){
    	searchFromLatLong(position.coords.latitude, position.coords.longitude);	
        setMapToFitResults();
    });
}