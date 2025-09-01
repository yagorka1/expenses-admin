describe('Authentication', () => {
  it('Logs in', () => {
    cy.visit('http://localhost:4200')
    cy.get('input[type="email"]').type('admin@email.com');
    cy.get('input[type="password"]').type('P@ssword1!');
    cy.get('button[type="submit"]').click()
    cy.get('h2').should('have.text', 'Финансы')
  })
})
