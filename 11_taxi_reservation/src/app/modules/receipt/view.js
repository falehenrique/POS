/*global app: false, Backbone: false, JST: false, $: false, require: false, TimePick: false */

(function () {
    "use strict";

    // if the module does not exist
    app.mod.receipt = app.mod.receipt || {};

    // Creates the Home view
    app.mod.receipt.View = Backbone.View.extend({

        // page class name 
        className: 'receipt page',

        // Mehtod fired when the view is initialized
        initialize: function () {
            var landscape = false,
                that = this;
            app.mediator.fire('viewchangeheader', ['KEY_RECEIPT_TTL', false]);

            if ($("body").css("width") === "480px") {
                landscape = true;
            }

            /* configure footer buttons */
            app.mediator.fire('viewchangefooter', [true,
                {
                    keyLabel: "KEY_SKIP",
                    keySubLabel: "KEY_RECEIPT",
                    callback: null,
                    nextPage: "#home",
                    buttonIcon: "btn-checkicon"
                },
                landscape ? null : {
                    keyLabel: "KEY_PRINT",
                    keySubLabel: "KEY_RECEIPT",
                    callback: function () {
                        that.undelegateEvents();
                        app.core.print();
                        that.delegateEvents();
                    },
                    nextPage: "#home",
                    buttonIcon: "btn-checkicon"
                }
                ]);
        },

        // function that renders the veiw
        render: function () {
            this.$el.html(JST["src/app/templates/receipt.tpl"]({
                reservationNumber: app.reservationNumber,
                value: app.value,
                actual: app.actualAddress,
                destination: app.destinationAddress,
                time: app.time
            }));

            return this.$el[0];
        }
    });

}());