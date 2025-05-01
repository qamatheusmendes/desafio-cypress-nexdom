import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que o usuário acessa a página inicial", () => {
  cy.visit("https://nexdom.tec.br");
});

Then("o título {string} deve estar visível", (titulo) => {
  cy.contains(titulo, { timeout: 10000 }).should("be.visible");
});

When("o usuário clica no menu Contato", () => {
  cy.get('a[href="#contato"]').click(); 
});

Then("a URL deve ser {string}", (urlEsperada) => {
  cy.url().should('eq', urlEsperada); 
});
