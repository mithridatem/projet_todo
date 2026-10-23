<!-- Titre de la PR : Évaluation Cypress et audit — NOM Prénom -->
<!-- Complétez les champs entre crochets et cochez uniquement les points vérifiés. -->

## Identification

- **Nom et prénom :** Frida PAKOU OSSACRE
- **Lien du fork :** (https://github.com/Frida144/projet_todo.git)
- **Branche de travail :** evaluation-tests-audit

## Travail rendu

Cette PR contient le plan de tests, les tests end-to-end Cypress en AAA et l’audit des fonctionnalités suivantes :

- Inscription : `/register`.
- Ajout d’une tâche : `/task/new`.
- Liste des tâches en cours : `/task/activeall`.

**Liens vers les livrables sur ma branche**

- Plan de tests : https://github.com/Frida144/projet_todo/blob/evaluation-tests-audit/plan_test.md
- Tests Cypress : https://github.com/Frida144/projet_todo/tree/evaluation-tests-audit/cypress/e2e
- Audit : https://github.com/Frida144/projet_todo/blob/evaluation-tests-audit/audit.md
- Preuves d’exécution : https://github.com/Frida144/projet_todo/tree/evaluation-tests-audit/resultats

Les commandes de lancement et la préparation des données sont indiquées dans `audit.md`.

## Bilan des tests

Comptez les neuf cas du sujet, sans inclure l’exemple catégorie. Chaque ligne doit totaliser neuf cas.

| Passage | Réussis | Échoués | Bloqués | Non exécutés |
| --- | --- | --- | --- | --- |
| Premier lancement | [Nombre] | [Nombre] | [Nombre] | [Nombre] |
| Relance | [Nombre] | [Nombre] | [Nombre] | [Nombre] |

**Principaux constats**

[Résumez en quelques lignes ce qui fonctionne, les problèmes rencontrés et les éventuelles différences entre les deux passages. Les détails sont dans audit.md.]

## Vérification avant rendu

- [ ] La PR compare `evaluation-tests-audit` à `main` dans **mon propre fork**.
- [ ] Les neuf cas du sujet figurent dans `plan_test.md`, avec leurs résultats réels.
- [ ] Les tests Cypress et leur configuration sont présents ; les cas non automatisés sont signalés dans l’audit.
- [ ] Les tests utilisent les étapes Arrange, Act et Assert.
- [ ] J’ai préparé les comptes, les catégories et les tâches nécessaires.
- [ ] J’ai lancé la suite puis effectué une relance, et conservé les preuves disponibles.
- [ ] L’audit décrit les problèmes, les limites et une conclusion justifiée.
- [ ] Les liens ci-dessus permettent d’accéder aux livrables.
- [ ] Aucun dossier `node_modules/`, `vendor/` ou secret personnel n’est ajouté.
- [ ] Je laisse la PR ouverte pour la correction et je transmets les liens par email selon les consignes du formateur.
