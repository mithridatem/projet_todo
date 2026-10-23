# Plan de tests

**Nom et prénom :** Dalle Carbonare Olivier  
**Date :** 23/10/2026

Complétez ce fichier avant de coder les tests, puis ajoutez les résultats après leur exécution.

## 1 Les neuf cas à tester

| ID | Page | Situation à vérifier |
| --- | --- | --- |
| INS-01 | /register | Inscription avec des données valides |
| INS-02 | /register | Inscription avec un champ obligatoire vide |
| INS-03 | /register | Inscription avec deux mots de passe différents |
| TACHE-01 | /task/new | Ajout d’une tâche valide avec une catégorie |
| TACHE-02 | /task/new | Ajout avec un champ obligatoire vide |
| TACHE-03 | /task/new | Accès à la page sans être connecté |
| LISTE-01 | /task/activeall | Les tâches actives du compte connecté sont affichées |
| LISTE-02 | /task/activeall | Ses tâches terminées ne sont pas affichées |
| LISTE-03 | /task/activeall | Les tâches d’un autre compte ne sont pas affichées |

## 2 Décrire chaque cas

Copiez la fiche ci-dessous neuf fois, une fois par cas. Reprenez son identifiant dans le titre du test Cypress correspondant.

### [INS-01] [Inscription avec des données valides]

- **Objectif :** Vérifier qu'un visiteur peut créer un compte utilisateur avec des donnéer valide
- **Préparation :** Le visiteur commence sur /register avec aucun champ remplie
- **Données utilisées :** Nom : Ol, Prénom: DC, email: user1@test.com, mot de passe : 123
- **Actions :**
  1. Ouvrire /register
  2. Remplire tout les champs
  3. Clicker sur le bouton d'inscription
- **Résultat attendu :** Le compte est créer, aucune érreur apparait et un méssage de confirmation apparait
- **Résultat obtenu :** Résultat expecter
- **Statut :** exécuté

Choisissez ensuite l’un des statuts suivants :
- **Réussi** : le résultat obtenu correspond au résultat attendu.

### [INS-02] [Inscription avec un champ obligatoire]

- **Objectif :** Vérifier que le formulaire refuse l’inscription lorsqu’un champ obligatoire n’est pas rempli.
- **Préparation :** Le visiteur commence sur /register avec aucun champ remplie
- **Données utilisées :** Nom et Prénom laisser vide, email: user2@test.com mot de passe: 123
- **Actions :**
  1. Ouvrir /register
  2. Remplir tous les champs sauf Nom et Prénom.
  3. Clicker sur s'inscrire
- **Résultat attendu :** Message d'erreur
- **Résultat obtenu :** Résultat expecter
- **Statut :** exécuté

Choisissez ensuite l’un des statuts suivants :
- **Réussi** : le résultat obtenu correspond au résultat attendu.

### [INS-03] [Inscription avec deux mots de passe différents]

- **Objectif :** Vérifier que le formulaire refuse l’inscription lorsque le mot de passe et sa confirmation ne correspondent pas.
- **Préparation :** Visiteur sur /register
- **Données utilisées :** Nom : fr, Prénom: dad, email:frdad@test.com, mot de passe:123, confirmation: 789.
- **Actions :**
  1. Ouvrir /register.
  2. Remplir tous les champs avec les données utiliser
  3. Clicker sur s'inscrire
- **Résultat attendu :** Message d'erreur "Les 2 mots de passe ne sont pas identiques"
- **Résultat obtenu :** Résultat expecter
- **Statut :** exécuté

Choisissez ensuite l’un des statuts suivants :

- **Réussi** : le résultat obtenu correspond au résultat attendu.

### [TACHE-01] [Ajout d’une tâche valide avec une catégorie]

- **Objectif :** Vérifier qu’un utilisateur connecté peut créer  une catégorie.
- **Préparation :** Utilisateur déja connecter, départ /task/new, 2 catégorie on été mis en place livre et meuble.
- **Données utilisées :** Titre: One_piece, description: lorem, catégorie : livre
- **Actions :**
  1. Ouvrir /task/new.
  2. remplire les donnée
  3. Valider le formulaire
