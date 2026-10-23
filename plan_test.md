# Plan de tests

**Nom et prénom :** Djawed Dahmani  
**Date :** 23-10-2026

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

### INS-01 Inscription avec des données valides

- **Objectif :** vérifier qu’un visiteur peut créer un compte avec des données valides.
- **Préparation :** Compte non connecté, départ Accueil
- **Données utilisées :** Prénom: 'Solid', Nom: 'Snake', email: 'solid@fox.com', mdp: 'mot_de_passe'
- **Actions :**
  1. Ouvrir `/register`.
  2. Remplir tous les champs et envoyer le formulaire.
- **Résultat attendu :** le compte est créé et peut être utilisé pour se connecter.
- **Résultat obtenu :** Le compte a bien été créé.
- **Statut :** Réussi.

### INS-02 Inscription avec un champ obligatoire vide

- **Objectif :** vérifier qu’un compte ne peut pas être créé si un champ obligatoire est vide.
- **Préparation :** application disponible ; visiteur non connecté.
- **Données utilisées :** Prénom: '', Nom: 'Snake', email: 'solidus@fox.com', mdp: 'mot_de_passe'
- **Actions :**
  1. Ouvrir `/register`.
  2. Remplir les autres champs et envoyer le formulaire.
- **Résultat attendu :** l’inscription est refusée et aucun compte n’est créé.
- **Résultat obtenu :** Non exécuté.
- **Statut :** non exécuté

### INS-03 Inscription avec deux mots de passe différents

- **Objectif :** vérifier qu’une inscription est refusée si les deux mots de passe diffèrent.
- **Préparation :** application disponible ; visiteur non connecté.
- **Données utilisées :** données fictives valides avec deux mots de passe différents ; adresse email unique.
- **Actions :**
  1. Ouvrir `/register`.
  2. Remplir le formulaire avec deux mots de passe différents et l’envoyer.
- **Résultat attendu :** l’inscription est refusée et aucun compte n’est créé.
- **Résultat obtenu :** Non exécuté.
- **Statut :** non exécuté

### TACHE-01 Ajout d’une tâche valide avec une catégorie

- **Objectif :** vérifier qu’un utilisateur connecté peut ajouter une tâche associée à une catégorie.
- **Préparation :** compte `solid@fox.com` connecté ; catégorie `Fox Hound` créée.
- **Données utilisées :** titre et description fictifs ; catégorie `Fox Hound`.
- **Actions :**
  1. Ouvrir `/task/new`.
  2. Remplir le formulaire, choisir la catégorie et l’envoyer.
  3. Ouvrir la liste des tâches actives et recharger la page.
- **Résultat attendu :** la tâche et sa catégorie apparaissent dans la liste active et sont toujours présentes après rechargement.
- **Résultat obtenu :** Non exécuté.
- **Statut :** non exécuté

### TACHE-02 Ajout avec un champ obligatoire vide

- **Objectif :** vérifier qu’une tâche ne peut pas être ajoutée sans titre.
- **Préparation :** compte `solid@fox.com` connecté ; catégorie `Fox Hound` créée.
- **Données utilisées :** titre vide et description fictive.
- **Actions :**
  1. Ouvrir `/task/new`.
  2. Laisser le titre vide, remplir la description et envoyer le formulaire.
- **Résultat attendu :** la tâche n’est pas créée.
- **Résultat obtenu :** Non exécuté.
- **Statut :** non exécuté

### TACHE-03 Accès à la page sans être connecté

- **Objectif :** vérifier qu’un visiteur non connecté ne peut pas accéder au formulaire d’ajout de tâche.
- **Préparation :** visiteur non connecté.
- **Données utilisées :** aucune.
- **Actions :**
  1. Ouvrir directement `/task/new`.
- **Résultat attendu :** l’accès au formulaire est refusé ou le visiteur est redirigé.
- **Résultat obtenu :** Non exécuté.
- **Statut :** non exécuté

### LISTE-01 Affichage des tâches actives du compte connecté

- **Objectif :** vérifier que les tâches actives du compte connecté apparaissent dans sa liste.
- **Préparation :** compte `solid@fox.com` connecté ; identifier une tâche active qui lui appartient parmi les tâches déjà présentes dans la base.
- **Données utilisées :** titre exact d’une tâche active appartenant à `solid@fox.com`, à relever avant le test.
- **Actions :**
  1. Ouvrir `/task/activeall`.
  2. Vérifier la présence du titre de la tâche identifiée.
- **Résultat attendu :** la tâche active du compte connecté est affichée.
- **Résultat obtenu :** Non exécuté.
- **Statut :** non exécuté

### LISTE-02 Absence des tâches terminées dans la liste active

- **Objectif :** vérifier que les tâches terminées du compte connecté n’apparaissent pas dans sa liste active.
- **Préparation :** compte `solid@fox.com` connecté ; identifier une tâche terminée qui lui appartient parmi les tâches déjà présentes dans la base.
- **Données utilisées :** titre exact d’une tâche terminée appartenant à `solid@fox.com`, à relever avant le test.
- **Actions :**
  1. Ouvrir `/task/activeall`.
  2. Vérifier l’absence du titre de la tâche terminée.
- **Résultat attendu :** la tâche terminée n’est pas affichée dans la liste active.
- **Résultat obtenu :** Non exécuté.
- **Statut :** non exécuté

### LISTE-03 Absence des tâches d’un autre compte

- **Objectif :** vérifier que les tâches d’un autre compte ne sont pas visibles dans la liste du compte connecté.
- **Préparation :** compte `solid@fox.com` connecté ; identifier une tâche appartenant à `liquid@fox.com` parmi les tâches déjà présentes dans la base.
- **Données utilisées :** titre exact d’une tâche appartenant à `liquid@fox.com`, à relever avant le test.
- **Actions :**
  1. Ouvrir `/task/activeall` avec le compte `solid@fox.com`.
  2. Vérifier l’absence du titre de la tâche appartenant à `liquid@fox.com`.
- **Résultat attendu :** la tâche de `liquid@fox.com` n’est pas affichée dans la liste de `solid@fox.com`.
- **Résultat obtenu :** Non exécuté.
- **Statut :** non exécuté

Choisissez ensuite l’un des statuts suivants :

- **Réussi** : le résultat obtenu correspond au résultat attendu.
- **Échoué** : le résultat obtenu ne correspond pas au résultat attendu.
- **Bloqué** : un problème empêche d’effectuer la vérification.
- **Non exécuté** : le test n’a pas été lancé.

## 3 Expliquer vos priorités

Les cas INS-01, TACHE-03 et LISTE-03 sont prioritaires. L’inscription permet la création d’un compte, TACHE-03 vérifie qu’un visiteur ne peut pas accéder à une action réservée aux utilisateurs connectés, et LISTE-03 vérifie que les tâches d’un compte restent privées. Une défaillance sur l'un de ces trois cas présenterait une faille de sécurité majeure.

## 4 Noter les résultats de la relance

- **Les résultats sont-ils identiques à ceux du premier passage ?** À compléter après exécution.
- **Si un résultat change, quel cas est concerné et pourquoi ?** À compléter après exécution, ou indiquer « aucun ».
- **Preuves des deux passages :** à compléter avec les fichiers conservés dans `resultats/`.
