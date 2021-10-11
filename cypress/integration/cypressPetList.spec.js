/// <reference types="Cypress" />

describe("Pet List Page Tests", () => {
  beforeEach(() => {
    cy.wait(700);
  });

  it("Shows the pet list and Next button", () => {
    localStorage.setItem("Authorization", Cypress.env("userToken"));
    cy.visit("/foundations/613fecc4e485559caa864add/pets");
    cy.get(".card-list-item").should("exist");
    cy.get(".list-buttons").should("exist");
  });

  it("Redirects to home when the user is not authenticated", () => {
    cy.visit("/foundations/613fecc4e485559caa864add/pets");
    cy.contains("Adopting is extremely easy");
  });

  it("Shows the pet list", () => {
    localStorage.setItem("Authorization", Cypress.env("userToken"));
    cy.visit("/foundations/613fecc4e485559caa864add/pets");
    cy.get(".card-list-item").should("exist");
  });

  it("Does not show the Next button", () => {
    localStorage.setItem("Authorization", Cypress.env("userToken"));
    cy.visit("/foundations/6148bc75b544bc9daace08c7/pets");
    cy.get(".card-list-item").should("exist");
    cy.get(".list-buttons").should("not.exist");
  });

  it("Does not show the Create button for users", () => {
    localStorage.setItem("Authorization", Cypress.env("userToken"));
    cy.visit("/foundations/6148bc75b544bc9daace08c7/pets");
    cy.get(".add-pets-container").should("not.exist");
  });

  it("Redirects to Adoption Request when clicking a card", () => {
    localStorage.setItem("Authorization", Cypress.env("userToken"));
    cy.visit("/foundations/6148bc75b544bc9daace08c7/pets");
    cy.get(".card-list-item__details").first().click();
    cy.contains("ADOPT ME");
  });

  it("Shows no pets found message", () => {
    localStorage.setItem("Authorization", Cypress.env("userToken"));
    cy.visit("/foundations/613a5c5e382eee3ccac5bad0/pets");
    cy.contains("No pets available for this foundation");
  });

  it("Does show the Create button for foundations", () => {
    localStorage.setItem("Authorization", Cypress.env("foundationToken"));
    cy.visit("/foundations/613fecc4e485559caa864add/pets");
    cy.get(".add-pets-container").should("exist");
  });

  it("Redirects to Pet Manage Page when clicking a card", () => {
    localStorage.setItem("Authorization", Cypress.env("foundationToken"));
    cy.visit("/foundations/613fecc4e485559caa864add/pets");
    cy.get(".card-list-item__details").first().click();
    cy.get(".request-container").should("exist");
  });

  it("Shows you don't have pets registered message", () => {
    localStorage.setItem(
      "Authorization",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTRhNGMyZTA1NDQ1Y2MzNTNkNWViNTkiLCJpYXQiOjE2MzMwMjg5ODR9.aQwj2Pb13deR8k7WWaY_7IpeV7fF3wUbF_AHKJWaB8k"
    );
    cy.visit("/foundations/614a4c2e05445cc353d5eb59/pets");
    cy.contains("You don't have any pets registered");
  });
});
