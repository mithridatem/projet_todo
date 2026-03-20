<?php

use Category;

use Account;

class Article
{
    //Attributs
    private int $id;
    private string $title;
    private string $description;
    private DateTime $createdAt;
    private DateTime $updatedAt;
    private bool $status;
    private array $categories;
    private Account $author;

    //Constructeur
    public function __construct(
        string $title,
        string $description,
        DateTime $createdAt,
        bool $status,
        Account $author
    ) {
        $this->title = $title;
        $this->description = $description;
        $this->createdAt = $createdAt;
        $this->status = $status;
        $this->author = $author;
        $this->categories = [];
    }

    //Getters et Setters
    public function getId(): int {
        return $this->id;
    }

    public function setId(int $id): void {
        $this->id = $id;
    }

    public function getTitle(): string {
        return $this->title;
    }

    public function setTitle(string $title): void {
        $this->title = $title;
    }

    public function getDescription(): string {
        return $this->description;
    }

    public function setDescription(string $description): void {
        $this->description = $description;
    }

    public function getCreatedAt(): DateTime {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTime $createdAt): void {
        $this->createdAt = $createdAt;
    }
    public function getUpdatedAt(): DateTime {
        return $this->updatedAt;
    }

    public function setUpdatedAt(DateTime $updatedAt): void {
        $this->updatedAt = $updatedAt;
    }

    public function getStatus(): bool {
        return $this->status;
    }

    public function setStatus(bool $status): void {
        $this->status = $status;
    }

    public function getCategory(): array {
        return $this->categories;
    }

    public function addCategory(Category $category): void {
        $this->categories[] = $category;
    }

    public function removeCategory(Category $category): void {
        unset($this->categories[array_search($category, $this->categories)]);
        sort($this->categories);
    }

    public function getAuthor(): Account {
        return $this->author;
    }

    public function setAuthor(Account $author): void {
        $this->author = $author;
    }
}
