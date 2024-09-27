(()=>{
    let linkedinChatGenerator;
    let currentChat = "";
    
    chrome.runtime.onMessage.addListener((obj,sender,response)=>{
        const {type, value, chatId} = obj;
        if(type === "NEW"){
            currentChat = chatId;
            newChatLoaded();
        }
    })
})();