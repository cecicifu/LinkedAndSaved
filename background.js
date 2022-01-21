const URLS = [
  "https://www.linkedin.com/jobs/collections/recommended/",
  "https://www.linkedin.com/jobs/view/",
]

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log(message, sender)
  // Guardamos la informacion de la oferta aplicada en el storage API
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (
    changeInfo.status == "complete" &&
    URLS.some((url) => tab.url.includes(url))
  ) {
    if (this.timeout != null) {
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(
      function () {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["content-script.js"],
        })
        this.timeout = null
      }.bind(this),
      1000
    )
  }
})
