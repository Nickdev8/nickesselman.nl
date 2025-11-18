<?php

declare(strict_types=1);

use App\Support\ProjectRepository;

if (!defined('ROOT_PATH')) {
    define('ROOT_PATH', realpath(__DIR__ . '/..'));
}

if (!defined('APP_VERSION')) {
    define('APP_VERSION', '2.0.0');
}

if (!defined('VIEW_PATH')) {
    define('VIEW_PATH', ROOT_PATH . '/resources/views');
}

spl_autoload_register(function (string $class): void {
    $prefix = 'App\\';
    $baseDir = __DIR__ . '/';

    if (strncmp($prefix, $class, strlen($prefix)) !== 0) {
        return;
    }

    $relative = substr($class, strlen($prefix));
    $file = $baseDir . str_replace('\\', '/', $relative) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

require_once __DIR__ . '/Support/helpers.php';

return [
    'projects' => (new ProjectRepository(ROOT_PATH . '/content/projects'))->all(),
    'timeline' => require __DIR__ . '/Data/timeline.php',
    'now' => require __DIR__ . '/Data/now.php',
    'contact' => require __DIR__ . '/Data/contact.php',
    'skills' => require __DIR__ . '/Data/skills.php',
];
