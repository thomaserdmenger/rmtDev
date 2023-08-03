import {
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  BASE_API_URL,
  getData,
} from "../common.js";

import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";

const handleSubmit = async (e) => {
  e.preventDefault();
  const searchText = searchInputEl.value;

  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    renderError(data.description);
    return;
  }

  searchInputEl.value = "";
  searchInputEl.blur();
  jobListSearchEl.innerHTML = "";

  renderSpinner("search");

  // Asynchronous JS with async/await & try/catch
  try {
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

    const { jobItems } = data;
    renderSpinner("search");
    numberEl.textContent = jobItems.length;
    renderJobList(jobItems);
  } catch (error) {
    // network problem or other errors (e.g trying to parse something not JSON as JSON
    renderSpinner("search");
    renderError(error.message);
  }

  // Asynchronous JS mit .then() & .catch()
  // fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
  //   .then((res) => {
  //     if (!res.ok) {
  //       // 4xx, 5xx status code
  //       throw new Error(
  //         "Resource issue (e.g resource does not exist) or server issue"
  //       );
  //     }
  //     return res.json();
  //   })
  //   .then((data) => {
  //     const { jobItems } = data;
  //     renderSpinner("search");
  //     numberEl.textContent = jobItems.length;
  //     renderJobList(jobItems);
  //   })
  //   .catch((error) => {
  //     // network problem or other errors (e.g trying to parse something not JSON as JSON
  //     renderSpinner("search");
  //     renderError(error.message);
  //   });
};

searchFormEl.addEventListener("submit", handleSubmit);
