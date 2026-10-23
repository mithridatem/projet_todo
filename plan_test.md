# Plan de test

**Nom et prénom :** Benoit
**Date :** 2026-10-23

## Les neuf cas à tester

| ID | Page | Situation à vérifier |
| --- | --- | --- |
| INS-01 | /register | Inscription avec des données valides |
| INS-02 | /register | Inscription avec un champ obligatoire vide |
| INS-03 | /register | Inscription avec deux mots de passe différents |
| TACHE-01 | /task/new | Ajout d'une tâche valide avec une catégorie |
| TACHE-02 | /task/new | Ajout avec un champ obligatoire vide |
| TACHE-03 | /task/new | Accès à la page sans être connecté |
| LISTE-01 | /task/activeall | Les tâches actives du compte connecté sont affichées |
| LISTE-02 | /task/activeall | Ses tâches terminées ne sont pas affichées |
| LISTE-03 | /task/activeall | Les tâches d'un autre compte ne sont pas affichées |

## Parcours nominal d'inscription
- Id : INS-01
- Page : /register
- Objectif : vérifier qu'un compte est créé avec des données valides.
- Initialisation : Non connecté. Email jamais utilisé.
- Données : prénom `Jean`, nom `Dupont`, email unique généré (ex : `jean<timestamp>@test.fr`), mot de passe `Test1234!` identique dans les deux champs.
- Actions :
	- Remplir les 5 champs : prénom, nom, email, mot de passe, confirmation.
	- Soumettre le formulaire.
- Résultat attendu : "Le compte : <email saisi> a été ajouté en BDD"
- Résultat obtenu : à compléter
- Statut : non exécuté

## Scenario d'erreur : champ vide
- Id : INS-02
- Page : /register
- Objectif : vérifier qu'un champ vide bloque l'inscription.
- Initialisation : Non connecté.
- Données : mêmes valeurs que INS-01, un seul champ vide à la fois (prénom, nom, email, mot de passe, confirmation).
- Actions :
	- Remplir 4 des 5 champs, en laisser un vide.
	- Soumettre le formulaire.
	- Répéter pour chaque champ.
- Résultat attendu : "Veuillez remplir tous les champs du formulaire", aucun compte créé.
- Résultat obtenu : à compléter
- Statut : non exécuté

## Scenario d'erreur : password différents
- Id : INS-03
- Page : /register
- Objectif : vérifier qu'un mot de passe et sa confirmation différents bloquent l'inscription.
- Initialisation : Non connecté.
- Données : mêmes valeurs que INS-01, mot de passe `Test1234!`, confirmation `Autre1234!`.
- Actions :
	- Remplir les 5 champs.
	- Soumettre le formulaire.
- Résultat attendu : "Les 2 mots de passe ne sont pas identiques", aucun compte créé.
- Résultat obtenu : à compléter
- Statut : non exécuté

## Parcours nominal d'ajout de tache
- Id : TACHE-01
- Page : /task/new
- Objectif : vérifier qu'une tâche valide est ajoutée avec une catégorie.
- Initialisation : Connecté, au moins une catégorie existante.
- Données : titre `test`, description `description test`, date d'échéance future, répétition (hebdomadaire, quotidien, mensuel), une catégorie existante.
- Actions :
	- Remplir titre, description, date d'échéance.
	- Choisir une répétition dans le select.
	- Choisir une catégorie.
	- Soumettre le formulaire.
	- Répéter pour les 3 répétitions.
- Résultat attendu : "La tache : test a été ajouté en BDD"
- Résultat obtenu : à compléter
- Statut : non exécuté

## Scenario d'erreur : champ vide
- Id : TACHE-02
- Page : /task/new
- Objectif : vérifier qu'un champ obligatoire vide bloque l'ajout.
- Initialisation : Connecté, au moins une catégorie existante.
- Données : mêmes valeurs que TACHE-01, un seul champ vide à la fois. Seuls titre et description sont `required`.
- Actions :
	- Remplir les champs, laisser vide le titre.
	- Soumettre le formulaire.
	- Répéter en laissant vide la description.
- Résultat attendu : le navigateur bloque l'envoi avec "Veuillez renseigner ce champ" (message natif), aucune tâche créée.
- Résultat obtenu : à compléter
- Statut : non exécuté

## Scenario d'erreur : accès ajout de tache en étant déconnecté
- Id : TACHE-03
- Page : /task/new
- Objectif : vérifier que la page est inaccessible sans connexion.
- Initialisation : Déconnecté.
- Données : aucune.
- Actions :
	- Accéder à /task/new.
- Résultat attendu : redirection vers la page d'accueil `/`, formulaire non affiché.
- Résultat obtenu : à compléter
- Statut : non exécuté

## Parcours nominal d'affichage des tâches actives
- Id : LISTE-01
- Page : /task/activeall
- Objectif : vérifier que les tâches actives du compte connecté sont affichées correctement.
- Initialisation : Connecté, 2 catégories et 2 tâches actives minimum.
- Données : tâches créées avec titre, description non vide, date d'échéance et catégorie.
- Actions :
	- Accéder à /task/activeall.
	- Vérifier chaque tâche :
		- un `<article>`
		- un titre dans un `<h3>`
		- une description non vide dans un `<p>`
		- une date dans un `<h4>`
		- une catégorie dans une `div.categories`
		- un bouton désactiver
- Résultat attendu : les 2 tâches sont affichées avec tous ces éléments.
- Résultat obtenu : à compléter
- Statut : non exécuté

## Tâches terminées non affichées
- Id : LISTE-02
- Page : /task/activeall
- Objectif : vérifier qu'une tâche terminée n'apparaît pas dans les actives.
- Initialisation : Connecté, 2 catégories, 2 tâches actives et 1 tâche terminée minimum.
- Données : la tâche terminée a un titre identifiable (ex : `tache terminee`).
- Actions :
	- Accéder à /task/activeall.
- Résultat attendu : seules les tâches actives sont affichées, `tache terminee` est absente.
- Résultat obtenu : à compléter
- Statut : non exécuté

## Tâches d'un autre compte non affichées
- Id : LISTE-03
- Page : /task/activeall
- Objectif : vérifier qu'on ne voit pas les tâches d'un autre compte.
- Initialisation : Compte A et compte B existants, 2 catégories et 2 tâches actives minimum par compte. Connecté sur A.
- Données : titres distincts par compte (ex : `tache A1`, `tache B1`).
- Actions :
	- Accéder à /task/activeall depuis le compte A.
- Résultat attendu : seules les tâches de A sont affichées, aucune tâche de B.
- Résultat obtenu : à compléter
- Statut : non exécuté

## Priorités

**Quels cas sont les plus importants à vérifier en premier et pourquoi ?**

- INS-01 : pas d'inscription, pas de site, rien d'autre ne fonctionne.
- TACHE-01 : scénario nominal de la fonction principale, s'il casse rien de ce qui en découle ne marche.
- TACHE-03 : une page protégée accessible sans connexion est une faille d'accès.
- LISTE-01 et LISTE-03 : afficher la liste est essentiel, et n'afficher que les tâches du compte connecté protège les données personnelles.
- INS-02, INS-03, TACHE-02 et LISTE-02 : cas d'erreur, importants mais après les parcours nominaux et les cas de sécurité.
