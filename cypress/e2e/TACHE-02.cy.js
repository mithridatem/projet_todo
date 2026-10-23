describe("Création de tache", () => {
	const champs = ["title", "description"];

	beforeEach(() => {
		// Arrange : compte connecté et catégorie existante
		const email = `tache${Date.now()}@test.fr`;
		const password = "Test1234!";
		cy.creerCompte(email, password);
		cy.connecter(email, password);
		cy.creerCategorie("Cypress");
	});

	champs.forEach((champVide) => {
		it(`TACHE-02 Ajout avec le champ ${champVide} vide`, () => {
			// Arrange : valeurs valides, un marqueur unique pour retrouver la tache
			const marqueur = `vide ${Date.now()}`;
			const valeurs = { title: marqueur, description: marqueur };
			cy.visit("http://127.0.0.1:8000/task/new");

			// Act : remplir les champs sauf un, puis envoyer
			champs.forEach((champ) => {
				if (champ !== champVide) {
					const balise = champ === "title" ? "input" : "textarea";
					cy.get(`${balise}[name="${champ}"]`).type(valeurs[champ]);
				}
			});
			cy.contains('select[name="categories[]"] option', "Cypress").then(($option) => {
				cy.get('select[name="categories[]"]').select($option.val());
			});
			cy.get('input[name="submit"]').click();

			// Assert : le navigateur bloque l'envoi, on reste sur la page
			const balise = champVide === "title" ? "input" : "textarea";
			cy.get(`${balise}[name="${champVide}"]:invalid`).should("exist");
			cy.location("pathname").should("eq", "/task/new");

			// Assert : aucune tache créée
			cy.visit("http://127.0.0.1:8000/task/activeall");
			cy.contains("article", marqueur).should("not.exist");
		});
	});
});
