/*global app: false, Backbone: false, JST: false, $: false, require: false*/

/**
 * @fileoverview Application Module 
 * @author Rafael R Itajuba
 * @author Danilo Bevilacqua Scavassa
 * @author luis novo
 * @version 2.0.0
 */
(function (root) {
    "use strict";

    /**
     * Application Namespace.
     *  
     * @namespace app
     */
    /* istanbul ignore next */
    root.app = root.app || {};

    /**
     * Views Namespace.
     *  
     * @namespace view
     * @memberof app
     */
    root.app.view = {};

    /**
     * Modules Namespace.
     *  
     * @namespace mod
     * @memberof app
     */
    root.app.mod = {};

    var app = root.app;

    /**
     * Router Extended for this app.
     *  
     * @name Router
     * @class Backbone Router
     * @augments Backbone.Router
     * @memberof app
     */
    app.Router = Backbone.Router.extend(
        /** 
         * @lends Router.prototype 
         */
        {
            /**
             * Defines the main routes of the app
             * We have one fixed route, the home / route
             * And then a dynamic route, which loads modules dynamically (based on a namespace)
             * @memberof app.Router
             * @type {object.<string, string>}
             * @property {string} '' Function name to default route
             * @property {string} '*actions' Function name to any other action
             */
            routes: {
                '': 'main',
                '*actions': 'goToPage'
            },

            /**
             * Load the home page route
             * @memberof app.Router
             */
            main: function () {
                app.slider.show(new app.mod.home.View());
            },

            /**
             * Goes to a page with a certain id
             * @param {string} id page id
             * @memberof app.Router
             * @fires app.mediator#modal if page is not found
             */
            goToPage: function (id) {
                // if the id is the menu
                var mod = app.mod[id];

                // if rhe view exists, it shows it
                if (mod) {
                    app.slider.show(new mod.View());
                } else { // if not, it notifies the user that the module does not exists
                    app.mediator.fire('modal', [' The module "' + id + '" does not exists']);
                }
            }
        }
    );

}(window));