(() => {
    console.log("content.js loaded"); // Safe to log here

    let currentChat = "";

    chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
        const { type, chatId } = obj;

        if (type === "NEW") {
            currentChat = chatId;
            console.log("New Chat Loaded:", chatId);
            newChatLoaded();
            sendResponse({ status: "Content script received message successfully" });
        }
    });

    function newChatLoaded() {
        console.log("newChatLoaded function triggered");

        // Set up a MutationObserver to watch for the input field
        const observer = new MutationObserver(() => {
            const inputField = document.querySelector('div[contenteditable="true"].msg-form__contenteditable');
            if (inputField) {
                showAIIcon(inputField);
                observer.disconnect(); // Stop observing once found
            } else {
                console.log("No message input field found yet!");
            }
        });

        // Start observing the body for added nodes
        observer.observe(document.body, { childList: true, subtree: true });
    }

    function showAIIcon(inputElement) {
        // Check if AI icon already exists to avoid duplication
        if (document.querySelector('#ai-icon')) {
            return; // Exit if the icon already exists
        }

        // Create AI icon
        const aiIcon = document.createElement('img');
        aiIcon.src = chrome.runtime.getURL('public/icons/ai-icon.svg');
        aiIcon.id = 'ai-icon'; // Add an ID for reference

        // Set the styling to position the icon in the bottom left
        aiIcon.style.position = 'absolute';
        aiIcon.style.cursor = 'pointer';
        aiIcon.style.width = '20px';
        aiIcon.style.height = '20px';
        aiIcon.style.bottom = '5px'; // Position from the bottom
        aiIcon.style.right = '5px';   // Position from the left

        // Add click event to open the modal
        aiIcon.onclick = () => {
            console.log('AI icon clicked!'); // Log when the icon is clicked
            openModal(); // Open the modal for message input
        };

        // Append the icon to the input element's parent
        inputElement.parentElement.appendChild(aiIcon); // Append the icon to the parent container
    }

    function openModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded-lg z-999 w-96 h-64 overflow-auto';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = 'white';
        modal.style.padding = '20px';
        modal.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
        modal.style.zIndex = '1000';
        modal.style.width = '500px'; // Increased width
        modal.style.height = '300px'; // Increased height
        modal.style.overflow = 'auto'; // Allow scrolling if needed

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'Generated message will appear here...';
        inputField.style.width = '100%'; // Full width of modal
        inputField.style.marginBottom = '10px'; // Space below the input

    // Create the generate button with custom styles
    const generateButton = document.createElement('button');
    generateButton.innerText = 'Generate';
    generateButton.style.marginRight = '10px'; // Adds spacing between buttons
    generateButton.style.border = '1px solid black'; // Black border
    generateButton.style.padding = '8px 16px'; // Padding for button
    generateButton.style.backgroundColor = '#4CAF50'; // Green background
    generateButton.style.color = 'white'; // White text color
    generateButton.style.borderRadius = '5px'; // Rounded corners
    generateButton.style.cursor = 'pointer'; // Cursor pointer for hover effect
    generateButton.style.fontSize = '14px'; // Font size
    generateButton.style.fontWeight = 'bold'; // Bold text

    // Create the insert button with custom styles
    const insertButton = document.createElement('button');
    insertButton.innerText = 'Insert';
    insertButton.style.border = '1px solid black'; // Black border
    insertButton.style.padding = '8px 16px'; // Padding for button
    insertButton.style.backgroundColor = '#008CBA'; // Blue background
    insertButton.style.color = 'white'; // White text color
    insertButton.style.borderRadius = '5px'; // Rounded corners
    insertButton.style.cursor = 'pointer'; // Cursor pointer for hover effect
    insertButton.style.fontSize = '14px'; // Font size
    insertButton.style.fontWeight = 'bold'; // Bold text

        // Function to handle generating the response
        generateButton.addEventListener('click', () => {
            const generatedReply = 'Thank you for the opportunity! If you have any more questions or if there\'s anything else I can help you with, feel free to ask.';
            inputField.value = generatedReply; // Set the generated message in the input field
        });

        // Function to handle inserting the text into LinkedIn's message box
        insertButton.addEventListener('click', () => {
            const message = inputField.value;
            if (message) {
                // Find the LinkedIn message input field
                const linkedinInput = document.querySelector('div[contenteditable="true"].msg-form__contenteditable');
                if (linkedinInput) {
                    // Set the inner text to the input field
                    linkedinInput.innerText = message;
                    // Trigger input event for LinkedIn to recognize the change
                    linkedinInput.dispatchEvent(new Event('input', { bubbles: true })); 
                    modal.remove(); // Close modal after insertion
                } else {
                    alert('Message input field not found!');
                }
            } else {
                alert('Please generate a message before inserting.'); // Alert if the input is empty
            }
        });

        modal.appendChild(inputField);
        modal.appendChild(generateButton);
        modal.appendChild(insertButton);
        document.body.appendChild(modal);

        // Close modal on click outside
        document.addEventListener('click', (event) => {
            if (!modal.contains(event.target) && !document.querySelector('#ai-icon').contains(event.target)) {
                modal.remove();
            }
        }, { once: true });
    }
})();
