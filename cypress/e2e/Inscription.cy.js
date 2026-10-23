import { select } from '../support/select';

  const url="http://localhost:8080";

describe('Inscription', () => {
  beforeEach(() => {
    cy.visit(url + '/register')
  });

  it('INS-01 : inscription avec des données valides', () => {
    // ARRANGE : utilisateur, départ sur /register
    const user = {
      nom: 'Doe',
      prenom: 'John',
      email: `john.doe@test.com`,
      password: '123'
    };

    // ACT : remplir tous les champs et envoyer
    cy.get(select.nom).type(user.nom);
    cy.get(select.prenom).type(user.prenom);
    cy.get(select.email).type(user.email);
    cy.get(select.password).type(user.password);
    cy.get(select.confirmPassword).type(user.password);
    cy.get(select.submit).click();

    // ASSERT : message de confirmation...
    cy.get(select.msg).should('be.visible').and('not.be.empty');
  });

  it('INS-02 : inscription avec un champ obligatoire vide (nom et prénom)', () => {
    // ARRANGE : nom et prénom volontairement absents
    const user = {
      email: 'user3@test.com',
      password: '123'
    };

    // ACT : remplir les autres champs et envoyer
    cy.get(select.email).type(user.email);
    cy.get(select.password).type(user.password);
    cy.get(select.confirmPassword).type(user.password);
    cy.get(select.submit).click();

    // ASSERT : message d'erreur, on reste sur /register
    cy.url().should('include', '/register');
    cy.get(select.msg).should('be.visible').and('not.be.empty');
    cy.visit(url + '/login');
    cy.get(select.email).type(user.email);
    cy.get(select.password).type(user.password);
    cy.get(select.submit).click();
  });

  it('INS-03 : inscription avec deux mots de passe différents', () => {
    // ARRANGE
    const user1 = {
      nom: 'David',
      prenom: 'John',
      email: `davidJ@test.com`,
    };

    // ACT : mot de passe et confirmation différents
    cy.get(select.nom).type(user1.nom);
    cy.get(select.prenom).type(user1.prenom);
    cy.get(select.email).type(user1.email);
    cy.get(select.password).type('123');
    cy.get(select.confirmPassword).type('789');
    cy.get(select.submit).click();

    // ASSERT : message exact, on reste sur /register
    cy.url().should('include', '/register');
    cy.contains('Les 2 mots de passe ne sont pas identiques').should('be.visible');
    cy.visit(url + '/login');
    cy.get(select.email).type(user1.email);
    cy.get(select.password).type('123');
    cy.get(select.submit).click();
  });
});