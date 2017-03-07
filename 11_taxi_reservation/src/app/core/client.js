/*global app: false, Backbone: false, JST: false, $: false, root: false */

(function (root) {
    "use strict";

    var client = {

        request: function (url, callback) {
            $.ajax({
                type: "GET",
                url: url,
                success: function (result) {
                    if (callback && typeof callback === 'function') {
                        callback(result);
                    }
                    return result;
                },
                error: function (xhr, textStatus, error) {
                    if (callback && typeof callback === 'function') {
                        callback({
                            status: "ERROR_INTERNAL_" + xhr.status + ": " + textStatus + ", " + error
                        });
                    }
                    return textStatus;
                }
            });
        },

        pointLocation: function (address, language, size, complete) {
            var page = "point_location";

            if (root.consts.maphost) {
                page = root.consts.maphost + "/" + page + "/";
            }

            this.request(page + "?address=" + encodeURIComponent(address) + "&language=" + encodeURIComponent(language) + "&size=" + size, complete);
        },

        traceRoute: function (start, destination, encodedTrajectory, language, size, complete) {
            var page = "trace_route";

            if (root.consts.maphost) {
                page = root.consts.maphost + "/" + page + "/";
            }

            this.request(page + "?start=" + encodeURIComponent(start) + "&destination=" + encodeURIComponent(destination) + "&trajectory=" + encodeURIComponent(encodedTrajectory) + "&language=" + encodeURIComponent(language) + "&size=" + size, complete);
        },

        getDirections: function (from, to, language, complete) {
            var page = "get_directions";

            if (root.consts.maphost) {
                page = root.consts.maphost + "/" + page + "/";
            }

            this.request(page + "?from=" + encodeURIComponent(from) + "&to=" + encodeURIComponent(to) + "&language=" + encodeURIComponent(language), complete);
        },

        getAddress: function (address, language, complete) {
            var page = "get_address";

            if (root.consts.maphost) {
                page = root.consts.maphost + "/" + page + "/";
            }

            this.request(page + "?address=" + encodeURIComponent(address) + "&language=" + encodeURIComponent(language), complete);
        }
    };

    // Sets the appParameters object on the app namespace
    /* istanbul ignore next */
    root.app = root.app || {};
    root.app.client = client;

}(window));