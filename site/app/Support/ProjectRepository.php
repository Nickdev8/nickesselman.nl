<?php

declare(strict_types=1);

namespace App\Support;

require_once __DIR__ . '/Parsedown.php';
require_once __DIR__ . '/Spyc.php';

class ProjectRepository
{
    private string $directory;

    private \Parsedown $markdown;

    public function __construct(string $directory)
    {
        $this->directory = rtrim($directory, '/');
        $this->markdown = new \Parsedown();
        if (method_exists($this->markdown, 'setSafeMode')) {
            $this->markdown->setSafeMode(false);
        }
    }

    /**
     * @return array<int,array<string,mixed>>
     */
    public function all(): array
    {
        $pattern = $this->directory . '/*.md';
        $files = glob($pattern) ?: [];
        $projects = [];

        foreach ($files as $file) {
            $project = $this->parseFile($file);
            if ($project) {
                $projects[] = $project;
            }
        }

        usort($projects, function (array $a, array $b): int {
            $aYear = (int) ($a['year'] ?? 0);
            $bYear = (int) ($b['year'] ?? 0);

            return $bYear <=> $aYear;
        });

        return $projects;
    }

    private function parseFile(string $file): ?array
    {
        $raw = file_get_contents($file);
        if ($raw === false) {
            return null;
        }

        [$frontMatter, $body] = $this->splitFrontMatter($raw);
        $data = $frontMatter ? \Spyc::YAMLLoadString($frontMatter) : [];
        if (!is_array($data)) {
            $data = [];
        }

        if (isset($data['enabled']) && $data['enabled'] === false) {
            return null;
        }

        if (empty($data['slug'])) {
            $data['slug'] = basename($file, '.md');
        }

        $sections = $this->parseSections($body);
        if ($sections) {
            $data['sections'] = $sections;
        }

        return $data;
    }

    /**
     * @return array{0:string,1:string}
     */
    private function splitFrontMatter(string $raw): array
    {
        if (preg_match('/^---\s*(.*?)\s*---\s*(.*)$/s', $raw, $matches)) {
            return [$matches[1], $matches[2]];
        }

        return ['', $raw];
    }

    /**
     * @return array<int,array<string,mixed>>
     */
    private function parseSections(string $body): array
    {
        $body = trim($body);
        if ($body === '') {
            return [];
        }

        $lines = preg_split("/(\r\n|\r|\n)/", $body) ?: [];
        $sections = [];
        $currentHeading = null;
        $currentContent = [];

        foreach ($lines as $line) {
            if (preg_match('/^##\s+(.*)$/', $line, $matches)) {
                if ($currentHeading !== null) {
                    $sections[] = $this->buildSection($currentHeading, implode("\n", $currentContent));
                }
                $currentHeading = trim($matches[1]);
                $currentContent = [];
                continue;
            }

            $currentContent[] = $line;
        }

        if ($currentHeading === null) {
            $currentHeading = 'Overview';
        }

        $sections[] = $this->buildSection($currentHeading, implode("\n", $currentContent));

        return array_values(array_filter($sections, static function (array $section): bool {
            return !empty(trim((string) ($section['body'] ?? ''))) || !empty($section['media'] ?? []);
        }));
    }

    private function buildSection(string $heading, string $markdown): array
    {
        $text = trim($markdown);
        $media = [];
        $text = preg_replace_callback('/!\\[(.*?)\\]\\((.*?)\\)/', function (array $matches) use (&$media, $heading): string {
            $alt = trim($matches[1] !== '' ? $matches[1] : $heading);
            $src = trim($matches[2]);
            if ($src !== '') {
                $media[] = ['src' => $src, 'alt' => $alt];
            }
            return '';
        }, $text) ?? $text;

        $body = $text !== '' ? $this->markdown->text($text) : '';

        $section = [
            'heading' => $heading,
            'body' => $body,
        ];

        if (!empty($media)) {
            $section['media'] = $media;
        }

        return $section;
    }
}
