describe("Inscription ", () => {
	it("INS-03 Inscription avec password differents", () => {
		// Arrange : email unique password different, page d'inscription
		const email = `jean${Date.now()}@test.fr`;
		const password1 = "Test1234!";
		const password2 = "Test12345!";
		cy.visit("http://127.0.0.1:8000/register");

		// Act : remplir les 5 champs, 2 password differents et envoyer le formulaire
		cy.get('input[name="firstname"]').type("Jean");
		cy.get('input[name="lastname"]').type("Dupont");
		cy.get('input[name="email"]').type(email);
		cy.get('input[name="password"]').type(password1);
		cy.get('input[name="confirm-password"]').type(password2);
		cy.get('input[name="submit"]').click();

		// Assert : message d'erreur ,pas de compte créer'
		cy.get("main p").should(
			"contain",
			`Les 2 mots de passe ne sont pas identiques`,
		);
	});
});
