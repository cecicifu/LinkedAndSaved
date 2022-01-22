const jobList = document.querySelector("#job-list")
const refreshList = document.querySelector("#refresh-list")
const clearList = document.querySelector("#clear-list")

chrome.runtime.onMessage.addListener(() => {
  updateJobs()
})

function updateJobs() {
  jobList.innerHTML = ``
  chrome.storage.local.get("jobs", (result) => {
    if (result?.jobs !== undefined) {
      clearList.style.display = "initial"
      result.jobs.forEach((job) => {
        const appliedAt = new Date(job.appliedAt)

        jobList.innerHTML += `<li>
        <span class="applied_at" title=${appliedAt.toLocaleTimeString()}>${appliedAt.toLocaleDateString()}</span>
        -
        <a class="business" href=${job.businessUrl} target="_blank">${
          job.business
        }</a>
        -
        <a class="url" href=${job.url} target="_blank">${job.name}</a> 
        (${job.workplace})
      </li>`
      })
    } else clearList.style.display = "none"
  })
}
updateJobs()

refreshList.addEventListener("click", function () {
  updateJobs()
})

clearList.addEventListener("click", function () {
  chrome.storage.local.clear(function () {
    var error = chrome.runtime.lastError
    if (error) {
      console.error(error)
    }
  })
  updateJobs()
})
