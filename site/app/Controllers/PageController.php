<?php

declare(strict_types=1);

namespace App\Controllers;

class PageController
{
    /**
     * @var array<int,array<string,mixed>>
     */
    private array $projects = [];

    /**
     * @var array<string,array<string,mixed>>
     */
    private array $projectsBySlug = [];

    /**
     * @var array<int,array<string,mixed>>
     */
    private array $timeline = [];

    /**
     * @var array<string,mixed>
     */
    private array $now = [];

    /**
     * @var array<string,mixed>
     */
    private array $contact = [];

    /**
     * @var array<int,array<string,mixed>>
     */
    private array $skills = [];

    public function __construct(array $container)
    {
        $this->projects = $container['projects'] ?? [];
        foreach ($this->projects as $project) {
            $slug = $project['slug'] ?? $project['link'] ?? null;
            if (!$slug) {
                continue;
            }

            $this->projectsBySlug[$slug] = $project;
        }

        $this->timeline = $container['timeline'] ?? [];
        $this->now = $container['now'] ?? [];
        $this->contact = $container['contact'] ?? ['channels' => []];
        $this->skills = $container['skills'] ?? [];
    }

    public function home(): array
    {
        return [
            'view' => 'pages/home',
            'data' => [
                'featured' => $this->featuredProjects(),
                'stats' => $this->heroStats(),
                'now' => $this->now,
                'timeline' => array_slice($this->timeline, 0, 3),
            ],
            'meta' => $this->meta('Home', 'Creative developer building playful experiences, hardware, and VR projects.'),
        ];
    }

    public function about(): array
    {
        return [
            'view' => 'pages/about',
            'data' => [
                'timeline' => $this->timeline,
                'skills' => $this->skills,
                'stats' => $this->heroStats(),
            ],
            'meta' => $this->meta('About', 'Story, skills, and timeline of Nick Esselman.'),
        ];
    }

    public function projects(): array
    {
        return [
            'view' => 'pages/projects',
            'data' => [
                'projects' => $this->projects,
                'categories' => $this->projectCategories(),
            ],
            'meta' => $this->meta('Projects', 'A curated list of projects, jams, and experiments.'),
        ];
    }

    public function project(string $slug): array
    {
        $project = $this->projectsBySlug[$slug] ?? null;

        if (!$project) {
            return $this->notFound();
        }

        return [
            'view' => 'pages/project',
            'data' => [
                'project' => $project,
                'related' => $this->relatedProjects($slug),
            ],
            'meta' => $this->meta($project['title'], $project['summary'] ?? $project['description'] ?? ''),
        ];
    }

    public function contact(): array
    {
        return [
            'view' => 'pages/contact',
            'data' => [
                'channels' => $this->contact['channels'] ?? [],
                'note' => $this->contact['note'] ?? '',
                'now' => $this->now,
            ],
            'meta' => $this->meta('Contact', 'Reach out via email, Discord, or LinkedIn.'),
        ];
    }

    public function cv(): array
    {
        return [
            'view' => 'pages/cv',
            'data' => [
                'timeline' => $this->timeline,
                'skills' => $this->skills,
                'highlightProjects' => array_slice($this->projects, 0, 6),
            ],
            'meta' => $this->meta('CV', 'Resume-style overview of education, experience, and skills.'),
        ];
    }

    public function now(): array
    {
        return [
            'view' => 'pages/now',
            'data' => [
                'now' => $this->now,
            ],
            'meta' => $this->meta('Now', 'What I’m focusing on right now.'),
        ];
    }

    public function notFound(): array
    {
        return [
            'view' => 'pages/404',
            'data' => [],
            'meta' => $this->meta('Not found', 'The page you are looking for does not exist.'),
        ];
    }

    private function heroStats(): array
    {
        return [
            [
                'label' => 'Years coding',
                'value' => years_since('2017-09-02') . '+',
                'hint' => 'Taught myself at 9, still going.',
            ],
            [
                'label' => 'Projects shipped',
                'value' => (string) count($this->projects),
                'hint' => 'Games, hardware, and experiments.',
            ],
            [
                'label' => 'Hack Club events',
                'value' => (string) $this->countProjectsTagged('hackclub'),
                'hint' => 'Juice, HighSeas, and more.',
            ],
        ];
    }

    private function featuredProjects(): array
    {
        return array_values(array_filter(
            $this->projects,
            fn ($project) => !empty($project['featured'])
        ));
    }

    private function projectCategories(): array
    {
        $groups = [];

        foreach ($this->projects as $project) {
            foreach ($project['categories'] ?? [] as $category) {
                $groups[$category] = true;
            }
        }

        ksort($groups);

        return array_keys($groups);
    }

    private function relatedProjects(string $slug): array
    {
        $current = $this->projectsBySlug[$slug] ?? null;

        if (!$current) {
            return [];
        }

        $categories = $current['categories'] ?? [];

        $related = array_filter($this->projects, function ($project) use ($slug, $categories) {
            if (($project['slug'] ?? null) === $slug) {
                return false;
            }

            return count(array_intersect($project['categories'] ?? [], $categories)) > 0;
        });

        return array_slice(array_values($related), 0, 3);
    }

    private function meta(string $title, string $description = ''): array
    {
        $fullTitle = $title ? "{$title} - Nick Esselman" : 'Nick Esselman';

        return [
            'title' => $fullTitle,
            'description' => $description ?: 'Creative developer shipping experiments, games, and hardware.',
        ];
    }

    private function countProjectsTagged(string $tag): int
    {
        return count(array_filter(
            $this->projects,
            fn ($project) => in_array($tag, $project['categories'] ?? [], true)
        ));
    }
}
