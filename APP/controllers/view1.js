var SearchApi = require('search'),
JSONtoSQL = require('JSONtoSQL'),
searchResults = {},
tempPos = {
	latitude:0,
	longitude:0
},
isAndroid = false;

if (Titanium.Platform.name == 'android') {isAndroid = true;}

if(isAndroid){
	setRegion();
	$.fauxAnnotation.height = 0;
	$.fauxAnnotation.width = 0;
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
		resultToMap.image = "/pushpin.png";
		if(isAndroid !== true){
			resultToMap.addEventListener("click",function(evt){
				evt.annotation.addEventListener("click",function(){openProfile();});
				propObj = {
					floorplans:evt.annotation.floorplans,
					image:evt.annotation.displayImage
				};
				liftAnnotation(propObj);
			});
		}		
		$.view1.addAnnotation(resultToMap);
		result = null;
		resultToMap = null;
	}
	if(isAndroid){
		$.view1.addEventListener('click',function(evt){
			propObj = {
				floorplans:evt.annotation.floorplans,
				image:evt.annotation.displayImage
			};
			liftAnnotation(propObj);
		});
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
	if(!isAndroid){
    	Ti.Geolocation.purpose = "We want to know where you are";
   	}
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
  			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  			left: "120dp",
  			top: 20*i + "dp"		
		});
		if(!isAndroid){
			tempLabel.color = "#fff";
		} else {
			tempLabel.color = "#000";
		}
		if(i === 4){
			tempLabel.setText("More...");
			i = propObj.floorplans.length;
		} else {
			tempLabel.setText(propObj.floorplans[i].text);
		}
		$.annFloorPlans.add(tempLabel);
		tempLabel=null;
	}
	$.annImage.setImage(propObj.image);
	if (isAndroid){
		$.fauxAnnotation.backgroundColor = "#fff";
		$.fauxAnnotation.left = 20;
		$.fauxAnnotation.top = 20;
		$.annImage.height = 100;
		$.annImage.width = 100;
		$.annImage.top = 10;
		$.annImage.left = 10;
		$.annImage.bottom = 20;
		$.annFloorPlans.right = 10;
	} else {
		$.fauxAnnotation.height = 125;
	}
	$.fauxAnnotation.addEventListener('click',function(){openProfile();});
}

function openProfile(){
	if (isAndroid){	
		$.view1.removeAllChildren();
		$.view1.removeEventListener('click',function(evt){
				propObj = {
					floorplans:evt.annotation.floorplans,
					image:evt.annotation.displayImage
				};
				liftAnnotation(propObj);
			});			
		var profile = Alloy.createController("profile").getView();
		profile.open();
	}else{
		var profile = Alloy.createController("profile").getView();
		profile.open({
			transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	}
}
