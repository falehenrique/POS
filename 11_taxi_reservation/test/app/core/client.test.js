/*global app: false, QUnit: false, define: false, $: false, _: false, sinon: false, consts: false */

define(function (require) {
    "use strict";

    // Define the QUnit module and life cycle.
    QUnit.module("client", {
        setup: function () {
			consts.maphost = "http://localhost/MapHost";
            this.server = sinon.fakeServer.create();
        },
        teardown: function () {
            this.server.restore();
        }
    });

    QUnit.test('client error handling', function (assert) {
        QUnit.expect(1);
        this.server.respondWith("GET", "http://localhost/MapHost/test/", [500, { "Content-Type": "application/json" }, ""]);

        var callback = sinon.spy();
        app.client.request("http://localhost/MapHost/test/", callback);
        this.server.respond();

        assert.ok(callback.calledWith({
			status: "ERROR_INTERNAL_500: error, Internal Server Error"
		}), "Should return error in proper format");
    });

    QUnit.test('Test for route', function (assert) {
        QUnit.expect(1);
        this.server.respondWith([200, { "Content-Type": "application/json" }, '{"image": "THISISABASE64IMAGE==", "status": "OK"}']);

        var callback = sinon.spy();
        app.client.traceRoute("Paris", "London", "THISISENCODED", "pt-BR", "320x480", callback);
        this.server.respond();

        assert.ok(callback.calledWith({
			image: 'THISISABASE64IMAGE==',
			status: 'OK'
		}), "Should return routing image and status");
    });

    QUnit.test('Test for pointing a location', function (assert) {
        QUnit.expect(1);
        this.server.respondWith([200, { "Content-Type": "application/json" }, '{"image": "THISISABASE64IMAGE==", "status": "OK"}']);

        var callback = sinon.spy();
        app.client.pointLocation("Paris", "pt-BR", "320x480", callback);
        this.server.respond();

        assert.ok(callback.calledWith({
			image: 'THISISABASE64IMAGE==',
			status: 'OK'
		}), "Should return pointed image and status");
    });

    QUnit.test('Test for get directions', function (assert) {
        QUnit.expect(1);
        this.server.respondWith([200, { "Content-Type": "application/json" }, '{"route": [], "status": "OK"}']);

        var callback = sinon.spy();
        app.client.getDirections("Paris", "London", "pt-BR", callback);
        this.server.respond();

        assert.ok(callback.calledWith({route: [], status: "OK"}), "Should return routes and status");
    });

    QUnit.test('Test for get address', function (assert) {
        QUnit.expect(1);
        this.server.respondWith([200, { "Content-Type": "application/json" }, '{"results": [], "status": "OK"}']);

        var callback = sinon.spy();
        app.client.getAddress("Paris", "pt-BR", callback);
        this.server.respond();

        assert.ok(callback.calledWith({
			results: [],
			status: 'OK'
		}), "Should return address image and status");
    });
});