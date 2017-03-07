/*global app: false, Backbone: false, JST: false, $: false, require: false*/

/**
 * @fileoverview Stringtable Module
 * @author Rafael R Itajuba
 * @author Danilo Bevilacqua Scavassa
 * @version 2.0.0
 */
(function (root) {
    "use strict";

    /**
     * @namespace stringtable
     * @description String Translation Methods
     * @memberof app
     */
    var stringtable = {

        /**
         * Apply the Decimal separator according to rules
         * @param   {string} value     value in units
         * @param   {string} separator separator to be used
         * @returns {string} text to be used
         * @memberof app.stringtable
         */
        applyDecimalSeparator: function (value, separator) {
            var size, decPart, intPart;

            value = parseInt(value, 10);
            if (value === 0) {
                value = '000';
            } else {
                value = value.toString();
            }

            size = value.length;
            decPart = value.substr(size - 2, 2);
            intPart = value.substr(0, size - 2);

            if (intPart === '') {
                intPart = '0';
            }

            if (decPart.length === 1) {
                decPart = '0' + decPart;
            }

            return intPart + separator + decPart;
        },

        /**
         * Apply money curency simbols
         * @param   {string} value value to receive the money mask
         * @returns {string} value with money mask
         * @memberof app.stringtable
         */
        fixMoneyCurrency: function (value) {
            var valueStr = this.applyDecimalSeparator(value, root.app.strings.labelList.KEY_CURRENCY_SEPARATOR);

            if (root.app.strings.labelList.KEY_CURRENCY_DIRECTION === "rtl") {
                return valueStr + " " + root.app.strings.labelList.KEY_CURRENCY_SYMBOL;
            }

            // Default is ltr
            return root.app.strings.labelList.KEY_CURRENCY_SYMBOL + " " + valueStr;
        },

        /**
         * Apply a date mask
         * @param   {string} value Date Value to be formatted
         * @returns {string} the value with mask
         * @memberof app.stringtable
         */
        applyDateMask: function (value) {
            function strpad(str) {
                return (!isNaN(str) && str.toString().length === 1) ? "0" + str : str;
            }

            var day,
                month,
                year,
                date,
                strDate = root.app.strings.labelList.KEY_DATE_MASK;

            if (isNaN(value)) {
                day = parseInt(value.substr(0, 2), 10);
                month = parseInt(value.substr(3, 2), 10);
                year = value.substr(6, 4);
            } else {
                date = new Date(parseInt(value, 10));

                day = date.getDate();
                month = date.getMonth() + 1;
                year = date.getFullYear();
            }

            strDate = strDate.replace("%d", strpad(day.toString()));
            strDate = strDate.replace("%j", day);

            strDate = strDate.replace("%m", strpad(month.toString()));
            strDate = strDate.replace("%M", root.app.strings.labelList.KEY_DATE_MONTHS[month - 1].substr(0, 3));
            strDate = strDate.replace("%n", month);
            strDate = strDate.replace("%F", root.app.strings.labelList.KEY_DATE_MONTHS[month - 1]);

            strDate = strDate.replace("%Y", year);
            strDate = strDate.replace("%y", year.toString().substr(2, 2));
            return strDate;
        },

        /**
         * Apply translation to html elements
         * @param {collection} node Zepto nodes to be transalated
         * @memberof app.stringtable
         */
        applyLabels: function (node) {

            $(".translatable", node).each(function () {
                var $this = $(this),
                    stringKey = $this.text().trim();
                if (root.app.strings.labelList[stringKey]) {
                    $this.text(root.app.strings.labelList[stringKey]);
                }
                $this.removeClass("translatable");
            });

            $(".moneyValue", node).each(function () {
                var $this = $(this),
                    moneyKey = $this.text().trim();
                $this.text(app.stringtable.fixMoneyCurrency(moneyKey));
                $this.removeClass("moneyValue");
            });

            $(".dateValue", node).each(function () {
                var $this = $(this),
                    dateValue = $this.text();
                $this.text(app.stringtable.applyDateMask(dateValue));
                $this.removeClass("dateValue");
            });
        }
    };

    root.app.stringtable = stringtable;

}(window));