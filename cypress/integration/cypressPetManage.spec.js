describe("Pet Manage Page Tests", () => {
  beforeEach(() => {
    cy.wait(700);
  });

  it("Shows the adoption requests list", () => {
    localStorage.setItem("Authorization", Cypress.env("foundationToken"));
    cy.visit("/pets/6143e2a60d4bc9d25fb9e929/manage");
    cy.get(".request-container").should("exist");
  });
});
