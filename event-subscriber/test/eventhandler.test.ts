const Given = describe, When = describe, And = describe, Then = it;

Given('Given the EventHandler class', () => {
  When('When the class is instantiated', () => {
    Then('Then the server object must exist', () => {
      expect(false).toBeTruthy();
    })
  })
})
