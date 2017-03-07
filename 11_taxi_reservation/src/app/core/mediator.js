/**
 * @fileoverview Mediator Module 
 * @author Rafael R Itajuba
 * @author Danilo Bevilacqua Scavassa
 * @author luis novo
 * @version 2.0.0
 */
(function (root) {
    "use strict";

    /**
     * @namespace mediator
     * @description Mediator for Backbone
     * @memberof app
     */
    var calls = {},
        mediator = {
            /**
             * Subscribes to a call
             * @param {string} method Name of the method to subscribe
             * @param {function} callback Funciton to call when we fire the event
             * @param {object} scope Context to which to bind the callback
             * @memberof app.mediator
             */
            on: function (method, callback, scope) {

                // if the method is not yet created, initializes an array
                if (!calls[method]) {
                    calls[method] = [];
                }

                // adds the listener
                calls[method].push({
                    callback: callback,
                    scope: scope
                });
            },

            /**
             * Unsuscribes from a call
             * @param {string} method Name of the method to subscribe
             * @param {function} callback Funciton to call when we fire the event
             * @param {object} scope Context to which to bind the callback
             * @memberof app.mediator
             */
            un: function (method, callback) {

                // Declares the local vars
                var m = calls[method],
                    i,
                    l;

                // if the method has listeners
                if (m) {

                    // Quries the listeners to try to find a callback
                    l = m.length;
                    for (i = l - 1; i >= 0; i -= 1) {

                        // if found it is removed from the array 
                        if (m[i].callback === callback) {
                            m.splice(i, 1);
                        }
                    }
                }
            },

            /**
             * Fires a method call with a series or agruments
             * @param {string} method Name of the method to fire
             * @param {array} args Arguments to attach to the event
             * @memberof app.mediator
             */
            fire: function (method, args) {

                var m = calls[method],
                    i,
                    l;

                // Searches the method and then calls all the listeners
                if (m) {
                    l = m.length;
                    for (i = 0; i < l; i += 1) {
                        m[i].callback.apply(m[i].scope || null, args || []);
                    }
                }
            }
        };

    // Sets the mediator object on the app namespace
    /* istanbul ignore next */
    root.app = root.app || {};
    root.app.mediator = mediator;

}(window));