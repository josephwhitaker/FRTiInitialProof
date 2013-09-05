var view1 = Alloy.createController("view1").getView();
Alloy.Globals.parent = $.win;
$.win.navBarHidden=false;
$.win.add(view1);
if (Ti.Platform.osname === 'iphone')
	$.win.open({
		transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
else
	$.win.open();
