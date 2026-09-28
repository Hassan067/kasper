<?php

declare(strict_types=1);

require_once __DIR__ . '/env.php';

/**
 * Return one shared PDO connection to the MySQL database.
 * The connection is created on the first call and reused after that.
 */
function getDatabaseConnection(): PDO
{
    static $pdo = null; // keeps its value between calls to this function

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $env = loadEnv(dirname(__DIR__) . '/.env');

    // Fail early with a clear message instead of silently connecting with empty values
    foreach (['DB_HOST', 'DB_NAME', 'DB_USER'] as $requiredKey) {
        if (($env[$requiredKey] ?? '') === '') {
            throw new RuntimeException("{$requiredKey} is missing or empty in the .env file.");
        }
    }

    $dsn = sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
        $env['DB_HOST'],
        $env['DB_PORT'] ?? '3306',
        $env['DB_NAME']
    );

    $pdo = new PDO($dsn, $env['DB_USER'], $env['DB_PASS'] ?? '', [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // errors become exceptions we can catch
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // rows come back as ['column' => value]
        PDO::ATTR_EMULATE_PREPARES   => false,                  // real prepared statements from MySQL
    ]);

    return $pdo;
}
