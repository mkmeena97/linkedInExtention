(() => {
    let linkedinChatGenerator;
    let currentChat = "";

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, chatId } = obj;
        if (type === "NEW") {
            currentChat = chatId;
            console.log("New Chat Loaded:", chatId);
            newChatLoaded();
        }
    });

    function newChatLoaded() {
        console.log("Chat loaded, icon should be displayed.");
    }
})();
