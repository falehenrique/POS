/**
 * @fileoverview Strings Module
 * @author Rafael R Itajuba
 * @author Danilo Bevilacqua Scavassa
 * @version 2.0.0
 */
(function (root) {
    "use strict";

    // If the app namespace is not set, set it.
    /* istanbul ignore next */
    root.app = root.app || {};

    var language = navigator.language,
        /**
         * @namespace strings
         * @description String list for i18n
         * @memberof app
         */
        strings = {
            /**
             * @description Transation cache
             * @type {Object.<string, string>}
             * @memberof app.strings
             */
            labelList: [],

            /**
             * @description Could have more properties, for more languages
             * @typedef {object} Translatable
             * @property {string} key Key Text (to be replaced)
             * @property {string} pt Text in portuguese (generic)
             * @property {string} en Text in english (generic)
             */

            /**
             * @type {Translatable[]}
             * @memberof app.strings
             */
            translationList: [

                /* Currency related info, according to ISO 4217 table (https://en.wikipedia.org/wiki/ISO_4217) */
                {
                    key: 'KEY_CURRENCY_SYMBOL',
                    pt: 'R$',
                    en: '$'
                },
                {
                    key: 'KEY_CURRENCY_CODE',
                    pt: 986,
                    en: 840
                },
                {
                    key: 'KEY_CURRENCY_MINOR_UNIT',
                    pt: 2,
                    en: 2
                },
                {
                    key: 'KEY_CURRENCY_SEPARATOR',
                    pt: ',',
                    en: '.'
                },
                {
                    key: 'KEY_CURRENCY_SEPARATOR_THOUSAND',
                    pt: '',
                    en: ','
                },
                {
                    key: 'KEY_CURRENCY',
                    pt: 'BRL',
                    en: 'USD'
                },
                {
                    key: 'KEY_CURRENCY_DIRECTION',
                    pt: 'ltr',
                    en: 'rtl'
                },
                {
                    key: 'KEY_CURRENCY_POSITION',
                    pt: 'CURRENCY_BEFORE_AMOUNT',
                    en: 'AMOUNT_BEFORE_CURRENCY'
                },

                {
                    key: 'KEY_HOME_TTL',
                    pt: 'Sua localização',
                    en: 'Your location'
                },
                {
                    key: 'KEY_CHOOSE_OTHER',
                    pt: 'Escolha outra',
                    en: 'Choose other'
                },
                {
                    key: 'KEY_USE_CURRENT',
                    pt: 'Use essa',
                    en: 'Use this'
                },
                {
                    key: 'KEY_LOCATION',
                    pt: 'localização',
                    en: 'location'
                },

                {
                    key: 'KEY_LOADING',
                    pt: 'Carregando...',
                    en: 'Loading...'
                },

                {
                    key: 'KEY_SEARCH_LOCATION_TTL',
                    pt: 'Procurar Localização',
                    en: 'Search Location'
                },
                {
                    key: 'KEY_TEXT_SEARCH_LOCATION',
                    pt: 'Insira o endereço',
                    en: 'Insert address'
                },
                {
                    key: 'KEY_CONFIRM',
                    pt: 'Confirmar',
                    en: 'Confirm'
                },

                {
                    key: 'KEY_SEARCH_DESTINATION_TTL',
                    pt: 'Procurar Destino',
                    en: 'Search Destination'
                },
                {
                    key: 'KEY_TEXT_DESTINATION',
                    pt: 'Insira o endereço destino',
                    en: 'Insert destination address'
                },
                {
                    key: 'KEY_SEARCH',
                    pt: 'Procurar',
                    en: 'Search'
                },
                {
                    key: 'KEY_ROUTE',
                    pt: 'rota',
                    en: 'route'
                },

                {
                    key: 'KEY_SEARCHING_TTL',
                    pt: 'Procurando Rota',
                    en: 'Searching Route'
                },
                {
                    key: 'KEY_TEXT_SEARCHING',
                    pt: 'Procurando...',
                    en: 'Searching...'
                },

                {
                    key: 'KEY_CHECK_LOCATION_TTL',
                    pt: 'Verificar Localização',
                    en: 'Check Location'
                },
                {
                    key: 'KEY_ADDRESSES',
                    pt: 'endereços',
                    en: 'addresses'
                },

                {
                    key: 'KEY_CONFIRM_INFORMARION_TTL',
                    pt: 'Confirmar informações',
                    en: 'Confirm ride information'
                },
                {
                    key: 'KEY_REQUEST_TAXI',
                    pt: 'Pedir taxi',
                    en: 'Request taxi'
                },
                {
                    key: 'KEY_AND_PAY',
                    pt: 'e pagar',
                    en: 'and pay'
                },
                {
                    key: 'KEY_INITIAL_LOCATION',
                    pt: 'Local de partida',
                    en: 'Initial location'
                },
                {
                    key: 'KEY_DESTINATION',
                    pt: 'Destino',
                    en: 'Destination'
                },
                {
                    key: 'KEY_FARE',
                    pt: 'Tarifa',
                    en: 'Fare'
                },
                {
                    key: 'KEY_DERATTURE_TIME',
                    pt: 'Hora de partida',
                    en: 'Departure time'
                },

                {
                    key: 'KEY_RECEIPT_TTL',
                    pt: 'Recibo',
                    en: 'Receipt'
                },
                {
                    key: 'KEY_PRINT',
                    pt: 'Imprimir',
                    en: 'Print'
                },
                {
                    key: 'KEY_SKIP',
                    pt: 'Pular',
                    en: 'Skip'
                },
                {
                    key: 'KEY_RECEIPT',
                    pt: 'recibo',
                    en: 'receipt'
                },
                {
                    key: 'KEY_RESERVATION_NUMBER',
                    pt: 'Número da reserva',
                    en: 'Reservation number'
                },
                {
                    key: 'KEY_ENJOY_YOUR_RIDE',
                    pt: 'Aproveite sua corrida',
                    en: 'Enjoy your ride'
                },

                {
                    key: 'KEY_NOT_FOUND',
                    pt: 'Destino ou Origem Não Encontrado.',
                    en: 'Destination or Origin Not Found.'
                },
                {
                    key: 'KEY_INVALID_DESTINATION',
                    pt: 'Destino inválido. Não deve ser igual ao local de origem.',
                    en: 'Invalid destination. It must not be equal to origin location.'
                },
                {
                    key: 'KEY_EMPTY_DESTINATION',
                    pt: 'Destino inválido. Não deve estar em branco.',
                    en: 'Invalid destination. It must not be blank.'
                },
                {
                    key: 'KEY_TRANSACTION_ERROR',
                    pt: 'A transação falhou, por favor tente novamente.',
                    en: 'Transaction failed, please try again',
                    fr: "La transaction a échoué, s'il vous plaît essayez à nouveau"
                },
                {
                    key: 'KEY_ZERO_RESULTS',
                    pt: 'Não há rotas entre estes dois locais.',
                    en: 'There is no route between those places.'
                }
            ],

            /**
             * Load labelList from a given language
             * @param {string} language language code (like pt-BR) to be loaded
             * @memberof app.strings
             */
            load: function (language) {
                var i = 0;

                // English is fallback
                for (i = 0; i < this.translationList.length; i += 1) {
                    this.labelList[this.translationList[i].key] = this.translationList[i][language] || this.translationList[i][language.substr(0, 2)] || this.translationList[i].en;
                }
            }
        };

    // Sets the mediator object on the app namespace
    root.app.strings = strings;

    // Load the specified language from translationList
    root.app.strings.load(language);

}(window));