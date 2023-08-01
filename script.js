// -- GLOBAL --

const BASE_API_URL = "https://bytegrad.com/course-assets/js/2/api";

// const bookmarksBtnEl = document.querySelector('.bookmarks-btn');
const errorEl = document.querySelector(".error");
const errorTextEl = document.querySelector(".error__text");
// const jobDetailsEl = document.querySelector('.job-details');
// const jobDetailsContentEl = document.querySelector(".job-details__content");
// const jobListBookmarksEl = document.querySelector('.job-list--bookmarks');
const jobListSearchEl = document.querySelector(".job-list--search");
const numberEl = document.querySelector(".count__number");
// const paginationEl = document.querySelector(".pagination");
// const paginationBtnNextEl = document.querySelector(".pagination__button--next");
// const paginationBtnBackEl = document.querySelector(".pagination__button--back");
// const paginationNumberNextEl = document.querySelector(".pagination__number--next");
// const paginationNumberBackEl = document.querySelector(".pagination__number--back");
// const sortingEl = document.querySelector(".sorting");
// const sortingBtnRelevantEl = document.querySelector(".sorting__button--relevant");
// const sortingBtnRecentEl = document.querySelector(".sorting__button--recent");
const spinnerSearchEl = document.querySelector(".spinner--search");
// const spinnerJobDetailsEl = document.querySelector(".spinner--job-details");
const searchFormEl = document.querySelector(".search");
const searchInputEl = document.querySelector(".search__input");

// -- SEARCH COMPONENT --
const handleSubmit = (e) => {
  e.preventDefault();
  const searchText = searchInputEl.value;

  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    errorTextEl.textContent =
      "Your search may not contain numbers or special characters";

    errorEl.classList.add("error--visible");
    setTimeout(() => {
      errorEl.classList.remove("error--visible");
      return;
    }, 3500);
  }

  searchInputEl.value = "";
  // searchInputEl.blur();
  searchInputEl.focus();
  jobListSearchEl.innerHTML = "";
  spinnerSearchEl.classList.add("spinner--visible");

  fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
    .then((res) => {
      if (!res.ok) {
        console.log("Something went wrong");
        return;
      }
      return res.json();
    })
    .then((data) => {
      const { jobItems } = data;
      spinnerSearchEl.classList.remove("spinner--visible");
      numberEl.textContent = jobItems.length;

      jobItems.slice(0, 7).forEach((jobItem) => {
        const newJobItemHTML = `
            <li class="job-item">
              <a class="job-item__link" href="${jobItems.id}">
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
    })
    .catch((error) => console.error(error));
};

searchFormEl.addEventListener("submit", handleSubmit);
