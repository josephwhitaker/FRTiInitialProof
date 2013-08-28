function Controller() {
    function setRegion() {
        Ti.Geolocation.purpose = "We want to know where you are";
        Ti.Geolocation.getCurrentPosition(function(position) {
            $.view1.region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: .01,
                longitudeDelta: .01
            };
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
    __defers["$.__views.view1!complete!setRegion"] && $.__views.view1.addEventListener("complete", setRegion);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;