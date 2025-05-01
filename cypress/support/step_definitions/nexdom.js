import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que o usuário acessa a página inicial", () => {
  cy.visit("https://nexdom.tec.br");
});

Then("o título {string} deve estar visível", (titulo) => {
  cy.contains(titulo).should("be.visible");
});

When("o usuário clica no menu Contato", () => {
  cy.contains("a", "Contato").click({ force: true });
});

Then("a URL deve ser {string}", (url) => {
  cy.url().should("eq", url);
});
