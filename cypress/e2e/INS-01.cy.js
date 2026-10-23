describe("Inscription", () => {
	it("INS-01 Inscription avec des données valides", () => {
		// Arrange : email unique, page d'inscription
		const email = `jean${Date.now()}@test.fr`;
		const password = "Test1234!";
		cy.visit("http://127.0.0.1:8000/register");

		// Act : remplir les 5 champs et envoyer le formulaire
		cy.get('input[name="firstname"]').type("Jean");
		cy.get('input[name="lastname"]').type("Dupont");
		cy.get('input[name="email"]').type(email);
		cy.get('input[name="password"]').type(password);
		cy.get('input[name="confirm-password"]').type(password);
		cy.get('input[name="submit"]').click();

		// Assert : message de succès
		cy.get("main p").should(
			"contain",
			`Le compte : ${email} a été ajouté en BDD`,
		);

		// Assert : le compte existe, la connexion fonctionne
		cy.visit("http://127.0.0.1:8000/login");
		cy.get('input[name="email"]').type(email);
		cy.get('input[name="password"]').type(password);
		cy.get('input[name="submit"]').click();
		cy.location("pathname").should("eq", "/");
		cy.contains("a", "Déconnexion").should("exist");
	});
});
