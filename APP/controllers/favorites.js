var dbAccess = require('saveProfiles'),
	tableFav = $.sectionFav,
	retFaves = dbAccess.getFavNameId();

for(var index=0;index<retFaves.length;index++){
	var row = Ti.UI.createTableViewRow();
	row.title = retFaves[index].name;
	tableFav.add(row);
}
