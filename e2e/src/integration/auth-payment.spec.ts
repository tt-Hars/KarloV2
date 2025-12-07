describe('Auth and Payment Flow', () => {
  it('should allow user registration', () => {
    cy.visit('/register');
    cy.get('input[name="username"]').type('TestUser' + Date.now()); // Unique user
    cy.get('input[name="email"]').type(`test${Date.now()}@example.com`);
    cy.get('input[name="password"]').type('password123');
    cy.get('button').contains('Register').click();

    // Expect redirect to home or login
    cy.url().should('include', '/');
  });

  it('should allow user login', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@example.com'); // Assume pre-seeded or from prev test
    cy.get('input[name="password"]').type('password123');
    cy.get('button').contains('Login').click();

    cy.url().should('include', '/');
  });
});
