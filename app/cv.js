var queryString = 'colouring=chopping&id=1fup&chopping=1fup%20D79-109%5BB%5D%2B225-393%5BB%5D%20D110-224%5BB%5D%20D410-547%5BB%5D%20F43-78%5BB%5D%20F394-409%5BB%5D';

app.App.on('start', function () {
		Backbone.history.start();
		var controller = new app.Controller();

		controller.start();
	});

	// start the TodoMVC app (defined in js/TodoMVC.js)
	app.App.start();
