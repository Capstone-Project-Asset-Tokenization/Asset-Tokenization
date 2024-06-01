/// <reference types="cypress" />

describe("Create New Asset", () => {
  beforeEach(() => {
    // Visit the page containing the form
    cy.visit("/asset-registration");
  });
  it("should display error messages for invalid input", () => {
    // Attempt to submit the form without filling in any fields
    cy.get('button[type="submit"]').click();

    // Check for error messages
    cy.contains(
      "Please fill all the above fields and upload all the necessary files!!"
    ).should("be.visible");
  });

  it("should fill the form and create a new asset", () => {
    // Fill in asset name
    cy.get("#assetName").type("Test Asset");

    // Fill in description
    cy.get("#description").type("This is a description for the test asset.");

    // Fill in price
    cy.get("#price").clear().type(10);

    // Fill in total supply
    // cy.get("#tokenOne").clear().type(100);

    // Select category
    cy.get("#category").select("1");

    // Upload asset images
    const assetImage = "./demo.png"; // Replace with the path to your test image
    cy.get("#assetImages").attachFile(assetImage);

    // Upload supporting files
    const supportingFile = "./test.pptx"; // Replace with the path to your test file
    cy.get("#supportingFiles").attachFile(supportingFile);

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Check for success message
    cy.contains("Asset created successfully", { timeout: 10000 }).should(
      "be.visible"
    );

    // Check that the form is reset
    cy.get("#assetName").should("have.value", "");
    cy.get("#description").should("have.value", "");
    cy.get("#price").should("have.value", 0);
    // cy.get("#token").should("have.value", 1);
    cy.get("#category").should("have.value", "0");
  });
});
