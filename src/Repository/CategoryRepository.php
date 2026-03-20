<?php

namespace App\Repository;

use App\Database\Mysql;
use App\Entity\Category;

class CategoryRepository
{
    //connexion à la BDD
    private \PDO $connect;

    public function __construct()
    {
        $this->connect = Mysql::connectBdd();
    }

    //Méthodes
    public function addCategory(Category $category): Category 
    {
        try {
            //1 Ecrire la requête
            $sql = "INSERT INTO category(category_name) VALUE(?)";
            //2 Préparer la requête
            $req = $this->connect->prepare($sql);
            //3 Assigner le paramètre
            $req->bindValue(1, $category->getName(), \PDO::PARAM_STR);
            //4 Exécution de la requête
            $req->execute();
            //5 récupérer l'ID
            $id = $this->connect->lastInsertId();
            //setter l'id
            $category->setId($id);
        } catch(\PDOException $e) {}
        return $category;
    }

    public function isCategoryExistsByName(string $name): bool
    {
        try {
            //1 Ecrire la requête
            $sql = "SELECT c.id FROM category AS c WHERE c.category_name = ?";
            //2 préparer la requête
            $req = $this->connect->prepare($sql);
            //3 Assigner le paramètre
            $req->bindParam(1, $name, \PDO::PARAM_STR);
            //4 Exécuter la requête
            $req->execute();
            //5 récupérer la réponse
            $category = $req->fetch(\PDO::FETCH_ASSOC);
            //test si existe -> true sinon false
            if(!empty($category)) return true;
        } catch(\PDOException $e) {}
        return false;
    }

    public function findAllCategory(): array
    {
        try {
            //1 Ecrire la requête
            $sql = "SELECT c.id, c.category_name AS `name` FROM category AS c";
            //2 Préparer la requête
            $req = $this->connect->prepare($sql);
            //3 Exécuter la requête
            $req->execute();
            //4 Récupérer la réponse
            $req->setFetchMode(\PDO::FETCH_CLASS, Category::class);
            $categories = $req->fetchAll();
        } catch(\PDOException $e) {}
        return $categories;
    }
}
