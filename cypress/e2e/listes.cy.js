const testPassword = "mot_de_passe";
const mainAccount = "solid@fox.com";
const secondaryAccount = "liquid@fox.com";
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

function createTask(title) {
  cy.visit("/task/new");
  cy.get('input[name="title"]').type(title);
  cy.get('textarea[name="description"]').type("Tâche fictive préparée par Cypress.");
  cy.get('select[name="categories[]"]').select(categoryName);
  cy.get('input[name="submit"]').click();
  cy.contains(`La tache : ${title} a été ajouté en BDD`).should("be.visible");
}

describe("Listes de tâches", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("LISTE-01 — Les tâches actives du compte connecté sont affichées", () => {
    // Arrange : connecter le compte principal et lui créer une tâche active témoin.
    const title = uniqueTaskTitle("liste01");
    loginAs(mainAccount);
    createTask(title);

    // Act : consulter la liste des tâches actives du compte.
    cy.visit("/task/activeall");

    // Assert : la tâche témoin est visible et reste présente après rechargement.
    cy.contains("article", title).should("be.visible");
    cy.reload();
    cy.contains("article", title).should("be.visible");
  });

  it("LISTE-02 — Ses tâches terminées ne sont pas affichées", () => {
    // Arrange : connecter le compte principal et créer une tâche active témoin.
    const title = uniqueTaskTitle("liste02");
    loginAs(mainAccount);
    createTask(title);

    // Act : terminer la tâche depuis sa liste active.
    cy.visit("/task/activeall");
    cy.contains("article", title).within(() => {
      cy.contains("button", "désactiver").click();
    });

    // Assert : la tâche n'est plus active et figure dans la liste des terminées.
    cy.location("pathname").should("eq", "/task/activeall");
    cy.contains("article", title).should("not.exist");
    cy.visit("/task/inactiveall");
    cy.contains("article", title).should("be.visible");
  });

  it("LISTE-03 — Les tâches d’un autre compte ne sont pas affichées", () => {
    // Arrange : créer une tâche unique avec le compte secondaire et vérifier qu'il la voit.
    const title = uniqueTaskTitle("liste03");
    loginAs(secondaryAccount);
    createTask(title);
    cy.visit("/task/activeall");
    cy.contains("article", title).should("be.visible");

    // Act : se déconnecter, puis ouvrir la liste active avec le compte principal.
    cy.visit("/logout");
    loginAs(mainAccount);
    cy.visit("/task/activeall");

    // Assert : la tâche de l'autre compte n'est pas révélée.
    cy.contains("article", title).should("not.exist");
  });
});
