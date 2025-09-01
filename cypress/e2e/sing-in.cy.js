describe('Sign in', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('Displays login form', () => {
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('Logs in successfully with valid credentials', () => {
    cy.get('input[type="email"]').type('admin@email.com');
    cy.get('input[type="password"]').type('P@ssword1!');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/admin/dashboard');
    cy.get('h2').should('have.text', 'Финансы');
  });

  it('Logs out successfully', () => {
    cy.get('input[type="email"]').type('admin@email.com');
    cy.get('input[type="password"]').type('P@ssword1!');
    cy.get('button[type="submit"]').click();

    cy.get('button.logout-button').click();
    cy.url().should('include', '');
    cy.get('input[type="email"]').should('exist');
  });
});
