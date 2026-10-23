describe("Création de tache", () => {
	it("TACHE-03 Accès à /task/new sans être connecté", () => {
		// Arrange : aucune session
		cy.clearCookies();

		// Act : accéder directement à la page d'ajout
		cy.visit("http://127.0.0.1:8000/task/new");

		// Assert : redirection vers l'accueil, pas de formulaire d'ajout
		cy.location("pathname").should("eq", "/");
		cy.get('textarea[name="description"]').should("not.exist");
		cy.contains("a", "Déconnexion").should("not.exist");
	});
});
