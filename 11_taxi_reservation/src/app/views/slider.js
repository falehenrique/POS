/*global app: false, Backbone: false, JST: false, $: false, require: false*/

/**
 * @fileoverview Footer Module 
 * @author Rafael R Itajuba
 * @author Danilo Bevilacqua Scavassa
 * @author luis novo
 * @version 2.0.0
 */
(function () {

    "use strict";

    /**
     * Slider View.
     *  
     * @name Slider
     * @class Slider View
     * @augments Backbone.View
     * @memberof app.view
     */
    app.view.Slider = Backbone.View.extend(
        /** 
         * @lends View.prototype 
         */
        {

            /**
             * current view
             * @memberof app.view.Slider
             */
            current: null,

            /**
             * When the button 1 is clicked Sends a modal message alert
             * @param {Backbone.View} view View to be rendered
             * @memberof app.view.Slider
             */
            show: function (view) {

                var me, newEl;
                me = this;

                // if a current view is set, it removes it 
                if (me.current) {

                    // If the view defines a remove method
                    if (me.current.destroy) {
                        me.current.destroy();
                    }

                    // removes the current view
                    me.current.undelegateEvents();
                    me.current.unbind();
                    me.current.remove();
                    me.current.$el[0] = null;
                }

                // Renders the view and saves it as the current one
                if (view && view.render) {
                    newEl = view.render();
                    app.stringtable.applyLabels(newEl);
                    this.$el[0].appendChild(newEl);
                }
                me.current = view;

                // Calls the load function if present in the view
                setTimeout(function () {

                    if (me.current.load) {
                        me.current.load();
                    }
                }, 0);
            }

        }
    );

}());