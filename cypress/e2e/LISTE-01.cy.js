describe("Liste des taches actives", () => {
	it("LISTE-01 Les taches actives du compte connecté sont affichées", () => {
		// Arrange : compte, catégorie, 2 taches actives
		const email = `liste${Date.now()}@test.fr`;
		const password = "Test1234!";
		const titres = [`active1 ${Date.now()}`, `active2 ${Date.now()}`];
		cy.creerCompte(email, password);
		cy.connecter(email, password);
		cy.creerCategorie("Cypress");
		titres.forEach((titre) => cy.creerTache(titre, "Cypress"));

		// Act : ouvrir la liste, puis recharger
		cy.visit("http://127.0.0.1:8000/task/activeall");
		cy.reload();

		// Assert : chaque tache est complète
		titres.forEach((titre) => {
			cy.contains("article h3", titre)
				.parents("article")
				.within(() => {
					cy.get("h3").should("contain", titre);
					cy.get("p").invoke("text").should("not.be.empty");
					cy.get("h4").should("exist");
					cy.get("div.categories").should("contain", "Cypress");
					cy.contains("button", "désactiver").should("exist");
				});
		});
	});
});
