let GLOBAL_NEWS = [];
let DATE_NEWS_FETCHED_FROM_API;
let ACTIVE_PAGINATION_PAGE = 0;
const LOCAL_STORAGE_NEWS_KEY = "news";
const LOCAL_STORAGE_NEWS_DATE_RETRIEVED_KEY = "news-date-retrieved";
const PAGINATION_MULTIPLE = 5;

// Remove news that are displayed to the user with fade out effect
const removeCurrentNews = () => {
  const newsList = document.getElementById("news-list");
  const divNews = Object.values(newsList.getElementsByTagName("div"));
  divNews.map((item) => {
    item.childNodes.forEach((itemChild) => {
      itemChild.classList.add("removed");
    });
    setTimeout(() => {
      item.remove();
    }, 250);
  });
};

// Append news to the list displayed to the user
const appendNews = (start = 0) => {
  GLOBAL_NEWS.slice(start, start + PAGINATION_MULTIPLE).map((item) => {
    const itemWrapper = document.createElement("div");

    const title = document.createElement("p");
    title.classList.add("title-news");

    const titleNode = document.createTextNode(item.title);
    title.appendChild(titleNode);

    const details = document.createElement("p");
    details.classList.add("details-news");

    const detailsNode = document.createTextNode(item.details);
    details.appendChild(detailsNode);

    itemWrapper.appendChild(title);
    itemWrapper.appendChild(details);

    const newsList = document.getElementById("news-list");
    newsList.appendChild(itemWrapper);
  });
};

// Highlight the active pagination page
const highlightActivePage = (page = 0) => {
  const newsListDots = document.querySelectorAll("#pagination li");
  if (page > newsListDots.length || page < 0) {
    return;
  }

  ACTIVE_PAGINATION_PAGE = page;
  newsListDots[page].classList.add("active-page");
};

// Remove the highlight of active pagination page
const removeHighlightActivePage = () => {
  const newsListDots = document.querySelectorAll("#pagination li");
  newsListDots[ACTIVE_PAGINATION_PAGE].classList.remove("active-page");
};

// Implement the logic of changing the pagination page
const changePage = (page = 0) => {
  if (page === ACTIVE_PAGINATION_PAGE) {
    return;
  }
  removeCurrentNews();
  removeHighlightActivePage();
  appendNews(page * PAGINATION_MULTIPLE);
  highlightActivePage(page % PAGINATION_MULTIPLE);
};

// Return how many minutes have passed since given date
const minutesSinceGivenDate = (dateReceived) => {
  const date = new Date(dateReceived);
  const dateInSeconds = Math.floor(
    (new Date().valueOf() - date.valueOf()) / 1000
  );

  return Math.floor(dateInSeconds / 60);
};

// Return true or false if received date is more than three minutes ago
const isDateMoreThanThreeMinutesAgo = (givenDate) => {
  if (givenDate === null || givenDate === undefined) {
    return true;
  }
  if (minutesSinceGivenDate(givenDate) >= 3) {
    return true;
  }
  return false;
};

// Retrieve news stored in local storage
const retrieveNewsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NEWS_KEY));
};

// Retrieve the date news have been fetched from API call
const retrieveDateNewsFetchedFromAPI = () => {
  return JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_NEWS_DATE_RETRIEVED_KEY)
  );
};

// Remove loading animation on initial load
const removeLoadingAnimation = () => {
  const loadingNewsList = document.getElementById("skeleton-initial-list");
  loadingNewsList.remove();
};

// Implement the logic of initial load effect
const initialLoadEffect = () => {
  removeLoadingAnimation();
  appendNews();
  highlightActivePage(0);
};

// Implement the logic of initial load
const initialLoad = async () => {
  GLOBAL_NEWS = retrieveNewsFromLocalStorage();
  DATE_NEWS_FETCHED_FROM_API = retrieveDateNewsFetchedFromAPI();

  if (
    GLOBAL_NEWS &&
    GLOBAL_NEWS.length > 0 &&
    !isDateMoreThanThreeMinutesAgo(DATE_NEWS_FETCHED_FROM_API)
  ) {
    initialLoadEffect();
    return;
  }

  await fetch("https://www.mocky.io/v2/58fda6ce0f0000c40908b8c8")
    .then((response) => response.json())
    .then((data) => {
      GLOBAL_NEWS = data.news;
      localStorage.setItem(LOCAL_STORAGE_NEWS_KEY, JSON.stringify(GLOBAL_NEWS));
      localStorage.setItem(
        LOCAL_STORAGE_NEWS_DATE_RETRIEVED_KEY,
        JSON.stringify(new Date())
      );
      initialLoadEffect();
    })
    .catch((err) => alert(err));
};

// Change pagination page every 15 seconds
setInterval(() => {
  if (ACTIVE_PAGINATION_PAGE + 1 === GLOBAL_NEWS.length / PAGINATION_MULTIPLE) {
    changePage(0);
    return;
  }
  changePage(ACTIVE_PAGINATION_PAGE + 1);
}, 1000 * 15);

// Reload page every 3 minutes
setTimeout(() => {
  location.reload();
}, 1000 * 60 * 3);

// On initial load of the page we run an initial load function
window.onload = async function () {
  initialLoad();
};
