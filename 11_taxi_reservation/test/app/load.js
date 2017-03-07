/*global app: false, Backbone: false, QUnit: false, $: false, require: false*/

(function (root) {
    "use strict";

	// Require js configuration
	require.config({
		baseUrl: "../src/app"
	});

	// Boostraps the appliction  
	require(root.tests, function () {
		QUnit.load();
		QUnit.start();
	});
}(window));