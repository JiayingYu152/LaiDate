function initializeHeader() {
  // Initialize header components
  setupDropdownMenu();
  setupSearchDropdownMenu();
  setupResetButton();
  setupShowMatchesButton();
  setupSettingModal();
  setupHelpCenterModal();
  setupUpgradeAccountModal();
  jumpToInbox();
}

// Header rightmost dropdown menu
function setupDropdownMenu() {
  const dropdownButton = document.querySelector(".header-dropdown-container");
  const dropdownMenu = document.querySelector(".header-dropdown-menu");
  const searchDropdown = document.querySelector(".header-search-dropdown-menu");

  // Toggle to show the header rightmost dropdown menu
  dropdownButton.onclick = function (event) {
    dropdownMenu.classList.toggle("show");

    // Hide the search dropdown menu if it's open
    if (searchDropdown.classList.contains("show")) {
      searchDropdown.classList.remove("show");
    }

    event.stopPropagation();
  };

  // Prevent hiding dropdown when clicking inside the dropdown menu
  dropdownMenu.onclick = function (event) {
    event.stopPropagation();
  };

  // Toggle to hide the dropdown menus when clicking outside
  window.onclick = function (event) {
    if (
      !dropdownButton.contains(event.target) &&
      dropdownMenu.classList.contains("show")
    ) {
      dropdownMenu.classList.remove("show");
    }
  };
}

// Search dropdown menu
function setupSearchDropdownMenu() {
  const searchContainer = document.querySelector(".header-search-container");
  const searchDropdown = document.querySelector(".header-search-dropdown-menu");
  const dropdownMenu = document.querySelector(".header-dropdown-menu");

  // Toggle to show the search dropdown menu
  searchContainer.onclick = function (event) {
    searchDropdown.classList.toggle("show");

    // Hide the header rightmost dropdown menu if it's open
    if (dropdownMenu.classList.contains("show")) {
      dropdownMenu.classList.remove("show");
    }

    event.stopPropagation();
  };

  // Prevent hiding dropdown when clicking inside the dropdown menu
  searchDropdown.onclick = function (event) {
    event.stopPropagation();
  };

  // Toggle to hide the dropdown menus when clicking outside
  window.onclick = function (event) {
    if (
      !searchContainer.contains(event.target) &&
      searchDropdown.classList.contains("show")
    ) {
      searchDropdown.classList.remove("show");
    }
  };
}

// Reset button functionality for search dropdown menu
function setupResetButton() {
  const resetButton = document.querySelector(
    ".header-search-dropdown-modal-reset-button"
  );
  const searchDropdown = document.querySelector(".header-search-dropdown-menu");

  resetButton.onclick = function () {
    // Reset all select elements to their first option
    const selectElements = searchDropdown.querySelectorAll("select");
    selectElements.forEach((select) => {
      select.selectedIndex = 0;
    });

    // Reset all input elements to their default value
    const inputElements = searchDropdown.querySelectorAll("input[type='text']");
    inputElements.forEach((input) => {
      input.value = "";
    });

    // Uncheck all checkbox elements
    const checkboxElements = searchDropdown.querySelectorAll(
      "input[type='checkbox']"
    );
    checkboxElements.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };
}

// Show My Matches button functionality for search dropdown menu
function setupShowMatchesButton() {
  const showMatchesButton = document.querySelector(
    ".header-search-dropdown-modal-show-my-matches-button"
  );
  const searchDropdown = document.querySelector(".header-search-dropdown-menu");

  showMatchesButton.onclick = function () {
    searchDropdown.classList.remove("show");
  };
}

// Setting Modal functionality
function setupSettingModal() {
  const settingModal = document.querySelector(
    ".header-setting-modal-container"
  );
  const headerSettingButton = document.getElementById(
    "header-setting-component"
  );
  const settingSaveButton = document.querySelector(
    ".header-setting-modal-container-save-button"
  );
  const settingModalCloseButton = document.querySelector(
    ".header-setting-modal-container-content-close"
  );
  const headerDropdownMenu = document.querySelector(".header-dropdown-menu");

  headerSettingButton.onclick = function () {
    settingModal.classList.toggle("show");
    headerDropdownMenu.classList.remove("show");
  };
  settingSaveButton.onclick = function () {
    settingModal.classList.remove("show");
  };
  settingModalCloseButton.onclick = function () {
    settingModal.classList.remove("show");
  };
}

//Help Center Modal functionality
function setupHelpCenterModal() {
  const helpCenterModal = document.querySelector(
    ".header-helper-center-modal-container"
  );
  const headerHelpCenterButton = document.getElementById(
    "header-help-center-component"
  );
  const settingModalCloseButton = document.querySelector(
    ".header-helper-center-modal-container-content-close"
  );
  const headerDropdownMenu = document.querySelector(".header-dropdown-menu");

  headerHelpCenterButton.onclick = function () {
    helpCenterModal.classList.toggle("show");
    headerDropdownMenu.classList.remove("show");
  };

  settingModalCloseButton.onclick = function () {
    helpCenterModal.classList.remove("show");
  };
}

//Upgrade Account Modal functionality
function setupUpgradeAccountModal() {
  const upgradeAccountButton = document.querySelector(
    ".header-upgrade-account-button"
  );
  const upgradeAccountModal = document.querySelector(
    "#header-update-account-modal-container"
  );
  const upgradeAccountModalCloseButton = document.querySelector(
    ".header-update-account-modal-container-content-close"
  );

  upgradeAccountButton.addEventListener("click", function () {
    upgradeAccountModal.classList.toggle("show");
  });

  upgradeAccountModalCloseButton.addEventListener("click", function () {
    upgradeAccountModal.classList.remove("show");
  });
}

// jump to INBOX page
function jumpToInbox() {
  const headerInboxButton = document.querySelector(".header-inbox-container");
  headerInboxButton.addEventListener("click", function () {
    window.location.href = "inbox.html";
  });
}
