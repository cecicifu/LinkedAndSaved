const CONTEXT = ["/jobs/collections/", "/jobs/view/"]

chrome.runtime.onMessage.addListener((job) => {
  chrome.storage.local.get({ jobs: [] }, async function (result) {
    await result.jobs.push(job)
    await chrome.storage.local.set({ jobs: result.jobs })

    console.log(result)
  })
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (
    changeInfo.status === "complete" &&
    CONTEXT.some((url) => tab.url.includes(url))
  ) {
    if (this.timeout !== null) {
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
