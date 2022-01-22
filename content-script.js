document
  .querySelector(".jobs-apply-button")
  .addEventListener("click", (event) => {
    const CONTAINER = event.target.closest(".jobs-details")

    if (window.location.pathname.includes("/jobs/view/")) {
      return chrome.runtime.sendMessage(simpleView(CONTAINER))
    }

    return chrome.runtime.sendMessage(collectionView(CONTAINER))
  })

function simpleView(CONTAINER) {
  return {
    name: CONTAINER.querySelector("h1")?.textContent.trim(),
    url: window.location.href,
    business: CONTAINER.querySelector(
      ".jobs-unified-top-card__subtitle-primary-grouping a"
    )?.textContent.trim(),
    businessUrl: CONTAINER.querySelector(
      ".jobs-unified-top-card__subtitle-primary-grouping a"
    )?.href.trim(),
    location: CONTAINER.querySelector(
      ".jobs-unified-top-card__bullet"
    )?.textContent.trim(),
    workplace: CONTAINER.querySelector(
      ".jobs-unified-top-card__workplace-type"
    )?.textContent.trim(),
    type: CONTAINER.querySelector(
      ".jobs-unified-top-card__job-insight span"
    )?.textContent.trim(),
    description: CONTAINER.querySelector("#job-details")?.textContent.trim(),
    appliedAt: new Date().toISOString(),
  }
}

function collectionView(CONTAINER) {
  return {
    name: CONTAINER.querySelector("h2")?.textContent.trim(),
    url: window.location.href,
    business: CONTAINER.querySelector(
      ".jobs-unified-top-card__subtitle-primary-grouping span:first-child a"
    )?.textContent.trim(),
    businessUrl: CONTAINER.querySelector(
      ".jobs-unified-top-card__subtitle-primary-grouping span:first-child a"
    )?.href.trim(),
    location: CONTAINER.querySelector(
      ".jobs-unified-top-card__bullet"
    )?.textContent.trim(),
    workplace: CONTAINER.querySelector(
      ".jobs-unified-top-card__workplace-type"
    )?.textContent.trim(),
    type: CONTAINER.querySelector(
      ".jobs-unified-top-card__job-insight:first-child span"
    )?.textContent.trim(),
    description: CONTAINER.querySelector("#job-details")?.textContent.trim(),
    appliedAt: new Date().toISOString(),
  }
}
