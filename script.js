document.addEventListener('DOMContentLoaded', () => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log("Service Worker Registered"))
            .catch(err => console.log("Service Worker Failed", err));
    }

    const appContainer = document.querySelector('.app-container');
    const openMenuBtn = document.getElementById('openMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const sponsorBanner = document.getElementById('sponsorBanner');

    // Slide Menu Logic
    openMenuBtn.addEventListener('click', () => {
        appContainer.classList.add('menu-open');
    });

    closeMenuBtn.addEventListener('click', () => {
        appContainer.classList.remove('menu-open');
    });

    // Sponsor Banner Logic
    sponsorBanner.addEventListener('click', () => {
        window.location.href = "../finanza%20facile/index.html";
    });

    // Account Switcher Logic
    const accountToggle = document.getElementById('accountToggle');
    const accountDropdown = document.getElementById('accountDropdown');
    const addAccountBtn = document.getElementById('addAccountBtn');

    accountToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        accountDropdown.classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!accountToggle.contains(e.target)) {
            accountDropdown.classList.remove('show');
        }
    });

    addAccountBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        alert("Funzionalità 'Aggiungi Account' in arrivo! Verrai reindirizzato alla pagina di login per il nuovo account.");
        accountDropdown.classList.remove('show');
    });

    // Simple interactions for Nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const label = item.querySelector('span').innerText.toLowerCase();
            if (label === 'home') return; // Stay on index.html

            // Navigate to appropriate page
            window.location.href = `${label}.html`;
        });
    });

    // PWA Installation Logic
    let deferredPrompt;
    const installBtn = document.getElementById('installBtn');
    const installBtnLifestyle = document.getElementById('installBtnLifestyle');

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;

        // Optionally show your install UI
        if (installBtn) installBtn.style.display = 'flex';
        if (installBtnLifestyle) installBtnLifestyle.style.display = 'flex';
    });

    const handleInstallClick = () => {
        if (!deferredPrompt) {
            alert("L'app è già installata o il browser non supporta l'installazione automatica. Puoi aggiungerla manualmente dal menu del browser.");
            return;
        }
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    };

    if (installBtn) installBtn.addEventListener('click', handleInstallClick);
    if (installBtnLifestyle) installBtnLifestyle.addEventListener('click', handleInstallClick);
});
