import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que o usuário acessa a página inicial", () => {
  cy.viewport(1280, 720);
  cy.visit("https://nexdom.tec.br");
});

Then("o título {string} deve estar visível", (titulo) => {
  cy.contains(titulo, { timeout: 10000 }).should("be.visible");
});

Then("os itens do menu devem estar visíveis", () => {
    const opcoes = ["Home", "Sobre nós", "Soluções", "Carreiras", "Contato"];
  
    opcoes.forEach((texto) => {
      cy.contains(texto, { timeout: 10000 }).should("be.visible");
  });
});
