describe('Smoke Tests', () => {
	it('Tabs and children containers', () => {
		cy.visit('/');

		// two navigation tabs: Directive and Component
		cy.get('.mat-mdc-tab-links').find('a').its('length').should('eq', 2);

		// root redirects to /directive-test, so that view is rendered by default
		cy.get('app-directive-test').should('exist');
		cy.get('app-component-test').should('not.exist');
		// one mat-card per directive demo
		cy.get('app-directive-test').find('mat-card').its('length').should('eq', 13);

		// switch to the Component tab
		cy.get('.mat-mdc-tab-links').find('a').contains('Component').click();
		cy.get('app-component-test').should('exist');
		cy.get('app-directive-test').should('not.exist');
		cy.get('app-component-test').find('mat-card').its('length').should('eq', 2);

		// switch back to the Directive tab
		cy.get('.mat-mdc-tab-links').find('a').contains('Directive').click();
		cy.get('app-directive-test').should('exist');
		cy.get('app-component-test').should('not.exist');
	});
});
