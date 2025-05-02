describe("Testes na GitHub REST API - @qamatheusmendes", () => {
  const username = "qamatheusmendes";
  const baseUrl = "https://api.github.com";
  const token = "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"; 
  const repoName = "desafio-cypress-nexdom12";
  const issueTitle = "Problema no repositório";
  const issueBody = "Descrição detalhada do problema no repositório.";

 
  const headers = {
    Authorization: `token ${token}`,
  };

  it("Deve criar um repositório no GitHub", () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/user/repos`,
      headers: headers,
      body: {
        name: repoName,
        description: "Repositório de teste para o desafio Cypress",
        private: false,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("name", repoName);
      expect(response.body).to.have.property("private", false);
    });
  });

  it("Deve criar uma issue no repositório recém-criado", () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/repos/${username}/${repoName}/issues`,
      headers: headers,
      body: {
        title: issueTitle,
        body: issueBody,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("title", issueTitle);
      expect(response.body).to.have.property("body", issueBody);
    });
  });

  it("Deve consultar a issue criada", () => {
    cy.request({
      url: `${baseUrl}/repos/${username}/${repoName}/issues`,
      headers: headers,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      if (response.body.length > 0) {
        const issue = response.body.find(issue => issue.title === issueTitle);
        expect(issue).to.exist;
        expect(issue).to.have.property("title", issueTitle);
      }
    });
  });

  it("Deve excluir o repositório", () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/repos/${username}/${repoName}`,
      headers: headers,
    }).then((response) => {
      expect(response.status).to.eq(204); 
    });
  });

  it("Deve verificar se o repositório foi excluído", () => {
    cy.request({
      url: `${baseUrl}/repos/${username}/${repoName}`,
      headers: headers,
      failOnStatusCode: false, 
    }).then((response) => {
      expect([404]).to.include(response.status);
      if (response.status === 404) {
        cy.log("O repositório foi excluído com sucesso.");
      }
    });
  });

  it("Deve retornar os dados do usuário", () => {
    cy.request(`${baseUrl}/users/${username}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("login", username);
      expect(response.body).to.have.property("html_url", `https://github.com/${username}`);
      expect(response.body).to.have.property("public_repos");
      expect(response.body).to.have.property("followers");
      expect(response.body).to.have.property("bio");
    });
  });

  it("Deve listar os repositórios públicos do usuário", () => {
    cy.request(`${baseUrl}/users/${username}/repos`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      if (response.body.length > 0) {
        expect(response.body[0]).to.have.property("name");
        expect(response.body[0]).to.have.property("html_url");
      }
    });
  });

  it("Deve verificar se o repositório 'desafio-cypress-nexdom' existe", () => {
    cy.request({
      url: `${baseUrl}/repos/${username}/desafio-cypress-nexdom`,
      failOnStatusCode: false,
    }).then((response) => {
      expect([200, 404]).to.include(response.status);
      if (response.status === 200) {
        expect(response.body).to.have.property("name", "desafio-cypress-nexdom");
        expect(response.body).to.have.property("private", false);
      } else {
        cy.log("O repositório ainda não foi encontrado.");
      }
    });
  });

  it("Deve validar número de seguidores seja um número", () => {
    cy.request(`${baseUrl}/users/${username}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.followers).to.be.a("number");
    });
  });

  it("Deve validar se a bio está definida ou está vazia", () => {
    cy.request(`${baseUrl}/users/${username}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("bio");
    });
  });
});
