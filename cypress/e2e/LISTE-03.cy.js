describe("Liste des taches actives", () => {
	it("LISTE-03 Les taches d'un autre compte ne sont pas affichées", () => {
		// Arrange : comptes A et B, chacun avec ses taches
		const password = "Test1234!";
		const emailA = `listeA${Date.now()}@test.fr`;
		const emailB = `listeB${Date.now()}@test.fr`;
		const tachesA = [`tacheA1 ${Date.now()}`, `tacheA2 ${Date.now()}`];
		const tachesB = [`tacheB1 ${Date.now()}`, `tacheB2 ${Date.now()}`];
		cy.creerCompte(emailA, password);
		cy.creerCompte(emailB, password);
		cy.creerCategorie("Cypress");

		cy.connecter(emailB, password);
		tachesB.forEach((titre) => cy.creerTache(titre, "Cypress"));

		cy.connecter(emailA, password);
		tachesA.forEach((titre) => cy.creerTache(titre, "Cypress"));

		// Act : ouvrir la liste depuis le compte A
		cy.visit("http://127.0.0.1:8000/task/activeall");

		// Assert : taches de A présentes, taches de B absentes
		tachesA.forEach((titre) => cy.contains("article h3", titre).should("exist"));
		tachesB.forEach((titre) => cy.contains("article h3", titre).should("not.exist"));
	});
});
