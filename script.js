document.addEventListener('DOMContentLoaded', () => {

    // Theme Toggle
    const themeToggleButton = document.getElementById('theme-toggle');
    const siteBody = document.body;
    const themeIcon = themeToggleButton?.querySelector('i');
    const storageKey = 'portfolioTheme';
    const profilePic = document.getElementById('hero-profile-pic');

    const lightModePicSrc = 'Assets/Imgs/profile-pic/profile-pic-light.png';
    const darkModePicSrc = 'Assets/Imgs/profile-pic/profile-pic-dark.png';

    const applyTheme = (theme) => {
        const isDark = theme === 'dark';
        siteBody.classList.toggle('dark-mode', isDark);
        if (themeIcon) themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        if (profilePic) {
            profilePic.src = isDark ? darkModePicSrc : lightModePicSrc;
        } else {
            console.warn("Profile picture element (#hero-profile-pic) not found.");
        }
        localStorage.setItem(storageKey, theme);
    };

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            applyTheme(siteBody.classList.contains('dark-mode') ? 'light' : 'dark');
        });
    } else {
        console.warn("Theme toggle button (#theme-toggle) not found.");
    }

    // Initialize theme on page load
    const savedTheme = localStorage.getItem(storageKey);
    const prefersDarkMode = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDarkMode ? 'dark' : 'light'));

    // Listen for OS theme changes if no theme is manually set
    window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (!localStorage.getItem(storageKey)) {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });

});