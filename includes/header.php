<?php
/**
 * Site header: <head>, opening <body> and the top navigation.
 * Expects (optional) $pageTitle to be defined by the page that includes this file.
 */
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?= htmlspecialchars($pageTitle ?? 'Kasper') ?></title>
    <!-- Render All Elements Normally -->
    <link rel="stylesheet" href="css/normalize.css" />
    <!-- Font Awesome Library -->
    <link rel="stylesheet" href="css/all.min.css" />
    <!-- Main Template CSS File -->
    <link rel="stylesheet" href="css/kasper.css" />
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet" />
    <!-- Main JavaScript File (defer = run after the HTML is fully parsed) -->
    <script src="js/main.js" defer></script>
  </head>
  <body>
    <!-- Start Header -->
    <header>
      <div class="container">
        <a href="#home" class="logo">
          <img src="images/logo.png" alt="Kasper" />
        </a>
        <nav>
          <button
            class="toggle-menu"
            type="button"
            aria-label="Toggle navigation"
            aria-controls="main-nav"
            aria-expanded="false"
          >
            <i class="fas fa-bars" aria-hidden="true"></i>
          </button>
          <ul id="main-nav">
            <li><a class="active" href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div class="form">
            <i class="fas fa-search"></i>
          </div>
        </nav>
      </div>
    </header>
    <!-- End Header -->
