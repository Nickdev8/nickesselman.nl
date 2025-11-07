<?php

declare(strict_types=1);

namespace App\Core;

use App\Controllers\PageController;

class Router
{
    /**
     * @var array<string,string>
     */
    private array $map = [];

    public function __construct(private readonly PageController $controller)
    {
        $this->map = [
            'home' => 'home',
            'about' => 'about',
            'projects' => 'projects',
            'contact' => 'contact',
            'cv' => 'cv',
            'now' => 'now',
        ];
    }

    /**
     * @param string|null $page
     * @param string|null $projectSlug
     * @return array{view:string,data:array,meta:array}
     */
    public function dispatch(?string $page, ?string $projectSlug): array
    {
        if ($projectSlug) {
            return $this->controller->project($projectSlug);
        }

        $candidate = $page ?? 'home';
        $method = $this->map[$candidate] ?? 'notFound';

        if (!method_exists($this->controller, $method)) {
            $method = 'notFound';
        }

        /** @var callable $callable */
        $callable = [$this->controller, $method];

        return $callable();
    }
}
