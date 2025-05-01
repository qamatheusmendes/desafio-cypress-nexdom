describe("Testes na GitHub REST API - @qamatheusmendes", () => {
    const username = "qamatheusmendes";
  
    it("Deve retornar os dados do usuário", () => {
      cy.request(`https://api.github.com/users/${username}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("login", username);
        expect(response.body).to.have.property("public_repos");
        expect(response.body).to.have.property("html_url", `https://github.com/${username}`);
      });
    });
  
    it("Deve listar os repositórios públicos do usuário", () => {
      cy.request(`https://api.github.com/users/${username}/repos`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
      });
    });
  
    it("Deve verificar se o repositório 'desafio-cypress-nexdom' existe", () => {
      cy.request({
        url: `https://api.github.com/repos/${username}/desafio-cypress-nexdom`,
        failOnStatusCode: false, 
      }).then((response) => {
        expect([200, 404]).to.include(response.status);
        if (response.status === 200) {
          expect(response.body).to.have.property("name", "desafio-cypress-nexdom");
        } else {
          cy.log("O repositório ainda não existe.");
        }
      });
    });
  });
  