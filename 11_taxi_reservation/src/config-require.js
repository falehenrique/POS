(function (root) {
    "use strict";

	root.require = {
        // paths for the libraries
        paths: {
            'include.data': '../data/include.data',
            backbone: '../libs/backbone/backbone',
            jquery: '../libs/zepto/zepto',
            underscore: '../libs/underscore/underscore',
            roller: '../libs/roller/roller',
            tetra: '../libs/tetra/tetra'
        },

		// Defines the shim config 
		shim:  {
			'jquery': {
				exports: '$'
			},
			'underscore': {
				exports: '_'
			},
			backbone: {
				exports: 'Backbone',
				deps: [ 'underscore' ]
			},
			'app': { deps: [ 'jquery', 'underscore', 'backbone', 'roller', 'tetra' ] },
			'include.data': { deps: [ 'app' ] },
			'core/strings': { deps: [ 'app' ] },
			'core/mediator': { deps: [ 'core/strings' ] },
			'core/appParameters': { deps: [ 'core/strings' ] },
			'core/stringtable': { deps: [ 'core/strings' ] },
			'core/pos': { deps: ['core/strings'] },
			'core/core': { deps: ['core/strings'] },
			'core/client': { deps: ['core/strings'] },
            'services/modal': { deps: ['core/strings'] },
            'views/footer': { deps: ['core/strings'] },
            'views/header': { deps: ['core/strings'] },
            'views/slider': { deps: ['core/strings'] },
            'templates/compiled/compiled': { deps: ['core/strings'] },
            'modules/home/view': { deps: ['templates/compiled/compiled'] },
            'modules/searching/view': { deps: ['templates/compiled/compiled'] },
            'modules/search_location/view': { deps: ['templates/compiled/compiled'] },
            'modules/search_destination/view': { deps: ['templates/compiled/compiled'] },
            'modules/check_location/view': { deps: ['templates/compiled/compiled'] },
            'modules/confirm_information/view': { deps: ['templates/compiled/compiled'] },
            'modules/receipt/view': { deps: ['templates/compiled/compiled'] },
            'init': {
                deps: [
                    'core/strings',
                    'core/mediator',
                    'core/appParameters',
                    'core/stringtable',
                    'core/pos',
                    'core/core',
                    'core/client',
                    'services/modal',
                    'views/footer',
                    'views/header',
                    'views/slider',
                    'templates/compiled/compiled',
                    'modules/home/view',
                    'modules/searching/view',
                    'modules/search_location/view',
                    'modules/search_destination/view',
                    'modules/check_location/view',
                    'modules/confirm_information/view',
                    'modules/receipt/view'
                ]
            }
		}
	};

}(window));