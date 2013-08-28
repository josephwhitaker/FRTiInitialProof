function setRegion(evt) {
    // For the iOS platform, wait for the complete event to ensure the region is set
    var loc = Ti.Geolocation.getCurrentPosition()
    Ti.API.info(loc);
    if (OS_IOS) {
        $.view1.region = {
            latitude:37.390749, longitude:-122.081651,
            latitudeDelta:0.01, longitudeDelta:0.01
        };
    }
}