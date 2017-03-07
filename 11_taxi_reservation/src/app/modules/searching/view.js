/*global app: false, Backbone: false, JST: false, $: false, require: false, TimePick: false, consts: false */

(function () {
    "use strict";

    // if the module does not exist
    app.mod.searching = app.mod.search || {};

    // Creates the Home view
    app.mod.searching.View = Backbone.View.extend({

        // page class name 
        className: 'searching page',

        // Mehtod fired when the view is initialized
        initialize: function () {
            app.mediator.fire('viewchangeheader', ['KEY_SEARCHING_TTL', false]);

            /* configure footer buttons */
            app.mediator.fire('viewchangefooter', [false]);
        },

        // function that renders the veiw
        render: function () {
            this.$el.html(JST["src/app/templates/searching.tpl"]());

            return this.$el[0];
        },

        // function fired when the DOM is rendered
        load: function () {
            app.actualAddress = app.actualAddress || consts.initialLocation;

            if (app.destinationAddress === undefined || app.destinationAddress.trim() === "") {
                app.mediator.fire('modal', [app.strings.labelList.KEY_EMPTY_DESTINATION, 'alert-danger']);
                window.history.back();
                return;
            }

            if (app.actualAddress.trim() === app.destinationAddress.trim()) {
                app.mediator.fire('modal', [app.strings.labelList.KEY_INVALID_DESTINATION, 'alert-danger']);
                window.history.back();
                return;
            }

            app.client.getDirections(app.actualAddress, app.destinationAddress, navigator.language, function (response) {
                var i = 0;

                if (response.status === "OK") {
                    app.traject = response.route.overview_polyline.points;

                    app.distance = 0;
                    //app.actualAddress = response.route.legs[0].start_address;
                    app.actualMarker = response.route.legs[0].start_location.lat + "," + response.route.legs[0].start_location.lng;
                    for (i = 0; i < response.route.legs.length; i++) {
                        app.distance += response.route.legs[i].distance.value;
                    }
                    app.destinationAddress = response.route.legs[response.route.legs.length - 1].end_address;
                    app.destinationMarker = response.route.legs[response.route.legs.length - 1].end_location.lat + "," + response.route.legs[response.route.legs.length - 1].end_location.lng;

                    //Value for the ride
                    app.value = parseInt(200 + app.distance / 1000 * 138, 10);

                    app.core.replace("#check_location");
                } else if (response.status === "NOT_FOUND") {
                    app.mediator.fire('modal', [app.strings.labelList.KEY_NOT_FOUND, 'alert-danger']);
                    window.history.back();
                } else if (response.status === "ZERO_RESULTS") {
                    app.mediator.fire('modal', [app.strings.labelList.KEY_ZERO_RESULTS, 'alert-danger']);
                    window.history.back();
                } else {
                    app.mediator.fire('modal', [response.status, 'alert-danger']);
                    window.history.back();

                }
            });

        }

    });

}());