/*global app: false, Backbone: false, JST: false, $: false, require: false*/

/**
 * @fileoverview Header Module 
 * @author Rafael R Itajuba
 * @author Danilo Bevilacqua Scavassa
 * @author luis novo
 * @version 2.0.0
 */
(function () {
    "use strict";

    /**
     * Header View.
     *  
     * @name Header
     * @class Header View
     * @augments Backbone.View
     * @memberof app.view
     */
    app.view.Header = Backbone.View.extend(
        /** 
         * @lends View.prototype 
         */
        {
            /**
             * Used when there is a need to back to a specific place
             * @memberof app.view.Header
             */
            backTo: null,

            /**
             * initializes the header view
             * @memberof app.view.Header
             */
            initialize: function () {

                /**
                 * @event app.mediator#viewchangeheader
                 * @param {collection} title Title Zepto nodes
                 * @param {collection} back  Back button
                 */
                app.mediator.on('viewchangeheader', this.onViewChange, this);
            },

            /**
             * Declares the event listeners
             * @type {object.<string, string>}
             * @property {string} ['mouseup .back'] event to fire when click
             * @memberof app.view.Header
             */
            events: {
                'mouseup .back': 'goBack'
            },

            /**
             * Sets the title of the header (and the back button if set) when a view changes
             * @param {collection} title Title Zepto nodes
             * @param {collection} back  Back button
             * @listens app.mediator#viewchangeheader
             * @memberof app.view.Header
             */
            onViewChange: function (title, back) {

                var label, $title = $(".title", this.$el[0]),
                    $back = $(".back", this.$el[0]);

                label = app.strings.labelList[title];

                // Sets the title of the header
                $title.text((label !== undefined) ? label : title);

                // If the back button is passed, it shows it or hides
                if (back) {
                    $back.removeClass('hide');
                } else {
                    $back.addClass('hide');
                }
            },

            /**
             * function fired when the goback arrow was clicked
             * @listens app.view.Header#mouseup
             * @memberof app.view.Header
             */
            goBack: function () {
                history.back();
            }
        }
    );

}());