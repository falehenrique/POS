/*global app: false, Backbone: false, JST: false, $: false, require: false*/

(function () {
    "use strict";

    // if the module does not exist
    app.mod.check_location = app.mod.check_location || {};

    // Creates the Home view
    app.mod.check_location.View = Backbone.View.extend({

        // page class name 
        className: 'check_location page',

        // Mehtod fired when the view is initialized
        initialize: function () {
            app.mediator.fire('viewchangeheader', ['KEY_CHECK_LOCATION_TTL', true]);

            /* configure footer buttons */
            app.mediator.fire('viewchangefooter', [true, {
                keyLabel: "KEY_CONFIRM",
                keySubLabel: "KEY_ADDRESSES",
                callback: null,
                nextPage: "#confirm_information",
                buttonIcon: "btn-checkicon"
            }]);
        },

        // function that renders the veiw
        render: function () {
            var $thisView = this.$el, size = "320x340";
            this.$el.html(JST["src/app/templates/check_location.tpl"]());

            if ($("body").css("width") === "480px") {
                size = "480x183";
            }

            app.client.traceRoute(app.actualMarker,
                app.destinationMarker,
                app.traject,
                navigator.language,
                size,
                function (response) {
                    $("#map", $thisView).prop("src", "data:image/png;base64," + response.image);
                });

            return this.$el[0];
        }
    });

}());