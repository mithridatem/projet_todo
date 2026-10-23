const testPassword = "mot_de_passe";
const mainAccount = "solid@fox.com";
const categoryName = "Fox Hound";

function uniqueTaskTitle(testCase) {
  return `${testCase}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function loginAs(email) {
  cy.visit("/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(testPassword, { log: false });
  cy.get('input[name="submit"]').click();
  cy.location("pathname").should("eq", "/");
  cy.contains("Déconnexion").should("be.visible");
}

describe("Tâches", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("TACHE-01 — Ajout d’une tâche valide avec une catégorie", () => {
    // Arrange : connecter le compte principal et préparer une tâche unique.
    const title = uniqueTaskTitle("tache01");
    loginAs(mainAccount);
    cy.visit("/task/new");
    cy.get('select[name="categories[]"]').select(categoryName);

    // Act : remplir les champs requis et soumettre le formulaire.
    cy.get('input[name="title"]').type(title);
    cy.get('textarea[name="description"]').type("Description fictive du test Cypress.");
    cy.get('input[name="submit"]').click();

    // Assert : vérifier la tâche et sa catégorie après rechargement de la liste.
    cy.visit("/task/activeall");
    cy.contains("article", title).should("be.visible").and("contain", categoryName);
    cy.reload();
    cy.contains("article", title).should("be.visible").and("contain", categoryName);
  });

  it("TACHE-02 — Ajout avec un champ obligatoire vide", () => {
    // Arrange : connecter le compte principal et préparer une tâche qui ne doit pas exister.
    const title = uniqueTaskTitle("tache02");
    loginAs(mainAccount);
    cy.visit("/task/new");
    cy.get('textarea[name="description"]').type("Description fictive du test Cypress.");
    cy.get('select[name="categories[]"]').select(categoryName);

    // Act : tenter d'envoyer le formulaire sans saisir le titre.
    cy.get('input[name="submit"]').click();

    // Assert : la validation HTML bloque l'envoi et la tâche n'est pas créée.
    cy.get('input[name="title"]').then(($title) => {
      expect($title[0].validity.valueMissing).to.equal(true);
    });
    cy.location("pathname").should("eq", "/task/new");
    cy.visit("/task/activeall");
    cy.contains("article", title).should("not.exist");
  });

  it("TACHE-03 — Accès à la page sans être connecté", () => {
    // Arrange : supprimer les cookies pour garantir une session non connectée.
    cy.clearCookies();
    cy.clearLocalStorage();

    // Act : demander directement le formulaire de création d'une tâche.
    cy.visit("/task/new");

    // Assert : l'utilisateur est redirigé et le formulaire protégé n'est pas affiché.
    cy.location("pathname").should("eq", "/");
    cy.contains("h2", "Ajouter une tache").should("not.exist");
  });
});
