var CCV = CCV || {};

var queryString = 'colouring=chopping&id=1fup&chopping=1fup%20D79-109%5BB%5D%2B225-393%5BB%5D%20D110-224%5BB%5D%20D410-547%5BB%5D%20F43-78%5BB%5D%20F394-409%5BB%5D';

CCV.CCV.on('start', function () {
		Backbone.history.start();
		var controller = new CCV.Controller({
			query: queryString
		});
	});

	// start the cvCCV CCV (defined in cv.CCVlication.js)
	CCV.CCV.start();
