document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        toggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        toggle.checked = false;
    }

    toggle.addEventListener('change', function() {
        if (toggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'disabled');
        }
    });

    const chatSubmitButton = document.getElementById('chat-submit');
    chatSubmitButton.addEventListener('click', async function() {
        const chatInput = document.getElementById('chat-input').value;
        const chatWindow = document.getElementById('chat-window');

        if (chatInput.trim() === '') {
            return;
        }

        chatWindow.innerHTML += `<p><strong>You:</strong> ${chatInput}</p>`;

        try {
            const response = await fetch('https://orthorocketsbackend.glitch.me', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: chatInput })
            });
            const data = await response.json();
            chatWindow.innerHTML += `<p><strong>AI:</strong> ${data.answer}</p>`;
        } catch (error) {
            console.error('Error:', error);
            chatWindow.innerHTML += `<p><strong>AI:</strong> Sorry, there was an error processing your request.</p>`;
        }

        document.getElementById('chat-input').value = '';
    });
});
