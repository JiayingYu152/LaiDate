document.addEventListener("DOMContentLoaded", function () {
  fetchInboxHeader();
  fetchInboxContent();
});

//fetch header component
function fetchInboxHeader() {
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      const headerPlaceholder = document.getElementById(
        "inbox-page-header-placeholder"
      );
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = data;
      }
    });
}

//fetch content components
function fetchInboxContent() {
  const allSwitchButton = document.getElementById(
    "inbox-page-all-switch-button"
  );
  const unreadSwitchButton = document.getElementById(
    "inbox-page-unread-switch-button"
  );
  const readButUnansweredSwitchButton = document.getElementById(
    "inbox-page-read-but-unanswered-switch-button"
  );
  const blockedSwitchButton = document.getElementById(
    "inbox-page-blocked-switch-button"
  );

  const allContent = document.getElementById("inbox-page-all-switch-container");
  const unreadContent = document.getElementById(
    "inbox-page-unread-switch-container"
  );
  const readButUnansweredContent = document.getElementById(
    "inbox-page-read-but-unanswered-switch-container"
  );
  const blockedContent = document.getElementById(
    "inbox-page-blocked-switch-container"
  );

  allSwitchButton.addEventListener("click", function () {
    allContent.style.display = "block";
    allSwitchButton.classList.add("inbox-page-all-switch-button-selected");
    unreadContent.style.display = "none";
    unreadSwitchButton.classList.remove(
      "inbox-page-unread-switch-button-selected"
    );
    readButUnansweredContent.style.display = "none";
    readButUnansweredSwitchButton.classList.remove(
      "inbox-page-read-but-unanswered-switch-button-selected"
    );
    blockedContent.style.display = "none";
    blockedSwitchButton.classList.remove(
      "inbox-page-blocked-switch-button-selected"
    );
  });

  unreadSwitchButton.addEventListener("click", function () {
    unreadContent.style.display = "block";
    unreadSwitchButton.classList.add(
      "inbox-page-unread-switch-button-selected"
    );
    allContent.style.display = "none";
    allSwitchButton.classList.remove("inbox-page-all-switch-button-selected");
    readButUnansweredContent.style.display = "none";
    readButUnansweredSwitchButton.classList.remove(
      "inbox-page-read-but-unanswered-switch-button-selected"
    );
    blockedContent.style.display = "none";
    blockedSwitchButton.classList.remove(
      "inbox-page-blocked-switch-button-selected"
    );
  });

  readButUnansweredSwitchButton.addEventListener("click", function () {
    readButUnansweredContent.style.display = "block";
    readButUnansweredSwitchButton.classList.add(
      "inbox-page-read-but-unanswered-switch-button-selected"
    );
    allContent.style.display = "none";
    allSwitchButton.classList.remove("inbox-page-all-switch-button-selected");
    unreadContent.style.display = "none";
    unreadSwitchButton.classList.remove(
      "inbox-page-unread-switch-button-selected"
    );
    blockedContent.style.display = "none";
    blockedSwitchButton.classList.remove(
      "inbox-page-blocked-switch-button-selected"
    );
  });

  blockedSwitchButton.addEventListener("click", function () {
    blockedContent.style.display = "block";
    blockedSwitchButton.classList.add(
      "inbox-page-blocked-switch-button-selected"
    );
    allContent.style.display = "none";
    allSwitchButton.classList.remove("inbox-page-all-switch-button-selected");
    unreadContent.style.display = "none";
    unreadSwitchButton.classList.remove(
      "inbox-page-unread-switch-button-selected"
    );
    readButUnansweredContent.style.display = "none";
    readButUnansweredSwitchButton.classList.remove(
      "inbox-page-read-but-unanswered-switch-button-selected"
    );
  });

  //By default, ALL is selected
  allContent.style.display = "block";
  allSwitchButton.classList.add("inbox-page-all-switch-button-selected");
  unreadContent.style.display = "none";
  readButUnansweredContent.style.display = "none";
  blockedContent.style.display = "none";
}
