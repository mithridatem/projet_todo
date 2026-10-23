export const select = {
  // Inscription / connexion
  prenom: 'input[name="firstname"]',
  nom: 'input[name="lastname"]',
  email: 'input[name="email"]',
  password: 'input[name="password"]',
  confirmPassword: 'input[name="confirm-password"]',
  submit: 'input[name="submit"]',
  msg: 'main p',
  deconnexion: 'a[href="/logout"]',
  // Catégories
  nomCategorie: 'input[name="name"]',
  // Tâches
  titre: 'input[name="title"]',
  description: 'textarea[name="description"]',
  categories: 'select[name="categories[]"]',
  // Listes
  tache: 'article',
  titreTache: 'article h3',
  pastille: '.pill-button',
};