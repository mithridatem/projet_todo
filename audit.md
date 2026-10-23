# Audit fonctionnel

## 1 Présenter le travail

- **Nom et prénom :** Benoit Vicaire
- **Date :** 23/10/2026
- **Fork et branche :** evaluation-tests-audit-bv
- **Version testée :** [Identifiant du commit testé]
- **Pages testées :** /register, /task/new et /task/activeall

**Comment lancer l’application et les tests ?**

Adresse locale : http://127.0.0.1:8000
1. composer install
2. pnpm install
3. créer la BDD avec le db.sql et le fichier .env 
4. démarer l'application :`php -S 127.0.0.1:8000 -t public`
5. lancer les tests:
	- pnpm cypress open
	- pnpm cypress run > resultats/passage1.txt


**Quelles données faut-il préparer pour lancer et rejouer vos tests ?**

Les comptes, catégories et tâches sont généré par les script de test eux même, les emails sont uniques grace a Date.now().
Seul TACHE-01 utilise un compte prefait : BVtest1@gmail.com

## 2 Présenter le bilan

Comptez les cas de votre plan, pas les assertions. Chaque ligne doit totaliser neuf cas.

| Passage | Réussis | Échoués | Bloqués | Non exécutés | Preuve |
| --- | --- | --- | --- | --- | --- |
| Premier lancement | [9] | [0] | [0] | [0] | [Lien dans resultats/] |
| Relance | [9] | [0] | [0] | [0] | [Lien dans resultats/] |

**Les résultats changent-ils entre les deux passages ?**

Les résultats sont identiques lors des 2 passages, cela rend les tests reproductibles.

## 3 Décrire les problèmes rencontrés

J'ai eu les yeux un peu plus gros que le ventre sur les test, notement sur le fait de passer les test en boucle pour remplir tous les champs sauf 1, j'ai fais plusieur version qui ne marchais pas avant de m'aider de claude pour trouver la bonne syntaxe.

J'ai extrappoler cette solution pour le champs occurence (hebdo, mensuel, quotidien)


## 4 Donner votre conclusion

- **Qu’est-ce qui fonctionne d’après vos tests ?** 
Le scenario nominal fonctionne : on peux s'inscrire, créer une tache, une catégorie, les afficher.
- **Quels problèmes faut-il traiter en premier et pourquoi ?** 
On peux créer une tache sans selectionner une catégorie, hors dans le display on fait un foreach categorie, ce qui peux entrainer un bug.
- **Qu’est-ce qui n’a pas été vérifié ?** la création de catégories, format du password.
- **Votre avis sur les trois fonctionnalités :** [Quelques lignes justifiées par vos résultats]
