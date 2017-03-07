/*global app: false, QUnit: false, define: false, $: false, root: false */

define(function (require) {
    "use strict";

    // Define the QUnit module and life cycle.
    QUnit.module("strings", {
        setup: function () {

            app.strings.translationList = [
                {
                    key: 'KEY_CURRENCY_SYMBOL',
                    pt: 'R$',
                    en: '€'
                },
                {
                    key: 'KEY_LOADING',
                    pt: 'Carregando...',
                    en: 'Loading...'
                }];

        }
    });

    QUnit.test('Basic i18n', 4, function (assert) {
        QUnit.expect(4);
        app.strings.load("en");

        assert.equal(app.strings.labelList.KEY_CURRENCY_SYMBOL, app.strings.translationList[0].en, 'Loading one text using English');
        assert.equal(app.strings.labelList.KEY_LOADING, app.strings.translationList[1].en, 'Loading the other text using English');

        app.strings.load("pt");

        assert.equal(app.strings.labelList.KEY_CURRENCY_SYMBOL, app.strings.translationList[0].pt, 'Loading one text using Portuguese');
        assert.equal(app.strings.labelList.KEY_LOADING, app.strings.translationList[1].pt, 'Loading the other text using Portuguese');
    });

    QUnit.test('Fallback to language without country', 4, function (assert) {
        QUnit.expect(4);
        app.strings.load("en-GB");

        assert.equal(app.strings.labelList.KEY_CURRENCY_SYMBOL, app.strings.translationList[0].en, 'Fallback to one text in default English');
        assert.equal(app.strings.labelList.KEY_LOADING, app.strings.translationList[1].en, 'Fallback to other text in default English');

        app.strings.load("pt-PT");

        assert.equal(app.strings.labelList.KEY_CURRENCY_SYMBOL, app.strings.translationList[0].pt, 'Fallback to one text in default Portuguese');
        assert.equal(app.strings.labelList.KEY_LOADING, app.strings.translationList[1].pt, 'Fallback to other text in default Portuguese');
    });

    QUnit.test('Fallback to default language (en)', 2, function (assert) {
        QUnit.expect(2);
        app.strings.load("fr-CA");

        assert.equal(app.strings.labelList.KEY_CURRENCY_SYMBOL, app.strings.translationList[0].en, 'Fallback to one text in default English');
        assert.equal(app.strings.labelList.KEY_LOADING, app.strings.translationList[1].en, 'Fallback to other text in default English');
    });
});