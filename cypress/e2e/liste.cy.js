describe('Liste des tâches en cours - /task/activeall', () => {
  it('LISTE-01 les tâches actives du compte connecté sont affichées', () => {
    cy.compteConnecte('liste01');
    cy.idUnique().then((id) => {
      const categorie = `Interview-${id}`;
      const taches = [
        { titre: 'Interview Tiakola', description: 'Regarder l\'interview sur Youtube' },
        { titre: 'Questions interview', description: 'Préparer les questions de l\'interview' },
      ];
      cy.creerCategorie(categorie).then((categorieId) => {
        taches.forEach((tache) => cy.creerTache({ ...tache, categorieId }));
      });

      cy.visit('/task/activeall');

      cy.contains('main h2', 'Liste des taches en cours').should('be.visible');
      taches.forEach((tache) => {
        cy.contains('main article h3', tache.titre)
          .parents('article')
          .within(() => {
            cy.contains('p', tache.description).should('be.visible');
            cy.contains('.pill-button', categorie).should('be.visible');
          });
      });
      cy.get('main article').should('have.length', 2);
    });
  });

  it('LISTE-02 les tâches terminées du compte ne sont pas affichées', () => {
    cy.compteConnecte('liste02');
    cy.idUnique().then((id) => {
      const active = 'Interview Tiakola';
      const terminee = 'Questions interview';
      cy.creerCategorie(`Interview-${id}`).then((categorieId) => {
        cy.creerTache({ titre: active, description: 'Tâche active', categorieId });
        cy.creerTache({ titre: terminee, description: 'Tâche terminée', categorieId });
      });
      cy.terminerTache(terminee);

      cy.visit('/task/activeall');

      cy.contains('main article h3', active).should('be.visible');
      cy.contains('main article h3', terminee).should('not.exist');
      cy.get('main article').should('have.length', 1);

      cy.visit('/task/inactiveall');
      cy.contains('main article h3', terminee).should('be.visible');
    });
  });

  it('LISTE-03 les tâches d\'un autre compte ne sont pas affichées', () => {
    cy.idUnique().then((id) => {
      const tachesCompte1 = ['Interview Tiakola', 'Questions interview'];

      cy.compteConnecte('compte1').then((compte1) => {
        cy.creerCategorie(`Interview-${id}`).then((categorieId) => {
          tachesCompte1.forEach((titre) => {
            cy.creerTache({ titre, description: 'Tâche du compte1', categorieId });
          });
        });
        cy.deconnexion();
        cy.compteConnecte('compte2');

        cy.visit('/task/activeall');

        cy.contains('main h2', 'Liste des taches en cours').should('be.visible');
        cy.get('main article').should('have.length', 0);

        cy.deconnexion();
        cy.connexion(compte1);
        cy.visit('/task/activeall');
        tachesCompte1.forEach((titre) => {
          cy.contains('main article h3', titre).should('be.visible');
        });
      });
    });
  });
});
