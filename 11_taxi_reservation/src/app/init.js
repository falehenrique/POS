/*global app: false, Backbone: false, JST: false, $: false, root: false */

/** 
 * @name init.js
 * @author Rafael R Itajuba
 * @author Danilo Bevilacqua Scavassa
 * @fileoverview Bootstraps the application
 * @version 2.0.0
 */
(function (root) {
    "use strict";

    /**
     * Initializer for DI in test env
     *  
     * @namespace initializer
     * @memberof app
     */
    root.app.initializer = {
        /**
         * init image cache
         * @memberof app.initializer
         */
        cache: function () {
            var img;

            root.app.image_cache = [];

            img = new Image();
            img.src = "img/btn-bottom.png";
            root.app.image_cache.push(img);

            img = new Image();
            img.src = "img/btn-bottomhover.png";
            root.app.image_cache.push(img);

            img = new Image();
            img.src = "img/btn-bottom-other.png";
            root.app.image_cache.push(img);

            img = new Image();
            img.src = "img/btn-bottomhover-other.png";
            root.app.image_cache.push(img);

            img = new Image();
            img.src = "img/background.png";
            root.app.image_cache.push(img);
        },

        /**
         * init offline data
         * @memberof app.initializer
         */
        data: function () {
            return;
        },

        /**
         * init system
         * @memberof app.initializer
         */
        system: function () {

            /**
             * @name header
             * @memberof app
             * @description instance of {@link app.view.Header|Header}
             * @inner
             * @see app.view.Header
             */
            root.app.view.header = new app.view.Header({
                el: '.bar'
            });

            /**
             * @name footer
             * @memberof app
             * @description instance of {@link app.view.Footer|Footer}
             * @inner
             * @see app.view.Footer
             */
            root.app.view.footer = new app.view.Footer({
                el: '.footer'
            });

            /**
             * @name slider
             * @memberof app
             * @description instance of {@link app.view.Slider|Slider}
             * @inner
             * @see app.view.Slider
             */
            root.app.slider = new app.view.Slider({
                el: '.wrap'
            });

            /**
             * @name slider
             * @memberof app
             * @description instance of {@link app.Router|Router}
             * @inner
             * @see app.Router
             */
            root.app.router = new app.Router();

            // Starts the backbone app
            Backbone.history.start();
        }
    };

    // Check if it is has a tests namespace
    /* istanbul ignore if */
    if (!root.tests) {
        // on the DOM Load starts the applciation router 
        $(function () {
            root.app.initializer.cache();
            root.app.initializer.data();
            root.app.initializer.system();
        });
    }

}(window));