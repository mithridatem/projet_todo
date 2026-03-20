<?php

include '../vendor/autoload.php';
//Charger les variables d'environnement
$dotenv = Dotenv\Dotenv::createImmutable("../");
$dotenv->load();

//Récupération de l'URL
$url = parse_url($_SERVER['REQUEST_URI']);
//test soit l'url a une route sinon on renvoi à la racine
$path = isset($url['path']) ? $url['path'] : '/';

//Importer les controllers
use App\Controller\HomeController;
use App\Controller\CategoryController;

//instancier les controllers
$homeController = new HomeController();
$categoryController = new CategoryController();
//Routeur (test)
switch ($path) {
    case '/':
        $homeController->index();
        break;
    case '/category/new':
        $categoryController->createCategory();
        break;
    case '/category/all':
        $categoryController->showAllCategory();
        break;
    default:
        echo "404 la page n'existe pas";
        break;
}
