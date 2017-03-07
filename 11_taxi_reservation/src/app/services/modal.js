/*global app: false, Backbone: false, JST: false, $: false, require: false*/

/**
 * @fileoverview Modal Module 
 * @author Rafael R Itajuba
 * @author Danilo Bevilacqua Scavassa
 * @author luis novo
 * @version 2.0.0
 */
(function (root) {
    "use strict";

    // Declares local variables
    var alert, timeout,
        modal = {

            /**
             * Listens for modal event
             * @listens app.mediator#modal
             * @param {string} text      Text to show
             * @param {string} alertType class to be applied to the alert element
             */
            onModal: function (text, alertType) {

                // Creates the modal div if it doesn't exists
                if (!alert) {
                    alert = document.createElement('div');
                    alert.className = 'modal alert ' + alertType;
                    $('body')[0].appendChild(alert);
                }

                // Sets the text to the alert and sets the class to active
                alert.textContent = text;

                // Sets the animation 
                setTimeout(function () {

                    // Adds the active class
                    alert.classList.add('active');

                    // if a timeoput was already set it clears it
                    if (timeout) {
                        clearTimeout(timeout);
                    }

                    // then it sets a nex timeout to take off the alert
                    timeout = setTimeout(function () {
                        alert.parentNode.removeChild(alert);
                        alert = null;
                    }, 2000);
                }, 0);


            }
        };

    /**
     * Modal event, for alerts.
     *
     * @event app.mediator#modal
     * @param {string} text      Text to show
     * @param {string} alertType class to be applied to the alert element
     */
    root.app.mediator.on('modal', modal.onModal);

}(window));