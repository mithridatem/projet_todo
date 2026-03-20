<?php

namespace App\Entity;

use App\Entity\Category;
use App\Entity\Account;

class Task
{
    private int $id;
    private string $title;
    private string $description;
    private \DateTime $createdAt;
    private \DateTime $updatedAt;
    private ?\DateTime $finishOn;
    private ?string $repeat;
    private bool $status;
    private Account $author;
    private array $categories;

    public function __construct(
        string $title,
        string $description,
        \DateTime $createdAt,
        Account $author
    )
    {
        $this->title = $title;
        $this->description = $description;
        $this->createdAt = $createdAt;
        $this->updatedAt = $createdAt;
        $this->status = true;
        $this->author = $author;
        $this->categories = [];
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): void 
    {
        $this->id = $id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): void 
    {
        $this->title = $title;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description) : void 
    {
        $this->description = $description;
    }

    public function getCreatedAt(): \DateTime 
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTime $createdAt): void 
    {
        $this->createdAt = $createdAt;
    }

    public function getUpdatedAt(): \DateTime 
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTime $updatedAt): void 
    {
        $this->updatedAt = $updatedAt;
    }

    public function getFinishOn(): ?\DateTime 
    {
        return $this->finishOn;
    }

    public function setFinishOn(?\DateTime $finishOn): void 
    {
        $this->finishOn = $finishOn;
    }

    public function getRepeat(): ?string 
    {
        return $this->repeat;
    }

    public function setRepeat(?string $repeat): void 
    {
        $this->repeat = $repeat;
    }
    
    public function getStatus(): bool 
    {
        return $this->status;
    }

    public function setStatus(bool $status) : void 
    {
        $this->status = $status;
    }

    public function getAuthor(): Account
    {
        return $this->author;
    }

    public function setAuthor(Account $author): void 
    {
        $this->author = $author;
    }

    public function getCategories(): array 
    {
        return $this->categories;
    }

    public function addCategory(Category $category): void 
    {
        $this->categories[] = $category;
    }

    public function removeCategory(Category $category): void 
    {
        unset($this->categories[array_search($category, $this->categories)]);
        sort($this->categories);
    }

    public function __toString(): string
    {
        return $this->title . 
        ", " . $this->description . ", "
        . $this->finishOn->format('d-m-Y');
    }
}