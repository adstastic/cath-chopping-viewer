var CV = CV || {};

var queryString = 'colouring=chopping&id=1fup&chopping=1fup%20D79-109%5BB%5D%2B225-393%5BB%5D%20D110-224%5BB%5D%20D410-547%5BB%5D%20F43-78%5BB%5D%20F394-409%5BB%5D';

CV.App.on('start', function () {
		Backbone.history.start();
		var controller = new CV.Controller({
			query: queryString
		});
		controller.start();
	});

	// start the app (defined in cv.Application.js)
	CV.App.start();
