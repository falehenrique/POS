/*global app: false, Backbone: false, JST: false, $: false, require: false, TimePick: false */

(function () {
    "use strict";

    // if the module does not exist
    app.mod.confirm_information = app.mod.confirm_information || {};

    // Creates the Home view
    app.mod.confirm_information.View = Backbone.View.extend({

        // page class name 
        className: 'confirm_information page',

        // Mehtod fired when the view is initialized
        initialize: function () {
            app.mediator.fire('viewchangeheader', ['KEY_CONFIRM_INFORMARION_TTL', true]);

            /* configure footer buttons */
            app.mediator.fire('viewchangefooter', [true, {
                keyLabel: "KEY_REQUEST_TAXI",
                keySubLabel: "KEY_AND_PAY",
                callback: function () {
                    app.pos.doTransaction(app.value, function (e) {
                        if (e === true) {
                            app.time = $("#timeChooser").text().trim();
                            app.reservationNumber = Math.floor(Math.random() * 10000000);
                            app.core.load("#receipt");
                        } else {
                            app.mediator.fire('modal', [app.strings.labelList.KEY_TRANSACTION_ERROR, 'alert-danger']);
                        }
                    });
                },
                nextPage: null,
                buttonIcon: "btn-checkicon"
            }]);
        },

        // function that renders the veiw
        render: function () {
            this.$el.html(JST["src/app/templates/confirm_information.tpl"]({
                destination: app.destinationAddress,
                actual: app.actualAddress,
                value: app.value
            }));

            return this.$el[0];
        },

        // function fired when the DOM is rendered
        load: function () {
            var date, actualHours, actualMinutes, ampm;

            date = new Date();
            actualHours = date.getHours();
            actualMinutes = date.getMinutes();
            ampm = actualHours >= 12 ? 'PM' : 'AM';

            actualHours = actualHours % 12;
            actualHours = actualHours || 12; // the hour '0' should be '12'
            actualMinutes = actualMinutes < 10 ? '0' + actualMinutes : actualMinutes;
            actualHours = actualHours < 10 ? '0' + actualHours : actualHours;

            $("#timeChooser").text(actualHours + ":" + actualMinutes + " " + ampm);

            this.timepicker = new TimePick({
                target: "timeChooser"
            });

            $(".clock").on("mouseup", function () {
                $("#timeChooser").click();
            });
        },

        // Function called when the view is destroyed
        destroy: function () {
            $(".clock").off();
            this.timepicker.destroy();
        }
    });

}());