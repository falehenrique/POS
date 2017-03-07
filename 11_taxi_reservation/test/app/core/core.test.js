/*global app: false, QUnit: false, define: false, $: false, sinon: false, consts: false, Backbone: false */

define(function (require) {
    "use strict";

    // Import dependencies (note you can use relative paths here)

    // Define the QUnit module and life cycle.
    QUnit.module("core", {
        setup: function () {
            this.tempHome = app.mod.home;
            app.mod.home = {};
            app.mod.home.View = Backbone.View.extend({
                className: 'home page',
                render: function () {
                    return this.$el[0];
                }
            });
            app.mod.tempA = {};
            app.mod.tempA.View = Backbone.View.extend({
                className: 'tempA page',
                render: function () {
                    return this.$el[0];
                }
            });
            app.mod.tempB = {};
            app.mod.tempB.View = Backbone.View.extend({
                className: 'tempB page',
                render: function () {
                    return this.$el[0];
                }
            });
            app.mod.tempC = {};
            app.mod.tempC.View = Backbone.View.extend({
                className: 'tempC page',
                render: function () {
                    return this.$el[0];
                }
            });
            app.mod.tempD = {};
            app.mod.tempD.View = Backbone.View.extend({
                className: 'tempD page',
                render: function () {
                    return this.$el[0];
                }
            });

            $("<div>").addClass("wrap").appendTo("#qunit-fixture");

            //window.location.href = "";
            app.slider = new app.view.Slider({
                el: '.wrap'
            });
            app.router = new app.Router();
            Backbone.history.start();

        },
        teardown: function () {
            Backbone.history.stop();

            app.slider.off();
            app.slider.unbind();
            app.slider.remove();

            app.router.off();
            app.router.unbind();

            $(".wrap").remove();
            app.mod.tempA = undefined;
            app.mod.tempB = undefined;
            app.mod.tempC = undefined;
            app.mod.tempD = undefined;
            app.mod.home = this.tempHome;
        }
    });

    QUnit.test('core print basic', function (assert) {
        QUnit.expect(1);
        sinon.stub(window, 'print');

        app.core.print();
        assert.ok(window.print.calledOnce, 'print a page with core function');
        
        /* retore from dummy stub */
        window.print.restore();

    });

    QUnit.asyncTest("(asynchronous test) core load page using #", function (assert) {
        QUnit.expect(1);
        var $node;
        app.core.load("#tempA");
        setTimeout(function () {
            $node = $(".page.tempA");
            assert.ok($node.length === 1, 'should load a page using #');
            QUnit.start();
        }, 10);
    });

    QUnit.asyncTest("(asynchronous test) core replace page without using #", function (assert) {
        QUnit.expect(1);
        var $node;
        app.core.replace("tempB");
        setTimeout(function () {
            $node = $(".page.tempB");
            assert.ok($node.length === 1, 'should replace a page without using #');
            QUnit.start();
        }, 10);
    });

    QUnit.asyncTest("(asynchronous test) core replace page using #", function (assert) {
        QUnit.expect(1);
        var $node;
        app.core.replace("#tempC");
        setTimeout(function () {
            $node = $(".page.tempC");
            assert.ok($node.length === 1, 'should replace a page using #');
            QUnit.start();
        }, 10);
    });

    QUnit.asyncTest("(asynchronous test) core load page without using #", function (assert) {
        QUnit.expect(1);
        var $node;
        app.core.load("tempD");
        setTimeout(function () {
            $node = $(".page.tempD");
            assert.ok($node.length === 1, 'should load a page without using #');
            QUnit.start();
        }, 10);
    });

    QUnit.test('Test invalid usage of core functions', function (assert) {
        QUnit.expect(8);
        var result, error, href = window.location.href;

        error = null;
        try {
            app.core.load();
            result = true;
        } catch (error_1) {
            result = false;
            error = error_1;
        }
        assert.ok(result, "Load without parameters does nothing" + (error ? " exception: " + error : ""));
        assert.equal(window.location.href, href, "Location must not change after empty load");

        error = null;
        try {
            app.core.load({});
            result = true;
        } catch (error_2) {
            result = false;
            error = error_2;
        }
        assert.ok(result, "Load with non string parameters does nothing" + (error ? " exception: " + error : ""));
        assert.equal(window.location.href, href, "Location must not change after invalid load");

        error = null;
        try {
            app.core.replace();
            result = true;
        } catch (error_3) {
            result = false;
            error = error_3;
        }
        assert.ok(result, "Replace without parameters does nothing" + (error ? " exception: " + error : ""));
        assert.equal(window.location.href, href, "Location must not change after empty replace");

        error = null;
        try {
            app.core.replace({});
            result = true;
        } catch (error_4) {
            result = false;
            error = error_4;
        }
        assert.ok(result, "Replace with non string parameters does nothing" + (error ? " exception: " + error : ""));
        assert.equal(window.location.href, href, "Location must not change after invalid replace");
    });

});