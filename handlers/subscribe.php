<?php
declare(strict_types=1);

/**
 * Receives the "Subscribe" form and saves the email in subscribers (each email only once).
 */

require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/validation.php';
require_once __DIR__ . '/../config/database.php';

requirePostRequest();
startSession();

$backUrl = '../index.php#subscribe';

$input = ['email' => postString('email')];
$errors = validateSubscribeForm($input);

if ($errors !== []) {
    flash('subscribe', ['errors' => $errors, 'old' => $input]);
    redirect($backUrl);
}

// Same message for new and existing emails, so nobody can use this form to check who is subscribed
$successMessage = 'Thanks! You are subscribed.';

try {
    $statement = getDatabaseConnection()->prepare('INSERT INTO subscribers (email) VALUES (:email)');
    $statement->execute($input);

    flash('subscribe', ['success' => $successMessage]);
} catch (PDOException $exception) {
    $mysqlErrorCode = (int) ($exception->errorInfo[1] ?? 0);

    if ($mysqlErrorCode === 1062) {
        // 1062 = duplicate entry: the UNIQUE key rejected an email that is already saved
        flash('subscribe', ['success' => $successMessage]);
    } else {
        error_log('Subscribe form error: ' . $exception->getMessage());
        flash('subscribe', [
            'errors' => ['form' => 'Sorry, something went wrong. Please try again later.'],
            'old'    => $input,
        ]);
    }
} catch (Throwable $exception) {
    error_log('Subscribe form error: ' . $exception->getMessage());
    flash('subscribe', [
        'errors' => ['form' => 'Sorry, something went wrong. Please try again later.'],
        'old'    => $input,
    ]);
}

redirect($backUrl);
