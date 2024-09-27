console.log("background.js loaded");

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes("linkedin.com/messaging")) {
        const url = new URL(tab.url);
        const urlParams = new URLSearchParams(url.search);
        console.log("URL Params:", urlParams);

        // Dynamically inject the content script
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        }, () => {
            console.log("Content script injected");
            // Now send message to content script after injection
            chrome.tabs.sendMessage(tabId, {
                type: "NEW",
                chatId: urlParams.get("c"),
            }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error sending message:", chrome.runtime.lastError.message);
                } else {
                    console.log("Message sent to content script:", response);
                }
            });
        });
    }
});
