// cypress/integration/registration.spec.js

describe("Registration", () => {
  beforeEach(() => {
    cy.visit("/signup"); // Adjust the URL based on your routing setup
  });

  it("should display the registration form", () => {
    cy.get("h2").contains("Create Account").should("be.visible");
    cy.get("form").should("exist");
  });

  it("should allow the user to fill out the registration form", () => {
    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="email"]').type("john.doe@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="nationalID"]').type("1234567890");

    cy.get('button[type="submit"]').click();
  });

  it("should display connect wallet step after form submission", () => {
    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="email"]').type("john.doe@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="nationalID"]').type("1234567890");

    cy.get('button[type="submit"]').click();

    cy.get("h4").contains("Connect Wallet").should("be.visible");
  });

  it("should handle wallet connection with positive and negative scenarios", () => {
    // Fill out the registration form
    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="email"]').type("john.doe@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="nationalID"]').type("1234567890");

    cy.get('button[type="submit"]').click();

    cy.get('button[data-testid="connect-wallet"]').click();
    cy.wait(1000);

    cy.contains('Your MetaMask account is connected!')
    .should('be.visible')

  });

  it("should send request after complete registration", () => {
    
    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="email"]').type("john.doe@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="nationalID"]').type("1234567890");

    cy.get('button[type="submit"]').click();

    cy.get('button[data-testid="connect-wallet"]').click();
    cy.wait(10000);
    cy.get('button[data-testid="complete-registration"]').click();

  });
});
