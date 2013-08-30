var SearchApi = require('search'),
JSONtoSQL = require('JSONtoSQL'),
searchResults = {},
tempPos = {
	latitude:0,
	longitude:0
},
isAndroid = false;

if (Titanium.Platform.name == 'android') {
isAndroid = true;
}

if(isAndroid){
	setRegion();
}


function publishResponses(){
	for(var index=0; index < searchResults.length; index++){
		var result = searchResults[index],
		displayAddress="",
		propObj = {},
	 	resultToMap = Ti.Map.createAnnotation();	
		resultToMap.setLatitude(result.latitude);
		resultToMap.setLongitude(result.longitude);
		resultToMap.setTitle(result.name);
		resultToMap.displayImage = result.images[0];
		resultToMap.floorplans = result.floorplans;
		displayAddress = result.address1;
		if(result.address2 != ""){
			displayAddress += ", " + result.address2;
		}
		displayAddress += ", " + result.city;
		displayAddress += ", " + result.state;
		resultToMap.setSubtitle(displayAddress);
		resultToMap.id = result.site_id;
		resultToMap.addEventListener("click",function(evt){
			evt.annotation.addEventListener("click",function(){openProfile();});
			propObj = {
				floorplans:evt.annotation.floorplans,
				image:evt.annotation.displayImage
			};
			liftAnnotation(propObj);
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
	    		searchResults = res;
				publishResponses();
	    	});
    	}
        setMapToFitResults();
    });
}

function liftAnnotation(propObj){
	$.annFloorPlans.removeAllChildren();
	for(var i=0;i < propObj.floorplans.length; i++){
		var tempLabel = Ti.UI.createLabel({
  			color: '#fff',
  			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  			left: "120dp",
  			top: 20*i + "dp"		
		});
		if(i === 4){
			tempLabel.setText("More...");
		} else {
			tempLabel.setText(propObj.floorplans[i].text);
		}
		$.annFloorPlans.add(tempLabel);
		tempLabel=null;
	}
	$.annImage.setImage(propObj.image);
	$.fauxAnnotation.height = 100;
	$.fauxAnnotation.addEventListener('click',function(){openProfile();});
}

function openProfile(){
	var profile = Alloy.createController("profile").getView();
	if (Ti.Platform.osname === 'iphone')
		profile.open({
			transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	else
		profile.open();
}
