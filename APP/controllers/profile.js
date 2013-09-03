function alertHere(){
	Alloy.Collections.locID = 1000068898;
	var guestcard = Alloy.createController("guestcard").getView();
	guestcard.open();
}
