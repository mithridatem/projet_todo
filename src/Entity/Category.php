<?php

namespace App\Entity;

class Category
{
    //Attributs
    private int $id;
    private string $name;

    //Constructeur
    public function __construct(string $name) {
        $this->name = $name;
    }

    //Getters et Setters
    public function getId():int {
        return $this->id;
    }

    public function setId(int $id): void {
        $this->id = $id;
    }

    public function getName(): string {
        return $this->name;
    }

    public function setName(string $name): void {
        $this->name = $name;
    }

    public function __toString()
    {
        return $this->id . " : " . $this->name;
    }
}


