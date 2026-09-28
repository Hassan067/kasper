<?php
declare(strict_types=1);

/**
 * Receives the "Contact Us" form, validates it and saves it in contact_messages.
 * Pattern: Post -> Redirect -> Get. The result is stored in the session (flash)
 * and shown once on index.php after the redirect.
 */

require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/validation.php';
require_once __DIR__ . '/../config/database.php';

requirePostRequest();
startSession();

$backUrl = '../index.php#contact';

$input = [
    'name'    => postString('name'),
    'email'   => postString('email'),
    'message' => postString('message'),
];

$errors = validateContactForm($input);

if ($errors !== []) {
    flash('contact', ['errors' => $errors, 'old' => $input]);
    redirect($backUrl);
}

try {
    // Prepared statement: the SQL and the data travel separately, so user input can never change the query
    $statement = getDatabaseConnection()->prepare(
        'INSERT INTO contact_messages (name, email, message) VALUES (:name, :email, :message)'
    );
    $statement->execute($input);

    flash('contact', ['success' => 'Thank you! Your message has been sent.']);
} catch (Throwable $exception) {
    // The real error goes to the server log, the visitor sees a friendly message
    error_log('Contact form error: ' . $exception->getMessage());
    flash('contact', [
        'errors' => ['form' => 'Sorry, something went wrong. Please try again later.'],
        'old'    => $input,
    ]);
}

redirect($backUrl);
