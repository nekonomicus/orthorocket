document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check if toggle element exists
    if (toggle) {
        // Load the initial theme from localStorage
        if (localStorage.getItem('dark-mode') === 'enabled') {
            body.classList.add('dark-mode');
            toggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            toggle.checked = false;
        }

        // Toggle dark mode
        toggle.addEventListener('change', function() {
            if (toggle.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('dark-mode', 'enabled');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('dark-mode', 'disabled');
            }
        });
    }
});
