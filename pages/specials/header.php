<header class="site-header" id="site--header-main">
    <div class="navbar container wide">
            <a href="index.php" class="logo">
                <img src="./images/logo_transparent.png" alt="Logo" />
            </a>
            <ul class="nav-links">
                <li><a href="?page=home">Home</a></li>
                <li><a href="?page=about">About</a></li>
                <li><a href="?page=projects">Projects</a></li>
                <li><a href="?page=contact">Contact</a></li>
            </ul>
    </div>
</header>

<style>
/* Header/Navbar Styles */
.site-header {
    width: 100%;
    background: #1f2d3d;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    position: sticky;
    top: 0;
    z-index: 10;
}

.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
}

.logo img {
    height: 4rem;
    width: auto;
    vertical-align: middle;
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 2.5rem;
}

.nav-links li {
    display: inline-block;
}

.nav-links a {
    color: #fff;
    text-decoration: none;
    font-size: 1.8rem;
    font-weight: 500;
    transition: color 0.2s;
    padding: 0.5rem 1rem;
    border-radius: 0.4rem;
    position: relative;
    z-index: 1010;
}

.nav-links a:hover,
.nav-links a:focus {
    background: #1f2d3d;
    color: #ff8c37;
}

/* Responsive: Stack nav links on small screens */
@media (max-width: 600px) {
    .navbar .contain {
        flex-direction: column;
        align-items: flex-start;
    }

    .nav-links {
        flex-direction: column;
        gap: 1.2rem;
        width: 100%;
        margin-top: 1rem;
    }
}
</style>