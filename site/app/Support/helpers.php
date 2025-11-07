<?php

declare(strict_types=1);

if (!function_exists('render')) {
    function render(string $view, array $data = [], array $meta = []): void
    {
        $file = rtrim(VIEW_PATH, '/') . '/' . ltrim($view, '/') . '.php';

        if (!file_exists($file)) {
            http_response_code(500);
            echo "View [{$view}] not found.";
            return;
        }

        extract($data, EXTR_SKIP);

        ob_start();
        include $file;
        $content = ob_get_clean();

        $meta = array_merge([
            'title' => 'Nick Esselman - Creative developer',
            'description' => 'Portfolio, experiments, and projects from Nick Esselman.',
            'image' => '/images/logo.png',
        ], $meta);

        include rtrim(VIEW_PATH, '/') . '/layout.php';
    }
}

if (!function_exists('partial')) {
    function partial(string $name, array $data = []): void
    {
        $file = rtrim(VIEW_PATH, '/') . '/partials/' . ltrim($name, '/') . '.php';

        if (!file_exists($file)) {
            return;
        }

        extract($data, EXTR_SKIP);
        include $file;
    }
}

if (!function_exists('asset')) {
    function asset(string $path): string
    {
        $normalized = '/' . ltrim($path, '/');
        return sprintf('%s?v=%s', $normalized, APP_VERSION);
    }
}

if (!function_exists('page_url')) {
    function page_url(string $slug, array $params = []): string
    {
        $query = http_build_query(array_merge(['page' => $slug], $params));
        return '?' . $query;
    }
}

if (!function_exists('project_url')) {
    function project_url(string $slug): string
    {
        return '?' . http_build_query(['project' => $slug]);
    }
}

if (!function_exists('years_since')) {
    function years_since(string $date): float
    {
        $start = new DateTimeImmutable($date);
        $now = new DateTimeImmutable();
        $diff = $now->diff($start);
        $years = (int) $diff->format('%y');
        $months = (int) $diff->format('%m');
        $days = (int) $diff->format('%d');

        return round($years + ($months / 12) + ($days / 365), 1);
    }
}

if (!function_exists('format_number')) {
    function format_number(float|int $value): string
    {
        if ($value >= 1000) {
            return round($value / 1000, 1) . 'k';
        }

        return (string) $value;
    }
}
