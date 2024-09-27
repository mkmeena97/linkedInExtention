console.log('LinkedIn AI Reply Generator extension loaded');

document.addEventListener('focusin', (event) => {
    if (event.target && event.target.tagName === 'TEXTAREA') {
        showAIIcon(event.target);
    }
});

function showAIIcon(inputElement) {
    const aiIcon = document.createElement('img');
    aiIcon.src = chrome.runtime.getURL('public/icons/ai-icon.svg'); 
    aiIcon.style.position = 'absolute';
    aiIcon.style.cursor = 'pointer';
    aiIcon.style.width = '20px';
    aiIcon.style.height = '20px';
    aiIcon.style.top = `${inputElement.offsetTop}px`;
    aiIcon.style.left = `${inputElement.offsetLeft + inputElement.offsetWidth - 25}px`;

    aiIcon.addEventListener('click', () => {
        openModal();
    });

    document.body.appendChild(aiIcon);

    inputElement.addEventListener('focusout', () => {
        aiIcon.remove();
    });
}

function openModal() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
    modal.style.zIndex = '1000';

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Enter your command...';

    const generateButton = document.createElement('button');
    generateButton.innerText = 'Generate';
    generateButton.style.marginLeft = '10px';

    generateButton.addEventListener('click', () => {
        alert('Thank you for the opportunity! If you have any more questions or if there\'s anything else I can help you with, feel free to ask.');
    });

    modal.appendChild(inputField);
    modal.appendChild(generateButton);

    document.body.appendChild(modal);

    document.addEventListener('click', (event) => {
        if (!modal.contains(event.target)) {
            modal.remove();
        }
    }, { once: true });
}
