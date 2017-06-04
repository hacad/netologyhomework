const MyAccountPage = require('./MyAccountPage');

describe('MyAccountPage', function(){
  it('should not enabled save button when only name is set', function(){
    const myAccountPage = new MyAccountPage();
    myAccountPage.get();
    myAccountPage.setName('some name');
    expect(myAccountPage.isSaveBtnEnabled()).toBe(false);
  });

  it('should not enabled save button when only email is set', function(){
    const myAccountPage = new MyAccountPage();
    myAccountPage.get();
    myAccountPage.setEmail('test@test.com');
    expect(myAccountPage.isSaveBtnEnabled()).toBe(false);
  });

  it('should not enabled save button when only phone is set', function(){
    const myAccountPage = new MyAccountPage();
    myAccountPage.get();
    myAccountPage.setTel('+71234567890');
    expect(myAccountPage.isSaveBtnEnabled()).toBe(false);
  });

  it('should be enabled save button when all fields are set', function(){
    const myAccountPage = new MyAccountPage();
    myAccountPage.get();
    myAccountPage.setName('some name');
    myAccountPage.setEmail('test@test.com');
    myAccountPage.setTel('+71234567890');
    expect(myAccountPage.isSaveBtnEnabled()).toBe(true);
  });
});