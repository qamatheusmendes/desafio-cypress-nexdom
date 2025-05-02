Feature: Testes no site Nexdom

  Scenario: Verifica texto da página inicial
  Given que o usuário acessa a página inicial
  Then o título "Transformamos a gestão de planos de saúde através da tecnologia e inovação!" deve estar visível

  Scenario: Verifica itens do menu superior
  Given que o usuário acessa a página inicial
  Then os itens do menu devem estar visíveis

