<?php

namespace App\Service;

use App\Entity\Category;
use App\Repository\CategoryRepository;

class CategoryService
{
    private CategoryRepository $categoryRepository;

    public function __construct()
    {
        $this->categoryRepository = new CategoryRepository();
    }

    public function getAllCategories(): array 
    {
        return $this->categoryRepository->findAllCategory();
    }

    public function insertCategory(array $category): string 
    {
        if (empty($category["name"])) {
            return "Veuillez remplir les champs";
        }
        if ($this->categoryRepository->isCategoryExistsByName($category["name"])) {
            return "La categorie existe déja";
        }
        //créer un objet
        $cat = new Category($category["name"]);
        //ajouter en BDD
        $this->categoryRepository->addCategory($cat);
        
        return "La category " . $cat->getName() . " a été ajouté en BDD";
    }
}