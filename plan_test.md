### INS-01 Inscription avec des données valides

- **Objectif :**Vérifier qu'un utilisateur peut créer un compte puis s'en servir
- **Préparation :** non conecté, sur la page `/register` ouverte
- **Données utilisées :** Prénom: `Alice`, Nom: `Angelique`, email: `aliceangelique@gmail.com`, mot de passe et confirmation `Test-Ins01-2026!`
- **Actions :**
    1. Remplir Prénom, Nom, email, mot de passe et confirmation
    2. Cliquer sur `inscription`
    3. Se connecter sur `/login` et remlpir email et mot de passe 
    4. cliquer sur connexion
- **Résultat :** message afficher <<Compte ajouter à la BDD>> et redirection vers `/`,
- **Statut :** Reussi

### INS-02 Inscription avec un champ obligatoire vide

- **Objectif :**Vérifier qu'un utilisateur peut créer un compte avec un chaamp obligatoire vide
- **Préparation :** non conecté, sur la page `/register` ouverte
- **Données utilisées :** Prénom: `Monica`, Nom: `Marie`, mot de passe et confirmation `Test-Ins02-2026!`
- **Actions :**
    1. Remplir Prénom, Nom, mot de passe et confirmation
    2. Cliquer sur `inscription`
- **Résultat :** message afficher <<Veuillez remplir tous les champs du formulaire>> 
- **Statut :** Echec

### INS-03 Inscription avec deux mot de passe différent

- **Objectif :**Vérifier qu'un utilisateur peut créer un compte avec deux mot de passe différent
- **Préparation :** non conecté, sur la page `/register` ouverte
- **Données utilisées :** Prénom: `Christopher`, Nom: `Angelique`, email: `christopherangelique@gmail.com`, mot de passe `Test-Ins03-2026!` et confirmation `Bonjour03!`
- **Actions :**
    1. Remplir Prénom, Nom, email, mot de passe et confirmation
    2. Cliquer sur `inscription`
- **Résultat :** message afficher <<Les 2 mots de passe ne sont pas identiques>> 
- **Statut :** Echec

### TACHE_01 Ajout d’une tâche valide avec une catégorie

- **Objectif :**Vérifier qu'un utilisateur peut ajouter une tâche avec une categorie valide
- **Préparation :** compte fictif créer et connecter,créer une categorie <<Interview>> et aller sur `/task/new`
- **Données utilisées :** Titre `Interview Tiakola`, Description `Regarder l'interview de Tiakola sur la chaine Youtube de Sally`, Date décheance `30/10/2026`, Repetition `Mensuel`, Categorie `Interview`
- **Actions :**
    1. Remplir Titre, Description, Date décheance, Repetition, Categorie
    2. Cliquer sur `Ajouter`
- **Résultat :** message afficher <<La tache : voir l'expo a été ajouté en BDD>>, aller sur `/task/activeall` et voir la tache ajouter
- **Statut :** Reussi

### TACHE_02 Ajout avec un champ obligatoire vide

- **Objectif :**Vérifier qu'un utilisateur peut ajouter une tâche avec des champs obligatoire vide
- **Préparation :** compte fictif créer et connecter,créer une categorie <<Interview>> et aller sur `/task/new`
- **Données utilisées :** Description `Préparer les questions de l'interview`, Date décheance `29/10/2026`, Repetition `Mensuel`, Categorie `Interview`
- **Actions :**
    1. Remplir Description, Date décheance, Repetition, Categorie
    2. Cliquer sur `Ajouter`
- **Résultat :** message afficher <<Veuillez renseigner se champ>>, 
- **Statut :** Echec

### TACHE_03 Accès à la page sans être connecté

- **Objectif :**Vérifier qu'un utilisateur peut accéder à la page `/task/new` sans être connecté
- **Préparation :** Sans être connecter aller sur `/task/new`
- **Actions :**
    1. Ajouter dans l'URL `/task/new`
    2. Se diriger vers cette page
- **Résultat :** Aucune redirection vers cette page ne sera possible 
- **Statut :** Echec

### LISTE_01 Les tâches actives du compte connecté sont affichées

- **Objectif :**Vérifier qu'un utilisateur peut accéder à ses tâches active en etant connecté
- **Préparation :** compte fictif créer et connecter et aller sur `/task/activeall`
- **Actions :**
    1. Aller sur `/task/activeall`
- **Résultat :** Voir les tâches actives créer sur le compte
- **Statut :** Reussi

### LISTE_02 Ses tâches terminées ne sont pas affichées

- **Objectif :**Vérifier qu'un utilisateur ne peut pas accéder à ses tâches terminés sur `/task/activeall`
- **Préparation :** compte fictif créer et connecter et aller sur `/task/activeall`
- **Actions :**
    1. Aller sur `/task/activeall`
    2. Verifier si les tâches terminées s'affichent
- **Résultat :** Ne pas voir les tâches terminées créer sur le compte
- **Statut :** Echec

### LISTE_03 Les tâches d’un autre compte ne sont pas affichées

- **Objectif :**Vérifier que des tâches d’un autre compte ne sont pas affichées
- **Préparation :** création de 2 compte fictif `compte1`et `compte2`. Sur `compte1` créer des tâches 
- **Actions :**
    1. Se connecter au `compte2`et se diriger vers `/task/activeall`
    2. Regarder la Liste des taches en cours
- **Résultat :** Aucune tâche en cours
- **Statut :** Echec