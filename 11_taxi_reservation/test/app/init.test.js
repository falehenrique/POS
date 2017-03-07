/*global app: false, QUnit: false, define: false, $: false, sinon: false, Backbone: false */

define(function (require) {
    "use strict";

    // Define the QUnit module and life cycle.
    QUnit.module("init");

    QUnit.test('Initialization of app components', function (assert) {
        QUnit.expect(3);
		var result, error;

        /* System undoing PREPARE */
        this.tempHome = app.mod.home;
        app.mod.home = {};
        app.mod.home.View = Backbone.View.extend({
            className: 'home page',
            render: function () {
                return this.$el[0];
            }
        });
        this.clock = sinon.useFakeTimers();
        $("<div>").addClass("wrap").appendTo("#qunit-fixture");
        /* System undoing PREPARE END */

        error = null;
		try {
			app.initializer.system();
            this.clock.tick(100);

			result = true;
		} catch (error_sys) {
			result = false;
            error = error_sys;
		}
		assert.ok(result, "Must init system without exceptions." + (error ? " exception: " + error : ""));

        /* System undoing */
        Backbone.history.stop();
        
        app.slider.off();
        app.slider.unbind();
        app.slider.remove();
        $(".wrap").remove();

        app.router.off();
        app.router.unbind();
        app.mod.home = this.tempHome;
        
        this.clock.restore();
        /* System undoing END*/

        error = null;
		try {
			app.initializer.data();
			result = true;
		} catch (error_data) {
			result = false;
            error = error_data;
		}
		assert.ok(result, "Must init data without exceptions" + (error ? " exception: " + error : ""));

        error = null;
		try {
			app.initializer.cache();
			result = true;
		} catch (error_cache) {
			result = false;
            error = error_cache;
		}
		assert.ok(result, "Must init cache without exceptions" + (error ? " exception: " + error : ""));

    });

});