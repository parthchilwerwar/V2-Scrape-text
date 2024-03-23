function scrapeText() {
   
    let scrapedData = document.body.innerText; 
    if (scrapedData) {
        return scrapedData;
    } else {
        return "Could not find text content."; 
    }
}





chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrape") {
        const scrapedData = scrapeText();
        sendResponse({ action: "data", scrapedData }); 
    }
   
});