- **Résultat attendu :** La tache est enregistrer et message de confirmartion apparait
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

Choisissez ensuite l’un des statuts suivants :

- **Non exécuté** : le test n’a pas été lancé.

### [TACHE-02] [Ajout avec un champ obligatoire vide]

- **Objectif :** Vérifier qu’une tâche ne peut pas être créée si un champ obligatoire est vide.
- **Préparation :** Compte de test connecté, départ sur /task/new.
- **Données utilisées :** Titre: dradra, description: lorem, catégorie: laisser vide
- **Actions :**
  1. Ouvrir /task/new.
  2. remplire les donnée sauf catégorie
  3. Valider le formulaire
- **Résultat attendu :** message d'erreur
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

Choisissez ensuite l’un des statuts suivants :

- **Non exécuté** : le test n’a pas été lancé.

### [TACHE-03] [Accès à la page sans être connecté]

- **Objectif :** Vérifier que la page est protéger et inacésible a aucun visiteur.
- **Préparation :** Aucune session ouverte, départ /
- **Données utilisées :** /task/new
- **Actions :**
  1. S’assurer qu’aucun utilisateur n’est connecté.
  2. Accéder directement à /task/new par l’URL.
- **Résultat attendu :** le formulaire ne s'affiche pas, le visiteur n'est pas rediriger.
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

Choisissez ensuite l’un des statuts suivants :


- **Non exécuté** : le test n’a pas été lancé.

### [LISTE-01] [Les tâches actives du compte connecté sont affichées]

- **Objectif :** Vérifier que la liste affiche bien les tâches actives de l’utilisateur connecté.
- **Préparation :** Compte connecté, 2 tache déja crée, départ /task/activeall
- **Données utilisées :** Aucun
- **Actions :**
  1. Ouvrir /task/activeall.
- **Résultat attendu :** Les deux tâches sont visibles dans la liste.
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

Choisissez ensuite l’un des statuts suivants :


- **Non exécuté** : le test n’a pas été lancé.

### [LISTE-02] [Ses tâches terminées ne sont pas affichées]

- **Objectif :** Vérifier que les tâches terminées ne sont pas afficher
- **Préparation :** Compte connecté, 2 tache déja crée, départ /task/activeall
- **Données utilisées :** Aucun
- **Actions :**
  1. Ouvrir /task/activeall.
  2. Clicker sur désactiver une tache
- **Résultat attendu :** la tache désactivéer n'est plus afficher dans /task/activeall
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

Choisissez ensuite l’un des statuts suivants :


- **Non exécuté** : le test n’a pas été lancé.

### [LISTE-03] [Les tâches d’un autre compte ne sont pas affichées]

- **Objectif :** Vérifier qu'un utilisateur ne vois jamais les tache d'un autre utilisateur.
- **Préparation :** Deux comptes existant (user1@test.com, user2@test.com), page de départ /login.
- **Données utilisées :** Connexion: (user1@test.com,123), (user2@test.com,123), Titre: Armoire, description : lorem, catégorie: meuble
- **Actions :**
  1. Se connecter avec user2@test.com
  2. Crére une tache sur /task/new avec les donnée utiliser.
  3. Se connecter avec user1@test.com
  4. Ouvrir /task/activeall
- **Résultat attendu :** La tache de user2 n'apparait pas dans user1.
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

Choisissez ensuite l’un des statuts suivants :

- **Non exécuté** : le test n’a pas été lancé.



## 3 Expliquer vos priorités

**Quels cas sont les plus importants à vérifier en premier et pourquoi ?**

Les cas les plus important sont les INS et TACHE-03 car il conserne la sécuriter a la connexion au site. 

## 4 Noter les résultats de la relance

Relancez les tests avec des données adaptées, puis complétez :

- **Les résultats sont-ils identiques à ceux du premier passage ?** [Oui ou non, puis explication]
- **Si un résultat change, quel cas est concerné et pourquoi ?** [À compléter ou aucun]
- **Preuves des deux passages :** [Liens vers les fichiers conservés dans resultats/]
