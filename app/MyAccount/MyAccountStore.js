'use strict';

angular
  .module('myApp')
  .factory('MyAccountStore', function() {
    const state = {
      accountInfo: {}
    };

    return {
      getAccountInfo()  {
        return state.accountInfo;
      },
      setAccountInfo(accountInfo){
        state.accountInfo = accountInfo;
      }
  };
})