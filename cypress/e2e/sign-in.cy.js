describe('Sign in', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('Displays login form', () => {
    cy.get('[data-testid="email-input"]').should('exist');
    cy.get('[data-testid="password-input"]').should('exist');
    cy.get('[data-testid="submit-button"]').should('exist');
  });

  it('Logs in successfully with valid credentials', () => {
    cy.get('[data-testid="email-input"]').type('admin@email.com');
    cy.get('[data-testid="password-input"]').type('P@ssword1!');
    cy.get('[data-testid="submit-button"]').click();

    cy.url().should('include', '/admin/dashboard');
    cy.get('h2').should('have.text', 'Финансы');
  });

  it('Logs out successfully', () => {
    cy.get('[data-testid="email-input"]').type('admin@email.com');
    cy.get('[data-testid="password-input"]').type('P@ssword1!');
    cy.get('[data-testid="submit-button"]').click();

    cy.get('button.logout-button').click();
    cy.url().should('include', '/auth');
    cy.get('[data-testid="email-input"]').should('exist');
  });
});
