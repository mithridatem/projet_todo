describe("Inscription", () => {
	const champs = [
		"firstname",
		"lastname",
		"email",
		"password",
		"confirm-password",
	];

	champs.forEach((champVide) => {
		it(`INS-02 Inscription avec le champ ${champVide} vide`, () => {
			// Arrange : valeurs valides, sur la page d'inscription
			const valeurs = {
				firstname: "Jean",
				lastname: "Dupont",
				email: `jean${Date.now()}@test.fr`,
				password: "Test1234!",
				"confirm-password": "Test1234!",
			};
			cy.visit("http://127.0.0.1:8000/register");

			// Act : remplir tous les champs sauf un, puis submit
			champs.forEach((champ) => {
				if (champ !== champVide) {
					cy.get(`input[name="${champ}"]`).type(valeurs[champ]);
				}
			});
			cy.get('input[name="submit"]').click();

			// Assert : message d'erreur, pas de compte créé
			cy.get("main p").should(
				"contain",
				"Veuillez remplir tous les champs du formulaire",
			);
		});
	});
});
