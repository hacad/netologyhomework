'use strict';

angular
    .module('myApp')
    .controller('MyAccountCtrl', function(MyAccountStore) {
      var vm = this;
      var storeAccount = MyAccountStore.getAccountInfo();
      vm.myAccount = {name: storeAccount.name, email: storeAccount.email, tel: storeAccount.tel};
      vm.addAccountInfo = function(accountInfo) {
        vm.myAccountForm.$setPristine();
        MyAccountStore.setAccountInfo({name: accountInfo.name, email: accountInfo.email, tel:  accountInfo.tel});

        storeAccount = MyAccountStore.getAccountInfo();
      }

      vm.isSaveBtnDisabled = function() {
        let oldName = storeAccount.name || '',
            newName =  vm.myAccount.name || '',
            oldEmail = storeAccount.email || '',
            newEmail = vm.myAccount.email || '',
            oldTel = storeAccount.tel || '',
            newTel = vm.myAccount.tel || '';

        return (vm.myAccountForm.$invalid) || (oldTel == newTel && oldEmail == newEmail && oldName == newName);
      }
    });