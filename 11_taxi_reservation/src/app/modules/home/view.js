/*global app: false, Backbone: false, JST: false, $: false, require: false, TimePick: false, consts: false */

(function () {
    "use strict";

    // if the module does not exist
    app.mod.home = app.mod.home || {};

    // Creates the Home view
    app.mod.home.View = Backbone.View.extend({

        // page class name 
        className: 'home page',

        // Mehtod fired when the view is initialized
        initialize: function () {
            app.mediator.fire('viewchangeheader', ['KEY_HOME_TTL', false]);

            /* configure footer buttons */
            app.mediator.fire('viewchangefooter', [true, {
                keyLabel: "KEY_USE_CURRENT",
                keySubLabel: "KEY_LOCATION",
                callback: null,
                nextPage: "#search_destination",
                buttonIcon: "homeFooterBtn1"
            }, {
                keyLabel: "KEY_CHOOSE_OTHER",
                keySubLabel: "KEY_LOCATION",
                callback: null,
                nextPage: "#search_location",
                buttonIcon: "homeFooterBtn2"
            }]);
        },

        // function that renders the veiw
        render: function () {
            var size = "320x480", $thisView = this.$el;
            app.actualAddress = localStorage.getItem("actualAddress") || consts.initialLocation;

            this.$el.html(JST["src/app/templates/home.tpl"]({
                address: app.actualAddress
            }));

            //Makes cache of locations!
            if (app.actualAddress !== undefined && app.locationCache !== undefined && app.locationCache[app.actualAddress] !== undefined) {
                $("#map", $thisView).prop("src", "data:image/png;base64," + app.locationCache[app.actualAddress]);
            } else {
                if ($("body").css("width") === "480px") {
                    size = "480x320";
                }

                app.client.pointLocation(app.actualAddress, navigator.language, size, function (response) {
                    if (response.status !== "OK") {
                        app.mediator.fire('modal', [response.status, 'alert-danger']);
                    } else {
                        $("#map", $thisView).prop("src", "data:image/png;base64," + response.image);
                        app.locationCache = app.locationCache || {};
                        app.locationCache[app.actualAddress] = response.image;
                    }
                });
            }

            return this.$el[0];
        },

        load: function () {
            app.destinationAddress = '';

            $(".home").on("mouseup", ".location", function () {
                window.location = "#search_location";
            });
        },

        destroy: function () {
            $(".home").off();
        }

    });

}());