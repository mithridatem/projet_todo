const testPassword = "mot_de_passe";

function emailFor(testCase) {
  return `${testCase}-${Date.now()}@example.test`;
}

function attemptLogin(email) {
  cy.visit("/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(testPassword, { log: false });
  cy.get('input[name="submit"]').click();
  cy.contains("Les informations de connexion sont incorrectes").should("be.visible");
}

describe("Inscription", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("INS-01 — Inscription avec des données valides", () => {
    // Arrange : préparer un visiteur déconnecté et une adresse unique.
    const email = emailFor("ins01");
    cy.visit("/register");

    // Act : remplir et envoyer le formulaire d'inscription.
    cy.get('input[name="firstname"]').type("Test");
    cy.get('input[name="lastname"]').type("Utilisateur");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(testPassword, { log: false });
    cy.get('input[name="confirm-password"]').type(testPassword, { log: false });
    cy.get('input[name="submit"]').click();

    // Assert : vérifier le succès puis l'authentification avec le compte créé.
    cy.contains(`Le compte : ${email} a été ajouté en BDD`).should("be.visible");
    cy.visit("/login");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(testPassword, { log: false });
    cy.get('input[name="submit"]').click();
    cy.location("pathname").should("eq", "/");
    cy.contains("Déconnexion").should("be.visible");
  });

  it("INS-02 — Inscription avec un champ obligatoire vide", () => {
    // Arrange : préparer un visiteur déconnecté et une adresse qui n'existe pas.
    const email = emailFor("ins02");
    cy.visit("/register");

    // Act : laisser le prénom vide et envoyer les autres informations.
    cy.get('input[name="lastname"]').type("Utilisateur");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(testPassword, { log: false });
    cy.get('input[name="confirm-password"]').type(testPassword, { log: false });
    cy.get('input[name="submit"]').click();

    // Assert : le formulaire refuse l'inscription et le compte ne peut pas se connecter.
    cy.contains("Veuillez remplir tous les champs du formulaire").should("be.visible");
    attemptLogin(email);
  });

  it("INS-03 — Inscription avec deux mots de passe différents", () => {
    // Arrange : préparer un visiteur déconnecté et une adresse qui n'existe pas.
    const email = emailFor("ins03");
    cy.visit("/register");

    // Act : remplir le formulaire avec deux mots de passe différents.
    cy.get('input[name="firstname"]').type("Test");
    cy.get('input[name="lastname"]').type("Utilisateur");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(testPassword, { log: false });
    cy.get('input[name="confirm-password"]').type("autre_mot_de_passe", { log: false });
    cy.get('input[name="submit"]').click();

    // Assert : l'inscription est refusée et le compte ne peut pas se connecter.
    cy.contains("Les 2 mots de passe ne sont pas identiques").should("be.visible");
    attemptLogin(email);
  });
});
