class MenuComponent {
  get() {
    browser.get('http://localhost:8000/#!/myaccount');
  }

  btnClick(btnId){
    let btn = element(by.id(btnId));
    btn.click();
  }

  getBtnClass(btnId) {
    let btn = element(by.id(btnId));
    return btn.getAttribute('class');
  }

  getLocationUrl(){
    return browser.getLocationAbsUrl();
  }
}

module.exports = MenuComponent;