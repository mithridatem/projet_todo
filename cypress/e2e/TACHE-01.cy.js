describe("Création de tache", () => {
	const email = "BVTest1@gmail.com";
	const password = "Test";
	const occurences = ["hebdo", "quotidien", "mensuel"];

	beforeEach(() => {
		// Arrange : connexion avec un compte existant
		cy.visit("http://127.0.0.1:8000/login");
		cy.get('input[name="email"]').type(email);
		cy.get('input[name="password"]').type(password);
		cy.get('input[name="submit"]').click();
		cy.contains("a", "Déconnexion").should("exist");
	});

	occurences.forEach((occurence) => {
		it(`TACHE-01 Création d'une tache valide avec une catégorie (${occurence})`, () => {
			// Arrange : données de la tache, page d'ajout
			const titre = `test ${occurence} ${Date.now()}`;
			const description = "description test";
			const end_date = "2028-05-05T10:30";
			cy.visit("http://127.0.0.1:8000/task/new");

			// Act : remplir les champs et envoyer le formulaire
			cy.get('input[name="title"]').type(titre);
			cy.get('textarea[name="description"]').type(description);
			cy.get('input[name="finish_on"]').type(end_date);
			cy.get('select[name="repeat"]').select(occurence);
			cy.get('select[name="categories[]"]').select("1");
			cy.get('input[name="submit"]').click();

			// Assert : message de succès
			cy.get("main p").should(
				"contain",
				`La tache : ${titre} a été ajouté en BDD`,
			);

			// Assert : la tache est dans la liste, même après rechargement
			cy.visit("http://127.0.0.1:8000/task/activeall");
			cy.reload();
			cy.contains("article h3", titre)
				.parents("article")
				.should("contain", description);
		});
	});

	it("TACHE-01 Création d'une tache valide sans catégorie", () => {
		// Arrange : données de la tache sans catégorie, page d'ajout
		const titre = `test sans categorie ${Date.now()}`;
		const description = "description test";
		cy.visit("http://127.0.0.1:8000/task/new");

		// Act : remplir les champs sans choisir de catégorie et envoyer le formulaire
		cy.get('input[name="title"]').type(titre);
		cy.get('textarea[name="description"]').type(description);
		cy.get('input[name="submit"]').click();

		// Assert : message de succès
		cy.get("main p").should(
			"contain",
			`La tache : ${titre} a été ajouté en BDD`,
		);

		// Assert : la tache est dans la liste après rechargement, sans catégorie
		cy.visit("http://127.0.0.1:8000/task/activeall");
		cy.reload();
		cy.contains("article h3", titre)
			.parents("article")
			.within(() => {
				cy.get("p").should("contain", description);
				cy.get("div.categories button").should("not.exist");
			});
	});
});
