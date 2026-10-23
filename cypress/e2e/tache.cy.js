describe('Ajout de tâche - /task/new', () => {
  const MSG_SUCCES = 'a été ajouté en BDD';

  const choisirCategorie = (nom) => {
    cy.contains('select[name="categories[]"] option', nom).then(($option) => {
      cy.get('select[name="categories[]"]').select($option.val());
    });
  };

  it('TACHE-01 ajout d\'une tâche valide avec une catégorie', () => {
    cy.compteConnecte('tache01');
    cy.idUnique().then((id) => {
      const categorie = `Interview-${id}`;
      const titre = 'Interview Tiakola';
      const description = 'Regarder l\'interview de Tiakola sur la chaine Youtube de Sally';
      cy.creerCategorie(categorie);
      cy.visit('/task/new');

      cy.get('input[name="title"]').type(titre);
      cy.get('textarea[name="description"]').type(description);
      cy.get('input[name="finish_on"]').type('2026-10-30T18:00');
      cy.get('select[name="repeat"]').select('mensuel');
      choisirCategorie(categorie);
      cy.get('input[type="submit"][name="submit"]').click();

      cy.contains('main p', MSG_SUCCES).should('contain', titre);

      cy.visit('/task/activeall');
      cy.contains('main article h3', titre)
        .parents('article')
        .within(() => {
          cy.contains('p', description).should('be.visible');
          cy.contains('h4', '30/10/2026').should('be.visible');
          cy.contains('.pill-button', categorie).should('be.visible');
        });

      cy.reload();
      cy.contains('main article h3', titre).should('be.visible');
    });
  });

  it('TACHE-02 ajout avec un champ obligatoire vide (titre)', () => {
    cy.compteConnecte('tache02');
    cy.idUnique().then((id) => {
      const categorie = `Interview-${id}`;
      const description = 'Préparer les questions de l\'interview';
      cy.creerCategorie(categorie);
      cy.visit('/task/new');

      cy.get('textarea[name="description"]').type(description);
      cy.get('input[name="finish_on"]').type('2026-10-29T18:00');
      cy.get('select[name="repeat"]').select('mensuel');
      choisirCategorie(categorie);
      cy.get('input[type="submit"][name="submit"]').click();

      cy.get('input[name="title"]').then(($titre) => {
        expect($titre[0].validity.valueMissing, 'titre signalé manquant').to.be.true;
      });
      cy.contains('main p', MSG_SUCCES).should('not.exist');
      cy.visit('/task/activeall');
      cy.contains('main article p', description).should('not.exist');
    });
  });

  it('TACHE-03 accès à la page sans être connecté', () => {
    cy.getCookie('PHPSESSID').should('be.null');

    cy.visit('/task/new');

    cy.location('pathname').should('eq', '/');
    cy.get('input[name="title"]').should('not.exist');
    cy.contains('nav a', 'Connexion').should('be.visible');
  });
});
