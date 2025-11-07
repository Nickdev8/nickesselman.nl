<?php
declare(strict_types=1);

use App\Controllers\PageController;
use App\Core\Router;

$container = require __DIR__ . '/app/bootstrap.php';

$router = new Router(new PageController($container));

$page = $_GET['page'] ?? null;
$project = $_GET['project'] ?? null;

$response = $router->dispatch($page, $project);
$response['data']['currentPage'] = $project ? 'project' : ($page ?? 'home');

render($response['view'], $response['data'] ?? [], $response['meta'] ?? []);
