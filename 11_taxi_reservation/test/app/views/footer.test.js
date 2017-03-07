/*global app: false, QUnit: false, define: false, $: false, sinon: false, consts: false */

define(function (require) {
    "use strict";

    // Define the QUnit module and life cycle.
    QUnit.module("views", {
        setup: function () {
            var el = '<div class="footer hide"><div class="btn1 button hide"></div><div class="btn2 button hide"></div></div>';
            $(el).appendTo("#qunit-fixture");
            app.view.footer = new app.view.Footer({
                el: '.footer'
            });
        },
        teardown: function () {
            app.view.footer = null;
            $(".footer").remove();
        }
    });

    QUnit.test('Test footer construction', function (assert) {
        QUnit.expect(1);
        app.mediator.fire('viewchangefooter', [false]);
        assert.ok($(".footer").hasClass("hide"), "Verify that if footer is constructed with false only, its display is 'none'");
    });

    QUnit.test('Test buttons construction', function (assert) {
        QUnit.expect(3);
        app.mediator.fire('viewchangefooter', [true, {
            keyLabel: "KEY_DONE",
            nextPage: "#home",
            callback: function () {
                return;
            }
        }, {
            keyLabel: "KEY_DONE",
            nextPage: "#home",
            callback: function () {
                return;
            }
        }]);
        assert.equal($(".footer").css("display"), "block", "Footer should be visible");
        assert.equal($(".btn1").css("display"), "block", "Button 1 should be visible");
        assert.equal($(".btn2").css("display"), "block", "Button 2 should be visible");
    });
    
    QUnit.test('Test buttons hide', function (assert) {
        QUnit.expect(4);
        app.mediator.fire('viewchangefooter', [true, null, {
            keyLabel: "KEY_DONE",
            nextPage: "#home",
            callback: function () {
                return;
            }
        }]);
        assert.ok($(".btn2").hasClass("hide"), "Button 2 should have hide class");
        assert.ok(!($(".btn1").hasClass("hide")), "Button 1 must has not hide class");
        
        
        app.mediator.fire('viewchangefooter', [true, {
            keyLabel: "KEY_DONE",
            nextPage: "#home",
            callback: function () {
                return;
            }
        }, null]);
        
        assert.ok($(".btn1").hasClass("hide"), "Button 1 should have hide class");
        assert.ok(!($(".btn2").hasClass("hide")), "Button 2 must has not hide class");
        
    });

});