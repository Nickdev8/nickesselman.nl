<footer class="site-footer">
    <div class="footer-content container">
        <div class="footer-left">
            <img src="/images/logo_transparent.png" alt="Nick Esselman Logo" class="footer-logo">
            <span>&copy; <?php echo date('Y'); ?> Nick Esselman</span>
        </div>
        <div class="footer-links">
            <a href="?page=contact">Contact</a>
            <a href="https://github.com/Nickdev8/nickesselman.nl" target="_blank" rel="noopener">Repository</a>
            <a href="https://www.instagram.com/nick.esselman/" target="_blank" rel="noopener">Instagram</a>
            <a href="?page=about">About</a>
        </div>
        <div class="footer-right">
            <span>Made for <a href="https://hackclub.com/" target="_blank" rel="noopener">Hack Club
                    Neighborhood</a></span>
        </div>
    </div>
</footer>



<style>

    .site-footer {
        background: #1f2d3d;
        color: #fff;
        padding: 2rem 0 1rem 0;
        font-size: 1.5rem;
        margin-top: auto;
    }

    .site-footer,
    .site-footer>* {
        z-index: 10;
        position: relative;
    }

    .footer-content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        max-width: 1200px;
        margin: 0 auto;
        gap: 2rem;
    }

    .footer-left {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .footer-logo {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        background: #fff;
        object-fit: cover;
    }

    .footer-links {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
    }

    .footer-links a {
        color: #ff8c37;
        text-decoration: none;
        transition: color 0.2s;
    }

    .footer-links a:hover {
        color: #fff;
        text-decoration: underline;
    }

    .footer-right {
        font-size: 1.3rem;
    }

    .footer-right a {
        color: #ff8c37;
        text-decoration: none;
    }

    .footer-right a:hover {
        text-decoration: underline;
    }

    @media (max-width: 700px) {
        .footer-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }

        .footer-left,
        .footer-right {
            font-size: 1.2rem;
        }
    }
</style>