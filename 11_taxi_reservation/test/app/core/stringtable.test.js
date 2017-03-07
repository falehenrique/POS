/*global app: false, QUnit: false, define: false, $: false, root: false */

define(function (require) {
    "use strict";

    // Define the QUnit module and life cycle.
    QUnit.module("stringtable", {
        setup: function () {

            app.strings.translationList = [
                {
                    key: 'KEY_CURRENCY_SYMBOL',
                    pt: 'R$',
                    en: '€'
                },
                {
                    key: 'KEY_MESSAGE',
                    pt: 'Minha mensagem em português',
                    en: 'My message in english'
                },
                {
                    key: 'KEY_CURRENCY_SEPARATOR',
                    pt: ',',
                    en: '.'
                },
                {
                    key: 'KEY_CURRENCY_DIRECTION',
                    pt: 'ltr',
                    en: 'rtl'
                },
                {
                    key: 'KEY_DATE_MASK',
                    pt: '%d/%m/%Y',
                    en: '%M %j, %Y'
                },
                {
                    key: 'KEY_DATE_WEEK_DAYS',
                    pt: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                },
                {
                    key: 'KEY_DATE_MONTHS',
                    pt: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                }];

        }
    });

    QUnit.test('fixMoneyCurrency test case (en and pt)', function (assert) {
        QUnit.expect(10);

        app.strings.load("pt");
        assert.equal(app.stringtable.fixMoneyCurrency("0"), "R$ 0,00", 'Using text "0"');
        assert.equal(app.stringtable.fixMoneyCurrency("01"), "R$ 0,01", 'With one decimal places');
        assert.equal(app.stringtable.fixMoneyCurrency("012"), "R$ 0,12", 'With two decimal places');
        assert.equal(app.stringtable.fixMoneyCurrency("0123"), "R$ 1,23", 'With three decimal places (round down)');
        assert.equal(app.stringtable.fixMoneyCurrency("0127"), "R$ 1,27", 'With three decimal places (round up)');

        app.strings.load("en");
        assert.equal(app.stringtable.fixMoneyCurrency("0"), "0.00 €", 'Using text "0"');
        assert.equal(app.stringtable.fixMoneyCurrency("01"), "0.01 €", 'With one decimal places');
        assert.equal(app.stringtable.fixMoneyCurrency("012"), "0.12 €", 'With two decimal places');
        assert.equal(app.stringtable.fixMoneyCurrency("0123"), "1.23 €", 'With three decimal places (round down)');
        assert.equal(app.stringtable.fixMoneyCurrency("0127"), "1.27 €", 'With three decimal places (round up)');
    });

    QUnit.test('applyDateMask test case, most common date formats (en and pt)', function (assert) {
        QUnit.expect(6);

        app.strings.load("en");
        assert.equal(app.stringtable.applyDateMask("30/03/1990"), "Mar 30, 1990", 'Most common date format');
        assert.equal(app.stringtable.applyDateMask("03/09/1990"), "Sep 3, 1990", 'Most common date format');
        assert.equal(app.stringtable.applyDateMask("1412250274400"), "Oct 2, 2014", 'Most common date format, using timestamp');

        app.strings.load("pt");
        assert.equal(app.stringtable.applyDateMask("30/03/1990"), "30/03/1990", 'Most common date format');
        assert.equal(app.stringtable.applyDateMask("03/09/1990"), "03/09/1990", 'Most common date format');
        assert.equal(app.stringtable.applyDateMask("1412250274400"), "02/10/2014", 'Most common date format, using timestamp');
    });

    QUnit.test('applyLabels on DOM', function (assert) {
        QUnit.expect(5);
        app.strings.load("en");

        $("<label>").attr("id", "not-translate").addClass("translatable").text("This is not translatable").appendTo("#qunit-fixture");
        $("<label>").attr("id", "translate").addClass("translatable").text("KEY_MESSAGE").appendTo("#qunit-fixture");
        $("<label>").attr("id", "date").addClass("dateValue").text("01/10/2014").appendTo("#qunit-fixture");
        $("<label>").attr("id", "dateTimeStamp").addClass("dateValue").text("1412250274400").appendTo("#qunit-fixture");
        $("<label>").attr("id", "money").addClass("moneyValue").text("100").appendTo("#qunit-fixture");

        app.stringtable.applyLabels($("#qunit-fixture"));

        assert.equal($("#not-translate").text(), 'This is not translatable', 'Does not translate text that it is not KEYs');
        assert.equal($("#translate").text(), 'My message in english', 'Translate text in node');
        assert.equal($("#date").text(), "Oct 1, 2014", 'Date format in node');
        assert.equal($("#money").text(), "1.00 €", 'Money currency in node');
        assert.equal($("#dateTimeStamp").text(), "Oct 2, 2014", 'Date format in node from timestamp');
    });
});