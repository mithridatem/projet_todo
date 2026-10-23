describe("Liste des taches actives", () => {
	it("LISTE-02 Les taches terminées ne sont pas affichées", () => {
		// Arrange : compte, 1 tache active, 1 tache terminée
		const email = `liste${Date.now()}@test.fr`;
		const password = "Test1234!";
		const active = `active ${Date.now()}`;
		const terminee = `terminee ${Date.now()}`;
		cy.creerCompte(email, password);
		cy.connecter(email, password);
		cy.creerCategorie("Cypress");
		cy.creerTache(active, "Cypress");
		cy.creerTache(terminee, "Cypress");
		cy.visit("http://127.0.0.1:8000/task/activeall");
		cy.contains("article", terminee).contains("button", "désactiver").click();

		// Act : ouvrir la liste des taches actives
		cy.visit("http://127.0.0.1:8000/task/activeall");

		// Assert : seule la tache active est affichée
		cy.contains("article h3", active).should("exist");
		cy.contains("article h3", terminee).should("not.exist");
	});
});
