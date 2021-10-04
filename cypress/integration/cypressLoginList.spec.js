/// <reference types="Cypress" />

describe("Login Tests", () => {
  beforeEach(() => {
    cy.wait(700);
    cy.visit("/login");
  });

  it("redirects lo Login", () => {
    cy.contains("Login");
  });

  it("Login with right credentials", () => {
    cy.get(`[name="email"]`).type("pepito@test.com");
    cy.get(`[name="password"]`).type("Test1234{enter}");
    cy.contains("LOG OUT");
  });

  it("Shows invalid email", () => {
    cy.get(`[name="email"]`).type("pepitotest.com");
    cy.get(`[name="password"]`).click();
    cy.contains("Invalid Email");
  });

  it("Shows invalid credentials", () => {
    cy.get(`[name="email"]`).type("pepito@test.com");
    cy.get(`[name="password"]`).type("Test123{enter}");
    cy.contains("Invalid credentials");
  });

  it("Redirects to Sign Up", () => {
    cy.get(`p.login__container--register a[href="/signup"]`).click();
    cy.contains("Sign up to continue");
  });
});
