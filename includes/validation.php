<?php
declare(strict_types=1);

/**
 * Server-side validation. The rules are the SAME as the HTML attributes and the JavaScript,
 * because the browser checks can be skipped by anyone. Each function returns
 * ['field' => 'message'] for every problem, or [] when everything is valid.
 */

function validateEmailField(string $email, array &$errors): void
{
    if ($email === '') {
        $errors['email'] = 'Your email is required.';
    } elseif (mb_strlen($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        $errors['email'] = 'Please enter a valid email address (example: name@mail.com).';
    }
}

/** @param array{name: string, email: string, message: string} $input */
function validateContactForm(array $input): array
{
    $errors = [];

    $nameLength = mb_strlen($input['name']);
    if ($nameLength === 0) {
        $errors['name'] = 'Your name is required.';
    } elseif ($nameLength < 2) {
        $errors['name'] = 'Your name must be at least 2 characters.';
    } elseif ($nameLength > 100) {
        $errors['name'] = 'Your name must be at most 100 characters.';
    }

    validateEmailField($input['email'], $errors);

    $messageLength = mb_strlen($input['message']);
    if ($messageLength === 0) {
        $errors['message'] = 'Your message is required.';
    } elseif ($messageLength < 10) {
        $errors['message'] = 'Your message must be at least 10 characters.';
    } elseif ($messageLength > 2000) {
        $errors['message'] = 'Your message must be at most 2000 characters.';
    }

    return $errors;
}

/** @param array{email: string} $input */
function validateSubscribeForm(array $input): array
{
    $errors = [];
    validateEmailField($input['email'], $errors);

    return $errors;
}
