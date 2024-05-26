describe('Registration Form Validation', () => {
  beforeEach(() => {
    // Visit the registration page before each test
    cy.visit('/signup');
  });

  it('validates the form fields', () => {
    // Submit the form without filling out any fields
    cy.get('button[type="submit"]').click();

    // Check that the error messages are displayed
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
    cy.contains('Please confirm your password').should('be.visible');
    cy.contains('Legal ID No. is required').should('be.visible');

    // Fill out the email field with an invalid email
    cy.get('input[name="email"]').type('invalid email');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Check that the invalid email error message is displayed
    cy.contains('Invalid email').should('be.visible');
  });
});