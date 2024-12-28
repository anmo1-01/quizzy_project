<?php
    if (basename($_SERVER['PHP_SELF']) === basename(__FILE__)) {
        // Prevent direct access
        die('Access denied');
    }

    require_once "session_config.php";
?>

<nav class="navbar navbar-expand-lg navbar-custom" id="navbarTag">
    <div class="container-fluid">
        <a class="navbar-brand" href="<?php echo htmlspecialchars($indexP); ?>">
            <img src="img/Logo.png" alt="Logo">
            <span class="nv_title">QUIZZY</span>
        </a>
        <div class="d-flex ms-auto">
            <!-- Logout link styled as a button -->
            <a href="logout.php" id="logoutBtn" class="btn btn-danger">
                <i class="bi bi-box-arrow-right"></i> <!-- Font Awesome logout icon -->
                <span class="d-none d-md-inline">Logout</span>
            </a>
        </div>
    </div>
</nav>
