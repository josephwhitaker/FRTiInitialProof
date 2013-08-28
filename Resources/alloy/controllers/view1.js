function Controller() {
    function searchFromLatLong(inputLat, inputLong) {
        if (inputLat != tempPos.latitude & inputLong != tempPos.longitude) {
            tempPos.latitude = inputLat;
            tempPos.longitude = inputLong;
            var url = baseUrl + "ipad.php?latitude=" + inputLat + "&longitude=" + inputLong + "&radius=15&beds=99&maxPrice=9999&numberOfResults=20";
            var client = Ti.Network.createHTTPClient({
                onload: function() {
                    globalResponses = JSON.parse(this.responseText);
                    publishResponses();
                },
                onerror: function(e) {
                    Ti.API.debug(e.error);
                    alert("error");
                },
                timeout: 5e3
            });
            client.open("GET", url);
            client.send();
        }
    }
    function publishResponses() {
        for (var index = 0; globalResponses.length > index; index++) {
            var result = globalResponses[index], resultToMap = Ti.Map.createAnnotation();
            resultToMap.setLatitude(result.latitude);
            resultToMap.setLongitude(result.longitude);
            resultToMap.setTitle(result.name);
            $.view1.addAnnotation(resultToMap);
            result = null;
        }
    }
    function setMapToFitResults() {
        var olLeft = 0, olRight = 0, olTop = 0, olBottom = 0;
        for (var index = 0; globalResponses.length > index; index++) {
            var result = globalResponses[index];
            if (0 === index) {
                olLeft = result.longitude;
                olRight = result.longitude;
                olTop = result.latitude;
                olBottom = result.latitude;
            } else {
                result.latitude > olTop && (olTop = result.latitude);
                olBottom > result.latitude && (olBottom = result.latitude);
                result.longitude > olRight && (olRight = result.longitude);
                olLeft > result.longitude && (olLeft = result.longitude);
            }
            result = null;
        }
        var dLat = olRight - olLeft + .005;
        var dLon = olTop - olBottom + .005;
        $.view1.region = {
            latitude: tempPos.latitude,
            longitude: tempPos.longitude,
            latitudeDelta: dLat,
            longitudeDelta: dLon
        };
    }
    function setRegion() {
        Ti.Geolocation.purpose = "We want to know where you are";
        Ti.Geolocation.getCurrentPosition(function(position) {
            searchFromLatLong(position.coords.latitude, position.coords.longitude);
            setMapToFitResults();
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "view1";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId1 = [];
    $.__views.view1 = Ti.Map.createView({
        annotations: __alloyId1,
        id: "view1",
        ns: Ti.Map,
        animate: "true",
        regionFit: "true",
        userLocation: "true",
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views.view1 && $.addTopLevelView($.__views.view1);
    setRegion ? $.__views.view1.addEventListener("complete", setRegion) : __defers["$.__views.view1!complete!setRegion"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var baseUrl = "http://services.forrent.com/", globalResponses = {}, tempPos = {
        latitude: 0,
        longitude: 0
    };
    __defers["$.__views.view1!complete!setRegion"] && $.__views.view1.addEventListener("complete", setRegion);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;