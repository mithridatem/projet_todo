/**
 * Génère un identifiant unique pour que chaque test crée ses propres données
 * et puisse être relancé sans conflit (emails et catégories sont uniques en BDD).
 */
Cypress.Commands.add('idUnique', () => {
  return cy.wrap(`${Date.now()}-${Cypress._.random(1000, 9999)}`, { log: false });
});

/**
 * Crée un compte fictif via le formulaire /register et vérifie qu'il est enregistré.
 */
Cypress.Commands.add('creerCompte', (compte) => {
  cy.request({
    method: 'POST',
    url: '/register',
    form: true,
    body: {
      firstname: compte.prenom,
      lastname: compte.nom,
      email: compte.email,
      password: compte.motDePasse,
      'confirm-password': compte.motDePasse,
      submit: 'Inscription',
    },
  })
    .its('body')
    .should('contain', 'a été ajouté en BDD');
});

/**
 * Connecte un compte : le cookie de session est conservé par Cypress
 * et réutilisé par cy.visit et cy.request.
 */
Cypress.Commands.add('connexion', (compte) => {
  cy.request({
    method: 'POST',
    url: '/login',
    form: true,
    body: { email: compte.email, password: compte.motDePasse, submit: 'Connexion' },
  });
  // Vérifie la préparation : le menu connecté est affiché.
  cy.request('/').its('body').should('contain', 'Déconnexion');
});

/**
 * Déconnecte le compte courant.
 */
Cypress.Commands.add('deconnexion', () => {
  cy.request('/logout');
  cy.clearCookies();
});

/**
 * Crée un compte fictif unique puis le connecte. Retourne le compte.
 */
Cypress.Commands.add('compteConnecte', (prefixe) => {
  return cy.idUnique().then((id) => {
    const compte = {
      prenom: 'Test',
      nom: prefixe,
      email: `${prefixe}-${id}@example.test`.toLowerCase(),
      motDePasse: 'Test-Cypress-2026!',
    };
    cy.creerCompte(compte);
    cy.connexion(compte);
    return cy.wrap(compte, { log: false });
  });
});

/**
 * Crée une catégorie (compte connecté requis) et retourne son id,
 * lu dans la liste déroulante de /task/new.
 */
Cypress.Commands.add('creerCategorie', (nom) => {
  cy.request({
    method: 'POST',
    url: '/category/new',
    form: true,
    body: { name: nom, submit: 'Ajouter' },
  });
  return cy.request('/task/new').then((reponse) => {
    const page = new DOMParser().parseFromString(reponse.body, 'text/html');
    const option = [...page.querySelectorAll('select[name="categories[]"] option')]
      .find((el) => el.textContent.trim() === nom);
    expect(option, `catégorie ${nom} disponible`).not.to.be.undefined;
    return option.value;
  });
});

/**
 * Crée une tâche active pour le compte connecté.
 */
Cypress.Commands.add('creerTache', (tache) => {
  cy.request({
    method: 'POST',
    url: '/task/new',
    form: true,
    body: {
      title: tache.titre,
      description: tache.description,
      'categories[]': tache.categorieId,
      submit: 'Ajouter',
    },
  })
    .its('body')
    .should('contain', 'a été ajouté en BDD');
});

/**
 * Passe une tâche du compte connecté au statut terminé,
 * comme le bouton « désactiver » de la liste.
 */
Cypress.Commands.add('terminerTache', (titre) => {
  cy.request('/task/activeall').then((reponse) => {
    const page = new DOMParser().parseFromString(reponse.body, 'text/html');
    const article = [...page.querySelectorAll('main article')]
      .find((el) => el.querySelector('h3').textContent === titre);
    expect(article, `tâche ${titre} dans la liste`).not.to.be.undefined;
    cy.request(article.querySelector('a').getAttribute('href'));
  });
});
