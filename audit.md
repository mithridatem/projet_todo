# Audit fonctionnel

## 1 Présenter le travail

- **Nom et prénom :** PAKOU OSSACRE Frida
- **Fork et branche :** https://github.com/Frida144/projet_todo.git, branche `evaluation-tests-audit`
- **Version testée :** commit `b98da04` de `main`, code métier non modifié
- **Pages testées :** /register, /task/new et /task/activeall

**Comment lancer l’application et les tests ?**

```bash
# 1. Créer le fichier .env à la racine (contenu indiqué dans le README)

# 2. Démarrer l'application 
docker compose up --build -d
# Application disponible sur http://localhost:8080

# 3. Installer Cypress (une seule fois)
npm install

# 4. Lancer toute la suite deux fois et conserver les sorties
npx cypress run > resultats/passage-1.txt 2>&1
npx cypress run > resultats/passage-2.txt 2>&1

# Lancer un seul fichier, ou l'interface graphique
npx cypress run --spec cypress/e2e/tache.cy.js
npx cypress open
```
# Lien des preuves `/resultats`