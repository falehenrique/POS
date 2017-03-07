/*global app: false, QUnit: false, define: false, $: false, sinon: false, Backbone: false, Node: false */

define(function (require) {
    "use strict";

    // Import dependencies (note you can use relative paths here)
    app.initializer.data();

    // Define the QUnit module and life cycle.
    QUnit.module("modules", {
        setup: function () {
            this.clock = sinon.useFakeTimers();
            this.server = sinon.fakeServer.create();
            this.server.autoRespond = true;

            if (app.client) {
                sinon.stub(app.client, 'request');
            }
            sinon.stub(window, 'print');
            sinon.stub(app.mediator, 'fire');
            sinon.spy(Node.prototype, "addEventListener");
            sinon.spy(Node.prototype, "removeEventListener");

            $("<div>").addClass("wrap").appendTo("#qunit-fixture");

            app.slider = new app.view.Slider({
                el: '.wrap'
            });

        },
        teardown: function () {
            this.clock.restore();
            this.server.restore();

            if (app.client) {
                app.client.request.restore();
            }
            window.print.restore();
            app.mediator.fire.restore();
            Node.prototype.addEventListener.restore();
            Node.prototype.removeEventListener.restore();
            
            $(".wrap").remove();
        }
    });

    // For each module, test... 
    Object.keys(app.mod).forEach(function (id) {

        QUnit.test('Test "' + id + '" module with basic render, loading, destroing and leak of node events and nodes.', function (assert) {
            QUnit.expect(5);
            var mod = new app.mod[id].View(),
                node_count = $("*").not("#qunit-tests, #qunit-tests *").not("#qunit-header, #qunit-header *").not("#qunit-banner, #qunit-banner *").not("#qunit-testrunner-toolbar, #qunit-testrunner-toolbar *").not("#qunit-userAgent, #qunit-userAgent *").not("#qunit-testresult, #qunit-testresult *").not("script").length,
                StubView = Backbone.View.extend({
                    className: 'temp page',
                    render: function () {
                        return this.$el[0];
                    },
                    die: function () {
                        // If the view defines a remove method
                        if (this.destroy) {
                            this.destroy();
                        }

                        // removes the current view
                        this.undelegateEvents();
                        this.unbind();
                        this.remove();
                        this.$el[0] = null;
                    }
                });

            /* Ensure at least empty methods */
            mod.render = mod.render || function () {};
            mod.load = mod.load || function () {};
            mod.destroy = mod.destroy || function () {};

            sinon.spy(mod, "render");
            sinon.spy(mod, "load");
            sinon.spy(mod, "destroy");

            app.slider.show(mod);
            this.clock.tick(10);

            app.slider.show(new StubView());
            this.clock.tick(10);
            app.slider.current.die();

            assert.ok(mod.render.calledOnce, "Rendered once - " + id);
            assert.ok(mod.load.calledOnce, "Loaded once - " + id);
            assert.ok(mod.destroy.calledOnce, "Destroyed once - " + id);
            assert.equal(Node.prototype.addEventListener.callCount, Node.prototype.removeEventListener.callCount, "Added events should be equal to Removed events on all DOM nodes, or we have a LEAK");
            assert.equal(node_count, $("*").not("#qunit-tests, #qunit-tests *").not("#qunit-header, #qunit-header *").not("#qunit-banner, #qunit-banner *").not("#qunit-testrunner-toolbar, #qunit-testrunner-toolbar *").not("#qunit-userAgent, #qunit-userAgent *").not("#qunit-testresult, #qunit-testresult *").not("script").length, "After a cicle in the module, the node count should be the same or we have a LEAK");

            /* Unwrap spies */
            mod.render.restore();
            mod.load.restore();
            mod.destroy.restore();
        });

    });
});