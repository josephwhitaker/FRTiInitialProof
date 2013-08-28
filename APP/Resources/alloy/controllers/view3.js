function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "view3";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.view3 = Ti.UI.createView({
        id: "view3"
    });
    $.__views.view3 && $.addTopLevelView($.__views.view3);
    var __alloyId9 = [];
    $.__views.timap = Ti.Map.createView({
        annotations: __alloyId9,
        ns: Ti.Map,
        id: "timap"
    });
    $.__views.view3.add($.__views.timap);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.addEventListener("sliderToggled", function(e) {
        $.timap.touchEnabled = e.hasSlided ? false : true;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;