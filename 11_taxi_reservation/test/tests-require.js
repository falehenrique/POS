/*global app: false, Backbone: false, QUnit: false, $: false, require: false*/

(function (root) {
    "use strict";

	// A list of all QUnit test Modules.  Make sure you include the `.js` 
	// extension so RequireJS resolves them as relative paths rather than using
	// the `baseUrl` value supplied above.
	root.tests = [
		"app/init.test.js",
		"app/core/appParameters.test.js",
		"app/core/strings.test.js",
		"app/core/stringtable.test.js",
		"app/core/core.test.js",
		"app/core/client.test.js",
		"app/modules/modules.test.js",
		"app/views/footer.test.js",
		"app/views/header.test.js"
	];

    root.require.paths.qunit = "../../test/libs/qunit/qunit/qunit";
    root.require.shim.qunit = {
        exports: 'QUnit',
        init: function () {
            QUnit.config.autoload = false;
            QUnit.config.autostart = false;
        }
    };
    root.require.paths.sinon = "../../test/libs/sinonjs/sinon";
    root.require.shim.sinon = {
        exports: 'sinon'
    };

    /* Every test depends on init */
    root.tests.forEach(function (unit) {
        root.require.shim[unit] = {
            deps: ['init', 'qunit', 'sinon']
        };
    });

}(window));