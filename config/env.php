<?php
declare(strict_types=1);

/**
 * Read a simple .env file (KEY=VALUE per line) into an associative array.
 * Lines starting with # are comments. Surrounding quotes around values are removed.
 *
 * @return array<string, string>
 */
function loadEnv(string $path): array
{
    if (!is_readable($path)) {
        throw new RuntimeException("Missing .env file at {$path}. Copy .env.example to .env and fill it in.");
    }

    $variables = [];

    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);

        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
            continue;
        }

        [$key, $value] = explode('=', $line, 2);
        $variables[trim($key)] = trim(trim($value), "\"'");
    }

    return $variables;
}
