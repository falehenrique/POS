/*global app: false, QUnit: false, define: false, $: false, sinon: false, consts: false */

define(function (require) {
    "use strict";

    // Define the QUnit module and life cycle.
    QUnit.module("views", {
        setup: function () {
            var el = '<div class="bar"><div class="back hide"></div><div class="title"></div></div>';
            $(el).appendTo("#qunit-fixture");
            app.view.header = new app.view.Header({
                el: '.bar'
            });
        },
        teardown: function () {
            app.view.header = null;
            $(".bar").remove();
        }
    });
    
    QUnit.test('Test header basic', function (assert) {
        QUnit.expect(3);
        app.mediator.fire('viewchangeheader', ['KEY_HOME_TTL', false]);
        assert.ok($(".back").hasClass("hide"), "Verify that if header is constructed with false only, button back has class hide");

        app.mediator.fire('viewchangeheader', ['KEY_HOME_TTL', true]);
        assert.equal($(".back").css("display"), "block", "Verify that if header is constructed with true only, button back display is 'block'");
		
        app.mediator.fire('viewchangeheader', ['MY CUSTOM TITLE', true]);
        assert.equal($(".title").text(), "MY CUSTOM TITLE", "If header receive a text instead of a registered label KEY, then the text that is shown");
    });

});