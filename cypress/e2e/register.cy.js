describe('Fonctionnalité : Inscription', () => {
  
  // INS-01 : Inscription avec des données valides
  it('INS-01 : doit inscrire un utilisateur avec des données valides', () => {
    // Arrange
    const uniqueEmail = `test${Date.now()}@mail.com`;
    cy.visit('http://localhost:8080/register');
    
    // Act
    cy.get('input[name="firstname"]').type('Utilisateur Test');
    cy.get('input[name="lastname"]').type('Utilisateur Test');
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="confirm-password"]').type('Password123!');
    cy.get('input[type="submit"]').click();

    // Assert
    // Doit afficher un message de succès
    cy.contains(uniqueEmail).should('be.visible');
  });
  
  // INS-02 : Inscription avec un champ obligatoire vide
  it('INS-02 : doit afficher une erreur si un champ est vide', () => {
    // Arrange
    cy.visit('http://localhost:8080/register');
    
    // Act
    cy.get('input[name="firstname"]').type('Utilisateur Test');
    cy.get('input[name="lastname"]').type('Utilisateur Test');
    //Emaill vide ici!
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="confirm-password"]').type('Password123!');
    cy.get('input[type="submit"]').click();
    
    // Assert
    // Doit afficher un message de d'erreur
    cy.contains('Veuillez remplir tous les champs du formulaire').should('be.visible'); 
  });
  
  // INS-03 : Inscription avec deux mots de passe différents
  it('INS-03 : doit afficher une erreur si les mots de passe different', () => {
    // Arrange
    const uniqueEmail = `test${Date.now()}@mail.com`;
    cy.visit('http://localhost:8080/register');
    
    // Act
    cy.get('input[name="firstname"]').type('Utilisateur Test');
    cy.get('input[name="lastname"]').type('Utilisateur Test');
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="confirm-password"]').type('DifferentPassword!');
    cy.get('input[type="submit"]').click();

    // Assert
    // Doit afficher un message de d'erreur
    cy.contains('Les 2 mots de passe ne sont pas identiques', { timeout: 10000 }).should('exist').and('be.visible');
  });

});