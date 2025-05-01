Feature: Testes no site Nexdom

  Scenario: Verifica texto da página inicial
  Given que o usuário acessa a página inicial
  Then o título "Transformamos a gestão de planos de saúde através da tecnologia e inovação!" deve estar visível

Scenario: Acessa a seção de Contato e valida a URL
  Given que o usuário acessa a página inicial
  When o usuário clica no menu Contato
  Then a URL deve ser "https://nexdom.tec.br/contato/"




