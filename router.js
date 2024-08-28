document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const hamburger = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelector('.navbar-collapse');

    // Toggle mobile menu
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    // Handle navigation
    function loadContent(site) {
        fetch(`${site}.html`)
            .then(response => response.text())
            .then(html => {
                if (content) {
                    content.innerHTML = html;
                }
            })
            .catch(error => {
                console.error('Error loading content:', error);
                if (content) {
                    content.innerHTML = '<p>Fehler beim Laden der Seite.</p>';
                }
            });
    }

    // Initial load
    const urlParams = new URLSearchParams(window.location.search);
    const site = urlParams.get('site') || 'home';
    loadContent(site);

    // Handle link clicks
    document.querySelectorAll('a').forEach(link => {
        if (link.getAttribute('href') && link.getAttribute('href').startsWith('?site=')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const site = link.getAttribute('href').split('=')[1];
                history.pushState(null, '', `?site=${site}`);
                loadContent(site);
                if (navLinks) {
                    navLinks.classList.remove('show');
                }
            });
        }
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const site = urlParams.get('site') || 'home';
        loadContent(site);
    });
});