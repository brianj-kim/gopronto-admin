describe('Users Page', () => {
  it('Should load user table', () => {
    cy.get('[routerlink="/users"]').click();
    cy.get('table');
  });

  it('Should display right column names', () => {
    cy.contains('id');
    cy.contains('name');
    cy.contains('username');
    cy.contains('email');
    cy.contains('role');
  });

  it('Should navigate to next page', () => {
    cy.get('pagination-template>div>a').contains('>').click();
  });

  it('Should filter users by username', () => {
    cy.get('[placeholder="Search by username"').type('jiwoone');
    cy.get('table').find('tbody>tr').should('have.length', 9)
  });
});