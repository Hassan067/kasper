<?php
declare(strict_types=1);

/**
 * Small helper functions shared by the pages and the form handlers.
 */

/** Start the session with safer cookie settings (call before any output). */
function startSession(): void
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start([
            'cookie_httponly' => true,  // JavaScript cannot read the session cookie
            'cookie_samesite' => 'Lax', // the cookie is not sent with requests from other sites
        ]);
    }
}

/** Escape a value before printing it inside HTML (protects against XSS). */
function e(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES, 'UTF-8');
}

/** Send the browser to another URL and stop the script. 303 = "see other page" (Post/Redirect/Get). */
function redirect(string $url): never
{
    header('Location: ' . $url, true, 303);
    exit;
}

/** Save data in the session for the NEXT request only. */
function flash(string $key, array $data): void
{
    $_SESSION['flash'][$key] = $data;
}

/** Read flash data once, then delete it so it does not appear again on refresh. */
function takeFlash(string $key): array
{
    $data = $_SESSION['flash'][$key] ?? [];
    unset($_SESSION['flash'][$key]);

    return $data;
}

/** Read one text field from $_POST safely (missing or non-string values become ''). */
function postString(string $name): string
{
    $value = $_POST[$name] ?? '';

    return is_string($value) ? trim($value) : '';
}

/** Stop with 405 unless the request is a POST (handlers only accept form submissions). */
function requirePostRequest(): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        header('Allow: POST');
        exit('Method Not Allowed');
    }
}
