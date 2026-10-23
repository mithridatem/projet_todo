describe('Fonctionnalité : Création de tâche', () => {

  // Avant chaque test, on se connecte (Prérequis)
  beforeEach(() => {
    // Arrange : Connexion via l'interface
    cy.visit('http://localhost:8080/login');
    cy.get('input[name="email"]').type('test@test.fr');
    cy.get('input[name="password"]').type('123456789');
    cy.get('input[type="submit"]').click();
    // On attend d'être sur la page de bienvenue
    cy.url().should('include', 'http://localhost:8080/');
  });

  // TACHE-01 : Ajout d'une tâche valide
  it('TACHE-01 : doit ajouter une tâche valide avec catégorie', () => {
    // Arrange
    cy.visit('http://localhost:8080/task/new');
    const taskName = `Tâche Cypress ${Date.now()}`;
    const descriptionName = `Description Cypress ${Date.now()}`;
    const dateTimeValue = '2027-10-01T14:30';
    
    // Act
    cy.get('input[name="title"]').type(taskName);
    cy.get('textarea[name="description"]').type(descriptionName);
    cy.get('input[name="finish_on"]').type(dateTimeValue);
    cy.get('select[name="categories[]"]').select('Livres');
    cy.get('select[name="repeat"]').select('Hebdomadaire');
    cy.get('input[type="submit"]').click();

    // Assert
    // 1. Doit afficher un message de succès
    cy.contains(taskName).should('be.visible');
    // 2. Recharger la page et voir si la tâche est là
    cy.visit('http://localhost:8080/task/activeall');
    cy.reload(); 
    cy.contains(taskName).should('be.visible');
  });

  // TACHE-02 : Ajout avec un champ obligatoire vide
  it('TACHE-02 : doit bloquer la création si champ vide', () => {
    // Arrange
    cy.visit('http://localhost:8080/task/new');
    const descriptionName = `Description Cypress ${Date.now()}`;
    const dateTimeValue = '2027-10-01T14:30';
    
    // Act
    // On ne remplit pas le titre
    cy.get('textarea[name="description"]').type(descriptionName);
    cy.get('input[name="finish_on"]').type(dateTimeValue);
    cy.get('select[name="categories[]"]').select('Livres');
    cy.get('select[name="repeat"]').select('Hebdomadaire');
    cy.get('input[type="submit"]').click();

    // Assert
    // cy.contains('Champs ').should('be.visible');
    cy.url().should('include', 'http://localhost:8080/task/new');
  });

  // TACHE-03 : Accès à la page sans être connecté
  it('TACHE-03 : doit rediriger vers login si non connecté', () => {
    // Arrange : On vide la session
    cy.clearCookies();
    cy.clearLocalStorage();
    
    // Act
    cy.visit('http://localhost:8080/task/new');

    // Assert
    cy.url().should('include', 'http://localhost:8080/login', { timeout: 10000 });
  });

});