var parseQS, baseURL="http://forrent.jwhitaker.frlabs.com/guestcard/", suffix=".php?iframe=1", locID;
locID = Alloy.Collections.locID;
$.guestcard.url = baseURL + locID + suffix;