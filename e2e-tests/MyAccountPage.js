class MyAccountPage {
  get() {
    browser.get('http://localhost:8000/#!/myaccount');
  }

  setName(val) {
    element(by.css('input[type="text"].form-control')).sendKeys(val);
  }

  setEmail(val) {
    element(by.css('input[type="email"].form-control')).sendKeys(val);
  }

  setTel(val) {
    element(by.css('input[type="tel"].form-control')).sendKeys(val);
  }

  isSaveBtnEnabled() {
    return element(by.css('button[type="submit"].btn')).isEnabled();
  }
}

module.exports = MyAccountPage;