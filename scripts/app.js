document.addEventListener('DOMContentLoaded', async () => {
    const auth0 = await createAuth0Client({
        domain: 'YOUR_AUTH0_DOMAIN',
        client_id: 'YOUR_AUTH0_CLIENT_ID'
    });

    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
        document.getElementById('chatgpt-wrapper').style.display = 'block';
    } else {
        document.getElementById('chatgpt-wrapper').innerHTML = '<p>Please <a href="#" id="login">log in</a> to use the AI assistant.</p>';
        document.getElementById('login').addEventListener('click', async () => {
            await auth0.loginWithRedirect({
                redirect_uri: window.location.origin
            });
        });
    }

    document.getElementById('chat-submit').addEventListener('click', async () => {
        const input = document.getElementById('chat-input').value;
        const chatWindow = document.getElementById('chat-window');
        chatWindow.innerHTML += `<p><strong>You:</strong> ${input}</p>`;
        
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`
            },
            body: JSON.stringify({
                prompt: input,
                max_tokens: 150
            })
        });
        const data = await response.json();
        const responseText = data.choices[0].text.trim();
        
        chatWindow.innerHTML += `<p><strong>GPT:</strong> ${responseText}</p>`;
        document.getElementById('chat-input').value = '';
        chatWindow.scrollTop = chatWindow.scrollHeight;
    });

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('dark-mode', darkModeToggle.checked);
    });

    // Initialize dark mode based on localStorage value
    if (localStorage.getItem('dark-mode') === 'true') {
        darkModeToggle.checked = true;
        document.body.classList.add('dark-mode');
    } else {
        darkModeToggle.checked = false;
        document.body.classList.remove('dark-mode');
    }
});
