const { USERNAME, PASWWORD, PASSWORD } = require('./constant');

describe('Test Sigin in Flow', () => {
  it('Should sign in user', () => {
    cy.visit('/signin');
    cy.get('[formcontrolname="email"]').type(USERNAME);
    cy.get('[formcontrolname="password"]').type(PASSWORD);
    cy.get('[type="submit"]').click();
    cy.url().should('include', 'admin');
  })
})