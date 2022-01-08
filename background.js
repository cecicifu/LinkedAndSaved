const filter = {
  url: [
    {
      urlMatches: "https://www.linkedin.com",
    },
  ],
}

chrome.webNavigation.onCompleted.addListener((tab) => {
  init(tab, "onComplete")
}, filter)
chrome.webNavigation.onHistoryStateUpdated.addListener((tab) => {
  init(tab, "onHistoryStateUpdated")
}, filter)

const init = (tab, state) => {
  console.log(state)
  chrome.scripting.executeScript({
    target: { tabId: tab.tabId },
    files: ["script.js"],
  })
}
