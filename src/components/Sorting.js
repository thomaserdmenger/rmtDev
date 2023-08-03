import {
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  state,
} from "../common.js";

import renderJobList from "./JobList.js";

const handleClick = (e) => {
  const clickedButtonEl = e.target.closest(".sorting__button");

  if (!clickedButtonEl) return;

  const recent = clickedButtonEl.className.includes("--recent") ? true : false;

  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
  } else {
    sortingBtnRelevantEl.classList.add("sorting__button--active");
    sortingBtnRecentEl.classList.remove("sorting__button--active");
  }

  if (recent) {
    state.searchJobItems.sort((a, b) => a.daysAgo - b.daysAgo);
  } else {
    state.searchJobItems.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  renderJobList();
};

sortingEl.addEventListener("click", handleClick);
