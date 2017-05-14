'use strict'

angular
  .module('myApp')
  .component('menuComponent', {
    templateUrl: 'MenuComponent/MenuComponent.html',
    controller: function() {
      var vm = this;

      var current;
      vm.setActive = function(key) {
        current = key;
      }

      vm.isActive = function (key) {
        return key == current;
      }
    }
  });