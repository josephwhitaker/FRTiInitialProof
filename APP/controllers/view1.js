function setRegion(evt) {
    // For the iOS platform, wait for the complete event to ensure the region is set
    var userLoc;
    Ti.Geolocation.purpose = "We want to know where you are";
    Ti.Geolocation.getCurrentPosition(function(position){
        $.view1.region = {
            latitude:position.coords.latitude, longitude:position.coords.longitude,
            latitudeDelta:0.01, longitudeDelta:0.01
        };
    });
}