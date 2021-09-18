describe("Login with correct and incorrect user credentials", () => {
    it("it should not be able to login with wrong credentials", () => {
        cy.visit("localhost:3000");
        cy.get("#login").click();
        cy.wait(1000);
        cy.get("#username").type(Cypress.env("newName"));
        cy.get("#password").type(Cypress.env("newPassword"));
        cy.get("#submit").click();
        cy.contains("Username or password is incorrect");
    });
    it("it should not be able to login with wrong credentials", () => {
      cy.visit("localhost:3000");
      cy.get("#registration").click();
      cy.wait(1000);
      cy.get("#username").type(Cypress.env("newName"));
      cy.get("#email").type(Cypress.env("newEmail"));
      cy.get("#password").type(Cypress.env("newPassword"));
      cy.get("#submit").click();
    });
    it("should be able to login with new credentials and the user should be navigated to the home directory", () => {
      cy.visit("localhost:3000");
      cy.get("#login").click();
      cy.wait(1000);
      cy.get("#username").type(Cypress.env("newName"));
      cy.get("#password").type(Cypress.env("newPassword"));
      cy.get("#submit").click();
      cy.wait(2000);
      cy.url().should("include", "home");
    });
  });
  