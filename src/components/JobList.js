import {
  BASE_API_URL,
  RESULTS_PER_PAGE,
  getData,
  jobDetailsContentEl,
  jobListSearchEl,
  state,
} from "../common.js";

import renderError from "./Error.js";
import renderJobDetails from "./JobDetails.js";
import renderSpinner from "./Spinner.js";

const renderJobList = () => {
  jobListSearchEl.innerHTML = "";

  state.searchJobItems
    .slice(
      state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      state.currentPage * RESULTS_PER_PAGE
    )
    .forEach((jobItem) => {
      const newJobItemHTML = `
          <li class="job-item">
            <a class="job-item__link" href="${jobItem.id}">
              <div class="job-item__badge">${jobItem.badgeLetters}</div>
              <div class="job-item__middle">
                <h3 class="third-heading">${jobItem.title}</h3>
                <p class="job-item__company">${jobItem.company}</p>
                <div class="job-item__extras">
                  <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItem.duration}</p>
                  <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salary}</p>
                  <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${jobItem.location}</p>
                </div>
              </div>
              <div class="job-item__right">
                <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                <time class="job-item__time">${jobItem.daysAgo}d</time>
              </div>
            </a>
          </li>`;

      jobListSearchEl.insertAdjacentHTML("beforeend", newJobItemHTML);
    });
};

const handleClick = async (e) => {
  e.preventDefault();
  const jobItemEl = e.target.closest(".job-item");

  // ? Optional chaining => more modern than short circuiting
  document
    .querySelector(".job-item--active")
    ?.classList.remove("job-item--active");

  jobItemEl.classList.add("job-item--active");

  jobDetailsContentEl.innerHTML = "";

  renderSpinner("job-details");

  const id = jobItemEl.children[0].getAttribute("href");

  try {
    const data = await getData(`${BASE_API_URL}/jobs/${id}`);

    const { jobItem } = data;
    renderSpinner("job-details");
    renderJobDetails(jobItem);
  } catch (error) {
    renderSpinner("job-details");
    renderError(error.message);
  }

  // fetch(`${BASE_API_URL}/jobs/${id}`)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(
  //         "Resource issue (e.g resource does not exist) or server issue"
  //       );
  //     }

  //     return response.json();
  //   })
  //   .then((data) => {
  //     const { jobItem } = data;
  //     renderSpinner("job-details");
  //     renderJobDetails(jobItem);
  //   })
  //   .catch((error) => {
  //     renderSpinner("job-details");
  //     renderError(error.message);
  //   });
};

jobListSearchEl.addEventListener("click", handleClick);

export default renderJobList;
