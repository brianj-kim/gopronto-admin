describe('Homepage', () => {

  it('should load successfully', () => {
    cy.visit('/');
  });

  it('should contain right spelled texts', () => {
    cy.contains('Users');
    cy.contains('Admin');
    cy.get('button>span').click();
    cy.contains('Sign in');
    cy.contains('Sign up');
  });
});