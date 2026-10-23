describe('Inscription - /register', () => {
  const MSG_SUCCES = 'a été ajouté en BDD';
  const MSG_CHAMPS_VIDES = 'Veuillez remplir tous les champs du formulaire';
  const MSG_MDP_DIFFERENTS = 'Les 2 mots de passe ne sont pas identiques';
  const MSG_CONNEXION_KO = 'Les informations de connexion sont incorrectes';

    const remplirInscription = (champs) => {
    if (champs.prenom) cy.get('input[name="firstname"]').type(champs.prenom);
    if (champs.nom) cy.get('input[name="lastname"]').type(champs.nom);
    if (champs.email) cy.get('input[name="email"]').type(champs.email);
    if (champs.motDePasse) cy.get('input[name="password"]').type(champs.motDePasse, { log: false });
    if (champs.confirmation) cy.get('input[name="confirm-password"]').type(champs.confirmation, { log: false });
    cy.get('input[type="submit"][name="submit"]').click();
  };

  const verifierConnexionImpossible = (email, motDePasse) => {
    cy.request({
      method: 'POST',
      url: '/login',
      form: true,
      body: { email, password: motDePasse, submit: 'Connexion' },
    })
      .its('body')
      .should('contain', MSG_CONNEXION_KO);
  };

    it('INS-01 inscription avec des données valides', () => {
    cy.idUnique().then((id) => {
      const compte = {
        prenom: 'Alice',
        nom: 'Angelique',
        email: `aliceangelique-${id}@example.test`,
        motDePasse: 'Test-Ins01-2026!',
      };
      cy.visit('/register');

      remplirInscription({ ...compte, confirmation: compte.motDePasse });

      cy.contains('main p', MSG_SUCCES).should('contain', compte.email);

      cy.visit('/login');
      cy.get('input[name="email"]').type(compte.email);
      cy.get('input[name="password"]').type(compte.motDePasse, { log: false });
      cy.get('input[type="submit"][name="submit"]').click();
      cy.location('pathname').should('eq', '/');
      cy.contains('nav a', 'Déconnexion').should('be.visible');
    });
  });
it('INS-02 inscription avec un champ obligatoire vide (email)', () => {
    cy.visit('/register');

    remplirInscription({
      prenom: 'Monica',
      nom: 'Marie',
      motDePasse: 'Test-Ins02-2026!',
      confirmation: 'Test-Ins02-2026!',
    });

    cy.contains('main p', MSG_CHAMPS_VIDES).should('be.visible');
    cy.contains('main p', MSG_SUCCES).should('not.exist');
    cy.location('pathname').should('eq', '/register');
  });

  it('INS-03 inscription avec deux mots de passe différents', () => {
    cy.idUnique().then((id) => {
      const email = `christopherangelique-${id}@example.test`;
      const motDePasse = 'Test-Ins03-2026!';
      const confirmation = 'Bonjour03!';
      cy.visit('/register');

      remplirInscription({ prenom: 'Christopher', nom: 'Angelique', email, motDePasse, confirmation });

      cy.contains('main p', MSG_MDP_DIFFERENTS).should('be.visible');
      verifierConnexionImpossible(email, motDePasse);
      verifierConnexionImpossible(email, confirmation);
    });
  });

});
