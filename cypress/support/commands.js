// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const BASE = "http://127.0.0.1:8000";

// Crée un compte via le formulaire d'inscription
Cypress.Commands.add("creerCompte", (email, password) => {
	cy.visit(`${BASE}/register`);
	cy.get('input[name="firstname"]').type("Jean");
	cy.get('input[name="lastname"]').type("Dupont");
	cy.get('input[name="email"]').type(email);
	cy.get('input[name="password"]').type(password);
	cy.get('input[name="confirm-password"]').type(password);
	cy.get('input[name="submit"]').click();
	cy.get("main p").should("contain", `Le compte : ${email} a été ajouté en BDD`);
});

// Connecte un compte existant
Cypress.Commands.add("connecter", (email, password) => {
	cy.clearCookies();
	cy.visit(`${BASE}/login`);
	cy.get('input[name="email"]').type(email);
	cy.get('input[name="password"]').type(password);
	cy.get('input[name="submit"]').click();
	cy.contains("a", "Déconnexion").should("exist");
});

// Crée une catégorie (si elle existe déjà, rien ne change)
Cypress.Commands.add("creerCategorie", (nom) => {
	cy.visit(`${BASE}/category/new`);
	cy.get('input[name="name"]').type(nom);
	cy.get('input[name="submit"]').click();
});

// Crée une tache avec une catégorie existante, le compte doit être connecté
Cypress.Commands.add("creerTache", (titre, categorie) => {
	cy.visit(`${BASE}/task/new`);
	cy.get('input[name="title"]').type(titre);
	cy.get('textarea[name="description"]').type(`description ${titre}`);
	cy.get('input[name="finish_on"]').type("2028-05-05T10:30");
	cy.get('select[name="repeat"]').select("quotidien");
	cy.contains('select[name="categories[]"] option', categorie).then(($option) => {
		cy.get('select[name="categories[]"]').select($option.val());
	});
	cy.get('input[name="submit"]').click();
	cy.get("main p").should("contain", `La tache : ${titre} a été ajouté en BDD`);
});
