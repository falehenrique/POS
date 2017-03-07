/*global app: false, Backbone: false, JST: false, $: false, root: false, telium: false, console: false, tetra: false */

/**
 * @fileoverview PoS Module
 * @author Rafael R Itajuba
 * @author Danilo Bevilacqua Scavassa
 * @version 2.0.0
 */
(function (root) {
    "use strict";

    /**
     * @namespace pos
     * @description PoS abstract function
     * @memberof app
     */
    var pos = {

        /**
         * @property {value} timeout Timer for polling
         * @memberof app.pos
         */
        timeout: null,

        /**
         * @property {service} chipService Contact Chip Service
         * @memberof app.pos
         */
        chipService: tetra.service({
            service: 'local.device.chip0',
            namespace: 'ingenico.device.chip'
        }),

        /**
         * @property {service} loyaltyService Loyalty Service
         * @memberof app.pos
         */
        loyaltyService: tetra.service({
            service: 'local.loyalty.engine',
            namespace: 'ingenico.demo'
        }),

        // Note by Danilo: At the TetraJS docs, the namespace has an uppercase 'i' in 'ingenico'
        //                 but the right way is 'i' in lowercase.        
        /**
         * @property {service} transacService EMV Transaction Service
         * @memberof app.pos
         */
        transacService: tetra.service({
            service: 'local.transaction.engine',
            namespace: 'ingenico.transaction'
        }),

        /**
         * @property {service} contactLessService Contactless Service
         * @memberof app.pos
         */
        contactLessService: tetra.service({ // Instantiate service
            service: 'local.device.contactless0',
            namespace: 'ingenico.device.contactless'
        }),

        /**
         * Read the card.
         * @param {integer} value Value to be charged, in units
         * @param {function} [callback] Executed on finished
         * @memberof app.pos
         */
        doTransaction: function (value, callback, error) {
            var that = this;

            that.transacService
                .reset()
                .disconnect()
                .connect()
                .close()
                .open()
                .call('ManageTransaction', {
                    hide: true,
                    data: {
                        transaction: {
                            currency: {
                                code: root.app.strings.labelList.KEY_CURRENCY,
                                numCode: root.app.strings.labelList.KEY_CURRENCY_CODE,
                                minorUnit: root.app.strings.labelList.KEY_CURRENCY_MINOR_UNIT,
                                minorUnitSeparator: root.app.strings.labelList.KEY_CURRENCY_SEPARATOR,
                                thousandSeparator: root.app.strings.labelList.KEY_CURRENCY_SEPARATOR_THOUSAND,
                                position: root.app.strings.labelList.KEY_CURRENCY_POSITION,
                                symbol: root.app.strings.labelList.KEY_CURRENCY_SYMBOL
                            },
                            value: value,
                            transactionType: 'Payment'
                        },
                        mean: 'CHIP_CARD'
                    }
                })
                .success(function () {
                    if (callback && typeof callback === "function") {
                        callback(true);
                    }
                })
                .error(function () {
                    //Callback for operation completed
                    if (callback && typeof callback === "function") {
                        if (error && typeof error === "function") {
                            error();
                        } else {
                            callback(false);
                        }
                    }
                })
                .disconnect();
        },

        /**
         * Wait until the card inserted.
         * @param {function} [callback] Executed on finished
         * @memberof app.pos
         */
        startDetectChip: function (callback) {
            var that = this;

            /*** START LISTENNING ***/
            that.chipService
                .reset()
                .disconnect()
                .connect()
                .close()
                .open()
                .on('ChipDetectedEvent', function () { // Listen to ChipDetectedEvent
                    // Stop Listening
                    that.stopDetectChip();

                    if (callback && typeof callback === "function") {
                        callback();
                    }
                })
                .call('Start', {
                    data: {
                        timeout: 10000
                    }
                });

            that.timeout = setTimeout(function () { // Set 10 sec timeout (Work)
                that.startDetectChip(); //Call readCard every 10 sec
            }, 10000);
        },

        /**
         * Stop waiting for a chip insertion event
         * @memberof app.pos
         */
        stopDetectChip: function () {
            clearTimeout(this.timeout);
            this.timeout = undefined;

            this.chipService
                .reset()
                .connect()
                .call('Stop')
                .disconnect();

            this.chipService.off();
        },

        /**
         * Just check if the card is present
         * @param {function} [callback] Executed on finished
         * @memberof app.pos
         */
        isCardPresent: function (callback) {

            /*** START LISTENNING ***/
            this.chipService
                .reset()
                .disconnect()
                .connect()
                .close()
                .open()
                .call('IsCardPresent')
                .success(function (data) {
                    if (callback && typeof callback === "function") {
                        callback(data.chipPresent === 1);
                    }
                });
        },

        /**
         * Read the loyalty card.
         * @param {function} callback Executed on finished
         * @param {function} [error] Executed on error
         * @memberof app.pos
         */
        readLoyaltyCard: function (callback, error) {

            this.loyaltyService
                .reset()
                .connect()
                .call('ReadInfo')
                .success(function (data) {
                    if (callback && typeof callback === "function") {
                        callback(true, data);
                    }
                })
                .error(function () {
                    if (callback && typeof callback === "function") {
                        if (error && typeof error === "function") {
                            error();
                        } else {
                            callback(false);
                        }
                    }
                })
                .disconnect();
        },

        /**
         * Get a Voucher with NFC
         * @param {function} callback callback to success
         * @param {function} [error]  callback to error
         * @memberof app.pos
         */
        startDetectNFC: function (callback, error) {
            var that = this;

            that.contactLessService
                .reset() // Reset service
                .disconnect() // Disconnect from service
                .connect() // Connect to service
                .close() // Close service
                .open() // Open service
                .on('ClessDetectedEvent', function () { // Listen to ClessDetectedEvent
                    var voucher = null;

                    that.stopDetectNFC();

                    if (callback && typeof callback === "function") {
                        voucher = {
                            voucherID: 2010,
                            status: true,
                            value: 1000,
                            voucherValue: 1000,
                            used: false
                        };
                        callback(voucher);
                    }
                })
                .call('StartDetection', {
                    data: {
                        timeout: 5000
                    }
                }) // Call start detection method
                .then(undefined, error);

            that.timeout = setTimeout(function () { // Set 10 sec timeout (Work)
                that.startDetectNFC(); //Call readCard every 10 sec
            }, 5000);
        },

        /**
         * Cancel the NFC reading
         * @memberof app.pos
         */
        stopDetectNFC: function () {
            clearTimeout(this.timeout);
            this.timeout = undefined;

            this.contactLessService
                .reset()
                .connect()
                .call('Stop')
                .disconnect();

            this.contactLessService.off();
        },

        /**
         * Wait a payment by Smartphone
         * It is a fake function, for now
         * @param {function} callback callback to when the service responds with data about the transaction
         * @memberof app.pos
         */
        waitPaymentBySmartphone: function (callback) {
            setTimeout(callback, 3000);
        }

    };

    // Sets the pos object on the app namespace
    /* istanbul ignore next */
    root.app = root.app || {};
    root.app.pos = pos;

}(window));