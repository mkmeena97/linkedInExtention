chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("linkedin.com/messaging")) {
        const url = new URL(tab.url);
        const urlParams = new URLSearchParams(url.search);

        console.log("URL Params:", urlParams);
        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            chatId: urlParams.get("c"),
        });
    }
});
