/*global app: false, QUnit: false, define: false, $: false, sinon: false, consts: false */

define(function (require) {
    "use strict";

    // Define the QUnit module and life cycle.
    QUnit.module("appParameters");

    QUnit.test('appParameters basic', function (assert) {
        QUnit.expect(1);
        assert.ok(app.appParameters.config.appName, 'appName should be defined');
    });
});