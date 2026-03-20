<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?? "" ?></title>
</head>
<body>
    <h1>Ajouter une categorie</h1>
    <form action="" method="post">
        <input type="text" name="name" placeholder="Saisir le nom">
        <input type="submit" name="submit" value="Ajouter">
    </form>
    <p><?= $data["msg"] ?? "" ?></p>
</body>
</html>