<?php

namespace App\Controller;

use App\Controller\AbstractController;
use App\Service\CategoryService;

class CategoryController extends AbstractController
{
    private CategoryService $categoryService;

    public function __construct()
    {
        $this->categoryService = new CategoryService();
    }
    public function showAllCategory(): mixed
    {
        //Récupérer toutes les categories
        $categories = $this->categoryService->getAllCategories();

        return $this->render("show_all_categories", "Categories", $categories);
    }

    public function createCategory(): mixed 
    {
        $data= [];
        //test si le formulaire est soumis
        if (isset($_POST["submit"])) {
            //ajout de la categorie
            $data["msg"] =  $this->categoryService->insertCategory($_POST);
        }

        return $this->render("add_category", "Ajouter Category", $data);
    }
}
