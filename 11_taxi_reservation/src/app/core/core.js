/*global app: false, Backbone: false, JST: false, $: false, root: false */

/**
 * @fileoverview Core Module
 * @author Rafael R Itajuba
 * @author Danilo Bevilacqua Scavassa
 * @version 2.0.0
 */
(function (root) {
    "use strict";

    /**
     * @namespace core
     * @description Core Functions
     * @memberof app
     */
    var core = {
        /**
         * Load a page, can be `backed`
         * @param {string} page Page Id, with or without #
         * @memberof app.core
         */
        load: function (page) {
            if (page && typeof page === "string" && page !== "") {
                if (page[0] === "#") {
                    root.location.href = page;
                } else {
                    root.location.href = "#" + page;
                }
            }
        },

        /**
         * Replace a page, overriding the actual page (back occours as the previous page never existed)
         * @param {string} page Page Id, with or withou #
         * @memberof app.core
         */
        replace: function (page) {
            if (page && typeof page === "string" && page !== "") {
                if (page[0] === "#") {
                    root.location.replace(page);
                } else {
                    root.location.replace("#" + page);
                }
            }
        },

        /**
         * Calls window.print()
         * @memberof app.core
         */
        print: function () {
            root.print();
        }
    };

    // Sets the object on the app namespace
    /* istanbul ignore next */
    root.app = root.app || {};
    root.app.core = core;

}(window));