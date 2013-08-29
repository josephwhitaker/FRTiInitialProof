var SearchApi = require('search'),
JSONtoSQL = require('JSONtoSQL'),
searchResults = {},
tempPos = {
	latitude:0,
	longitude:0
};


function publishResponses(){
	for(var index=0; index < searchResults.length; index++){
		var result = searchResults[index],
		displayAddress="",
	 	resultToMap = Ti.Map.createAnnotation();	
		resultToMap.setLatitude(result.latitude);
		resultToMap.setLongitude(result.longitude);
		resultToMap.setTitle(result.name);
		displayAddress = result.address1;
		if(result.address2 != ""){
			displayAddress += ", " + result.address2;
		}
		displayAddress += ", " + result.city;
		displayAddress += ", " + result.state;
		resultToMap.setSubtitle(displayAddress);
		resultToMap.id = result.site_id;
		resultToMap.addEventListener("click",function(evt){
			liftAnnotation(150);
		});
		$.view1.addAnnotation(resultToMap);
		result = null;
		resultToMap = null;
	}
}

function setMapToFitResults(){
	var olLeft=0, olRight=0, olTop=0, olBottom=0;
	for(var index=0; index < searchResults.length; index++){
		var result = searchResults[index];
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
    	if(position.coords.latitude != tempPos.latitude & position.coords.longitude != tempPos.longitude){
			tempPos.latitude = position.coords.latitude;
			tempPos.longitude = position.coords.longitude;
	    	SearchApi.search(tempPos.latitude, tempPos.longitude, function(res){
	    		//JSONtoSQL.JSONtoSQL(res,"searchResults","results");
	    		searchResults = res;
				publishResponses();
	    	});
    	}
        setMapToFitResults();
    });
}

var animateUp = Ti.UI.createAnimation({
	height : 100,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	duration : 250
});

var animateDown = Ti.UI.createAnimation({
	height : 0,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	duration : 250
});

function liftAnnotation(inputHeight){
	$.fauxAnnotation.height = 100;
}