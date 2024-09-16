describe('Smock Tests', () => {
  it('Tabs and children containers', () => {
    cy.visit('/');

    cy.get('.mat-mdc-tab-links').find('a').its('length').should('eq', 2);

    cy.get('app-directive-test').should('not.exist');
    cy.get('app-component-test').should('not.exist');

    cy.get('.mat-mdc-tab-links').find('a').contains('Directive').click();

    cy.get('app-directive-test').find('fieldset').its('length').should('eq', 11);

    cy.get('.mat-mdc-tab-links').find('a').contains('Component').click();

    cy.get('app-component-test').find('fieldset').its('length').should('eq', 2);
  });
});
