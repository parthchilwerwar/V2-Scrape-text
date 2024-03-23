document.getElementById('scrapeButton').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "scrape" }, (response) => { 
            if(response && response.scrapedData) {
                document.getElementById('results').value = response.scrapedData;  
            } else {
               
               document.getElementById('results').value = "Scraping failed.";
            }
        });
    });
 });
 

document.getElementById('downloadButton').addEventListener('click', () => {
    const textContent = document.getElementById('results').value;
    const websiteName = new URL(document.location.href).hostname; 
    const filename = `V2 scrap ${websiteName}.txt`;

    const blob = new Blob([textContent], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link); 

    link.click(); 

    document.body.removeChild(link); 
    URL.revokeObjectURL(url); 
});



