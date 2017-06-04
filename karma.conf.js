//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-messages/angular-messages.js',
      './app.js',
      './PokemonsService/PokemonsService.js',
      './ShoppingCartStore/ShoppingCartStore.js',
      './PokemonList/PokemonListCtrl.js',
      'components/**/*.js',
      '../unit-tests/*.js'    
    ],

    autoWatch: true,

    frameworks: ['jasmine', 'sinon'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-sinon'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
