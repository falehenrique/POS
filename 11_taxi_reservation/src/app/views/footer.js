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
     * Footer View.
     *  
     * @name Footer
     * @class Footer View
     * @augments Backbone.View
     * @memberof app.view
     */
    app.view.Footer = Backbone.View.extend(
        /** 
         * @lends View.prototype 
         */
        {

            /**
             * Button1 representation
             * @memberof app.view.Footer
             * @property {function} callback event to fire when click
             * @property {string} nextPage page id to go when click
             */
            button1Info: {
                callback: null,
                nextPage: null
            },

            /**
             * Button2 representation
             * @memberof app.view.Footer
             * @property {function} callback event to fire when click
             * @property {string} nextPage page id to go when click
             */
            button2Info: {
                callback: null,
                nextPage: null
            },

            /**
             * initializes the footer view
             * @memberof app.view.Footer
             */
            initialize: function () {
                /**
                 * @event app.mediator#viewchangefooter
                 * @param {boolean} enable   check if the footer is enabled (and visible)
                 * @param {object}  btn2Info Information about btn1
                 * @param {object}  btn1Info Information about btn2
                 */
                app.mediator.on('viewchangefooter', this.onViewChange, this);
            },

            /**
             * Enable footer and configure buttons label, next page and function to be executer on button
             * @param {boolean} enable   check if the footer is enabled (and visible)
             * @param {object}  btn2Info Information about btn1
             * @param {object}  btn1Info Information about btn2
             * @listens app.mediator#viewchangefooter
             * @memberof app.view.Footer
             */
            onViewChange: function (enable, btn2Info, btn1Info) {
                var $btn1, $btn2, $footer = $(this.$el[0]),
                    $btn1Text, $btn1Label, $btn1Icon, $btn2Label, $btn2Text, $btn2Icon;

                if (!enable) {
                    $footer.addClass('hide');
                } else {
                    this.button1Info = btn1Info;
                    this.button2Info = btn2Info;

                    $btn1 = $(".btn1", this.$el[0]);
                    $btn2 = $(".btn2", this.$el[0]);

                    $btn2Label = $("label", $btn2);
                    $btn2Text = $("label", $btn2);
                    $btn2Icon = $("label", $btn2);

                    $btn1.removeClass('hide');
                    $btn2.removeClass('hide');

                    if (btn1Info === null || btn1Info === undefined) {
                        $btn1.addClass('hide');
                        $btn2.addClass('btnAlignCenter');
                    } else {
                        $btn1Label = $(".buttonText", $btn1);
                        $btn1Text = $(".buttonLabel", $btn1);

                        $btn1Label.text(app.strings.labelList[btn1Info.keyLabel]);
                        $btn1Text.text(app.strings.labelList[btn1Info.keySubLabel]);


                        $btn1Icon = $(".footerIcon", $btn1).removeClass();
                        $btn1Icon.addClass("footerIcon");
                        $btn1Icon.addClass(btn1Info.buttonIcon);
                    }

                    if (btn2Info === null || btn2Info === undefined) {
                        $btn2.addClass('hide');
                        $(".btn2", this.$el[0]).addClass('hide');
                    } else {
                        $btn2Label = $(".buttonText", $btn2);
                        $btn2Text = $(".buttonLabel", $btn2);

                        $btn2Label.text(app.strings.labelList[btn2Info.keyLabel]);
                        $btn2Text.text(app.strings.labelList[btn2Info.keySubLabel]);


                        $btn2Icon = $(".footerIcon", $btn2).removeClass();
                        $btn2Icon.addClass("footerIcon");
                        $btn2Icon.addClass(btn2Info.buttonIcon);
                    }

                    if (btn1Info !== null && btn2Info !== null && btn1Info !== undefined && btn2Info !== undefined) {
                        $footer.addClass('footerSplit');
                        $footer.removeClass('footerSolo');
                    } else {
                        $footer.addClass('footerSolo');
                        $footer.removeClass('footerSplit');
                    }

                    $footer.removeClass('hide');
                }
            },

            /**
             * Events
             * @memberof app.view.Footer
             * @type {object.<string, string>}
             * @property {string} ['mouseup .btn1'] event to fire when click
             * @property {string} ['mouseup .btn2'] event to fire when click
             */
            events: {
                'mouseup .btn1': 'onButton',
                'mouseup .btn2': 'onButton'
            },

            /**
             * When the button 1 is clicked change to hover and after some time goes to next screen
             * @param {object} e element clicked
             * @listens app.view.Footer#mouseup
             * @memberof app.view.Footer
             */
            onButton: function (e) {
                var $target = $(e.currentTarget),
                    buttonInfo;
                e.preventDefault();

                if ($target.hasClass('btn1')) {
                    buttonInfo = this.button1Info;
                } else if ($target.hasClass('btn2')) {
                    buttonInfo = this.button2Info;
                }

                if (buttonInfo.callback !== null && buttonInfo.callback !== undefined) {
                    buttonInfo.callback();
                }

                if (buttonInfo.nextPage !== null && buttonInfo.nextPage !== undefined) {
                    window.location.href = buttonInfo.nextPage;
                }
            }
        }
    );
}());