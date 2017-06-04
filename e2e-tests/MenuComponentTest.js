const MenuComponent = require('./MenuComponent');

describe('MenuComponent', function(){
  it('should add class "current" when user navigates to list menu item', function(){
    const menuComponent = new MenuComponent();
    menuComponent.get();
    menuComponent.btnClick('btnList');
    expect(menuComponent.getBtnClass('btnList')).toMatch('current');
  });

  it('should redirect to /myaccount when myaccount link is clicked', function() {
    const menuComponent = new MenuComponent();
    menuComponent.get();
    menuComponent.btnClick('btnMyAccount');
    expect(menuComponent.getLocationUrl()).toMatch('/myaccount');
  });

   it('should redirect to /list when list link is clicked', function() {
    const menuComponent = new MenuComponent();
    menuComponent.get();
    menuComponent.btnClick('btnList');
    expect(menuComponent.getLocationUrl()).toMatch('/list');
  });

   it('should redirect to /new when new link is clicked', function() {
    const menuComponent = new MenuComponent();
    menuComponent.get();
    menuComponent.btnClick('btnCreateNew');
    expect(menuComponent.getLocationUrl()).toMatch('/new');
  });
});