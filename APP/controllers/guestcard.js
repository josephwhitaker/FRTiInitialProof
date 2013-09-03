var parseQS, baseURL="http://www.forrent.com/guestcard/", suffix=".php";

function goToURL(locID){
	$.guestcard.url = baseURL + locID + suffix;
};