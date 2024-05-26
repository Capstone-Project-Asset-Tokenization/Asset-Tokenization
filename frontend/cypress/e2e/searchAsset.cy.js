Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  return false;
});

describe("Search Functionality", () => {
  
  beforeEach(() => {
    cy.request("POST", "http://localhost:5001/api/user/login", {
      email: "jebessadejene2021@gmail.com",
      password: "12345678",
      requestVerification: false,
    }).then((response) => {
      console.log(response);

      const { user, roles, ...rest } = response.body;

      window.localStorage.setItem(
        "authData",
        JSON.stringify({
          ...rest,
          user: user,
          isAuthenticated: true,
          roles: roles,
        })
      );
    });

    // Visit the marketplace page before each test

  });

  

  it("searches for an asset", () => {
    cy.visit("/asset-marketplace");
    cy.wait(6000)
    cy.contains('search')
    .should('be.visible')
    // Type a query into the search input
    // cy.get('input[name="search"]').type("Test Asset");

    // // Submit the search form
    // cy.get('button[type="submit"]').click();

    // // Check that the search results contain the expected asset
    // cy.contains("Test Asset").should("be.visible");
  });
});
