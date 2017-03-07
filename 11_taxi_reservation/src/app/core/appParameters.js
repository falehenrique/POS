/*global app: false, Backbone: false, JST: false, $: false, console: false */

/**
 * @fileoverview AppParameters Module
 * @author Rafael R Itajuba
 * @author Danilo Bevilacqua Scavassa
 * @version 2.0.0
 */
(function (root) {
    "use strict";

    /**
     * @namespace appParameters
     * @memberof app
     * @property {object} config configuration parameters
     * @property {string} config.appName application name, accessible from code
     * @property {string} config.version application version, accessible from code
     */
    var appParameters = {
        config: {
            appName: "11_taxi_reservation",
            version: "2.0.0"
        }
    };

    // Sets the appParameters object on the app namespace
    /* istanbul ignore next */
    root.app = root.app || {};

    root.app.appParameters = appParameters;

}(window));