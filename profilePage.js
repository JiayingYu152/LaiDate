document.addEventListener("DOMContentLoaded", function () {
  initializeProfilePage();
});

function initializeProfilePage() {
  fetchAndDisplayHeader();
  setupBackButton();
  fetchAndDisplayInterests();
  setupInterestSelection();
  setupMyInterestModal();
  setupAboutMeModal();
  setupLookingForModal();
  displayProfileInfo();
  clearLocalStorageAfterUse(); // Clear Local Storage after use
  addChatDiv();
  chatWithPerson();
}

// Fetch the header and display it
function fetchAndDisplayHeader() {
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      const headerPlaceholder = document.getElementById(
        "profile-page-header-placeholder"
      );
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = data;
        initializeHeader();
      }
    });
}

// Control BACK button at upper component to go back to the previous page
function setupBackButton() {
  const upperComponentBackButton = document.querySelector(
    ".profile-page-upper-upper-top-layer-back-button"
  );
  if (upperComponentBackButton) {
    upperComponentBackButton.addEventListener("click", () => {
      window.history.back();
    });
  }
}

// Fetch the interests list
function fetchAndDisplayInterests() {
  const interestsContainer = document.querySelector(
    ".profile-page-bottom-left-component-my-interests-change-modal-interests-area"
  );
  if (interestsContainer) {
    fetch("data/hardCodeData.json")
      .then((response) => response.json())
      .then((data) => {
        interestsContainer.innerHTML = "";
        data.hobbies.forEach((interest) => {
          const interestDiv = document.createElement("div");
          interestDiv.className =
            "profile-page-bottom-left-component-interest-item";
          interestDiv.textContent = interest;
          interestsContainer.appendChild(interestDiv);
        });
      })
      .catch((error) => console.error("Error loading the interests:", error));
  }
}

// Setup event delegation for selecting interests
function setupInterestSelection() {
  const interestsContainer = document.querySelector(
    ".profile-page-bottom-left-component-my-interests-change-modal-interests-area"
  );
  if (interestsContainer) {
    interestsContainer.addEventListener("click", function (event) {
      console.log("Clicked on:", event.target);
      if (
        event.target.classList.contains(
          "profile-page-bottom-left-component-interest-item"
        )
      ) {
        event.target.classList.toggle("selected"); // Toggle 'selected' class on click
      }
    });
  }
}

// Event listeners for MY INTEREST modal show/hide
function setupMyInterestModal() {
  const myInterestChangeIcon = document.getElementById(
    "profile-page-bottom-left-component-change-icon"
  );
  const myInterestModal = document.getElementById(
    "profile-page-bottom-left-component-my-interests-change-modal-container"
  );
  const myInterestCloseButton = document.querySelector(
    ".profile-page-bottom-left-component-close"
  );

  if (myInterestChangeIcon) {
    myInterestChangeIcon.addEventListener("click", function () {
      myInterestModal.style.display = "block";
    });
  }

  if (myInterestCloseButton) {
    myInterestCloseButton.addEventListener("click", function () {
      myInterestModal.style.display = "none";
    });
  }

  window.onclick = function (event) {
    if (event.target == myInterestModal) {
      myInterestModal.style.display = "none";
    }
  };

  // Handle saving selected interests at MY INTEREST modal
  const myInterestSaveButton = document.querySelector(
    ".profile-page-bottom-left-component-my-interests-save-button"
  );
  const myInterestContentContainer = document.querySelector(
    ".profile-page-bottom-left-component-content-container"
  );

  if (myInterestSaveButton && myInterestContentContainer) {
    myInterestSaveButton.addEventListener("click", () => {
      myInterestContentContainer.innerHTML = "";
      document
        .querySelectorAll(
          ".profile-page-bottom-left-component-interest-item.selected"
        )
        .forEach((item) => {
          const div = document.createElement("div");
          div.textContent = item.textContent;
          div.className =
            "profile-page-bottom-left-component-interest-item-selected";
          myInterestContentContainer.appendChild(div);
        });
      myInterestModal.style.display = "none";
    });
  }
}

// Event listeners for ABOUT ME modal show/hide
function setupAboutMeModal() {
  const aboutMeChangeIcon = document.getElementById(
    "profile-page-bottom-middle-component-change-icon"
  );
  const aboutMeModal = document.getElementById(
    "profile-page-bottom-middle-component-about-me-change-modal-container"
  );
  const aboutMeCloseButton = document.querySelector(
    ".profile-page-bottom-middle-component-close"
  );

  if (aboutMeChangeIcon) {
    aboutMeChangeIcon.addEventListener("click", function () {
      aboutMeModal.style.display = "block";
    });
  }

  if (aboutMeCloseButton) {
    aboutMeCloseButton.addEventListener("click", function () {
      aboutMeModal.style.display = "none";
    });
  }

  window.onclick = function (event) {
    if (event.target == aboutMeModal) {
      aboutMeModal.style.display = "none";
    }
  };

  // Handle saving ABOUT ME modal
  const aboutMeSaveButton = document.querySelector(
    ".profile-page-bottom-middle-component-my-interests-save-button"
  );

  if (aboutMeSaveButton) {
    aboutMeSaveButton.addEventListener("click", function () {
      // Retrieve input values from modal inputs
      const aboutMeLocationInput = document.getElementById(
        "profile-page-bottom-middle-component-input-location"
      );
      const aboutMeOccupationInput = document.getElementById(
        "profile-page-bottom-middle-component-input-occupation"
      );
      const aboutMeEducationInput = document.getElementById(
        "profile-page-bottom-middle-component-input-education"
      );
      const aboutMeLanguageInput = document.getElementById(
        "profile-page-bottom-middle-component-input-language"
      );
      const aboutMeHeightInput = document.getElementById(
        "profile-page-bottom-middle-component-input-height"
      );
      const aboutMeWeightInput = document.getElementById(
        "profile-page-bottom-middle-component-input-weight"
      );
      const aboutMeEyesInput = document.getElementById(
        "profile-page-bottom-middle-component-input-eyes"
      );
      const aboutMeHairInput = document.getElementById(
        "profile-page-bottom-middle-component-input-hair"
      );
      const aboutMeHaveKidsInput = document.getElementById(
        "profile-page-bottom-middle-component-input-have-kids"
      );
      const aboutMeSmokeInput = document.getElementById(
        "profile-page-bottom-middle-component-input-smoke"
      );
      const aboutMeDrinkInput = document.getElementById(
        "profile-page-bottom-middle-component-input-drink"
      );

      // Set the textContent of the display elements in the main content container
      document.getElementById(
        "profile-page-about-me-location-input"
      ).textContent = aboutMeLocationInput.value;
      document.getElementById(
        "profile-page-about-me-occupation-input"
      ).textContent = aboutMeOccupationInput.value;
      document.getElementById(
        "profile-page-about-me-education-input"
      ).textContent = aboutMeEducationInput.value;
      document.getElementById(
        "profile-page-about-me-language-input"
      ).textContent = aboutMeLanguageInput.value;
      document.getElementById(
        "profile-page-about-me-height-input"
      ).textContent = aboutMeHeightInput.value;
      document.getElementById(
        "profile-page-about-me-weight-input"
      ).textContent = aboutMeWeightInput.value;
      document.getElementById("profile-page-about-me-eyes-input").textContent =
        aboutMeEyesInput.value;
      document.getElementById("profile-page-about-me-hair-input").textContent =
        aboutMeHairInput.value;
      document.getElementById(
        "profile-page-about-me-have-kids-input"
      ).textContent = aboutMeHaveKidsInput.value;
      document.getElementById("profile-page-about-me-smoke-input").textContent =
        aboutMeSmokeInput.value;
      document.getElementById("profile-page-about-me-drink-input").textContent =
        aboutMeDrinkInput.value;

      // Close the modal
      aboutMeModal.style.display = "none";
    });
  }
}

// Event listeners for LOOKING FOR modal show/hide
function setupLookingForModal() {
  const lookingForChangeIcon = document.getElementById(
    "profile-page-bottom-right-component-change-icon"
  );
  const lookingForModal = document.getElementById(
    "profile-page-bottom-right-component-looking-for-change-modal-container"
  );
  const lookingForCloseButton = document.querySelector(
    ".profile-page-bottom-right-component-close"
  );

  if (lookingForChangeIcon) {
    lookingForChangeIcon.addEventListener("click", function () {
      console.log("Change icon clicked.");
      lookingForModal.style.display = "block";
    });
  }

  if (lookingForCloseButton) {
    lookingForCloseButton.addEventListener("click", function () {
      lookingForModal.style.display = "none";
    });
  }

  window.onclick = function (event) {
    if (event.target == lookingForModal) {
      lookingForModal.style.display = "none";
    }
  };

  // Handle saving LOOKING FOR modal
  const lookingForSaveButton = document.querySelector(
    ".profile-page-bottom-right-component-my-interests-save-button"
  );
  const lookingForInfoSection = document.querySelector(
    ".profile-page-bottom-right-component-looking-for-info-section"
  );
  const lookingForAboutInputSection = document.querySelector(
    ".profile-page-bottom-right-component-looking-for-about-section"
  );
  const lookingForGenderSelect = document.getElementById(
    "profile-page-bottom-right-component-looking-for-change-modal-gender-selected"
  );
  const lookingForMinAgeSelect = document.getElementById(
    "profile-page-bottom-right-component-looking-for-change-modal-age-min-selected"
  );
  const lookingForMaxAgeSelect = document.getElementById(
    "profile-page-bottom-right-component-looking-for-change-modal-age-max-selected"
  );
  const lookingForAboutSelect = document.getElementById(
    "profile-page-bottom-right-component-looking-for-change-modal-about-selected"
  );

  if (
    lookingForSaveButton &&
    lookingForInfoSection &&
    lookingForAboutInputSection
  ) {
    lookingForSaveButton.addEventListener("click", () => {
      if (
        lookingForGenderSelect &&
        lookingForMinAgeSelect &&
        lookingForMaxAgeSelect &&
        lookingForAboutSelect
      ) {
        const genderValue = lookingForGenderSelect.value.split(" ")[3]; // pick the last word
        const minAgeValue = lookingForMinAgeSelect.value;
        const maxAgeValue = lookingForMaxAgeSelect.value;
        const aboutValue = lookingForAboutSelect.value;

        lookingForInfoSection.innerHTML = `<h2>${genderValue}, ${minAgeValue} - ${maxAgeValue}</h2>`;
        lookingForAboutInputSection.innerHTML = `<p>${aboutValue}</p>`;
        lookingForModal.style.display = "none";
      }
    });
  }
}

//check persona's image_url validation
function validateImageUrl(person) {
  if (person.image_url && person.image_url.trim() !== "") {
    return `./data/personaPictures/${person.image_url.split("/").pop()}`;
  } else {
    return getDefaultImage(person.self_identity);
  }
}

//set default image for persona
function getDefaultImage(self_identity) {
  const defaultImage = {
    Male: "./data/personaPictures/male.jpeg",
    Female: "./data/personaPictures/female.jpeg",
    Them: "./data/personaPictures/them.jpeg",
  };
  return defaultImage[self_identity] || defaultImage["Them"];
}

//Fetch and display profile information from being clicked gallery card in main.html
function displayProfileInfo() {
  const person = JSON.parse(
    localStorage.getItem("selectedPersonToFetchTheirProfilePage") ||
      localStorage.getItem("selectedPersonToFetchTheirProfilePageWithChat")
  );
  if (!person) return;

  //define the content to be displayed
  const nameAgeContent = document.querySelector(
    ".profile-page-upper-upper-top-layer-left-bottom-name-age-content h1"
  );
  const idContent = document.querySelector(
    ".profile-page-upper-upper-top-layer-left-bottom-info-content p"
  );
  const profileImageContainer = document.querySelector(
    ".profile-page-upper-upper-top-layer-left-bottom-picture-container"
  );
  const validImageUrl = validateImageUrl(person);
  const creditContent = document.querySelector(
    ".profile-page-upper-upper-top-layer-refill-button span"
  );
  const descriptionHeader = document.querySelector(
    ".profile-page-upper-bottom-component-container .profile-page-component-header-h3"
  );
  const hobbiesContainer = document.querySelector(
    ".profile-page-bottom-left-component-content-container"
  );
  const locationContent = document.getElementById(
    "profile-page-about-me-location-input"
  );
  const occupationContent = document.getElementById(
    "profile-page-about-me-occupation-input"
  );
  const educationContent = document.getElementById(
    "profile-page-about-me-education-input"
  );
  const languageContent = document.getElementById(
    "profile-page-about-me-language-input"
  );
  const heightContent = document.getElementById(
    "profile-page-about-me-height-input"
  );
  const weightContent = document.getElementById(
    "profile-page-about-me-weight-input"
  );
  const eyeContent = document.getElementById(
    "profile-page-about-me-eyes-input"
  );
  const hairContent = document.getElementById(
    "profile-page-about-me-hair-input"
  );
  const haveKidsContent = document.getElementById(
    "profile-page-about-me-have-kids-input"
  );
  const smokeContent = document.getElementById(
    "profile-page-about-me-smoke-input"
  );
  const drinkContent = document.getElementById(
    "profile-page-about-me-drink-input"
  );
  const sexPreferenceContent = document.querySelector(
    ".profile-page-bottom-right-component-looking-for-info-section strong"
  );

  //set the content to be displayed
  nameAgeContent.textContent = `${person.name}, ${person.age}`;
  idContent.textContent = `ID: ${person.id_number}`;
  profileImageContainer.innerHTML = `
  <img src="${validImageUrl}" alt="${
    person.name
  }" onerror="this.onerror=null;this.src='${getDefaultImage(
    person.self_identity
  )}';" />
  <button>UPLOAD PHOTO</button>
`;
  creditContent.textContent = `${person.credit} CREDIT`;
  descriptionHeader.textContent = person.description
    ? person.description
    : "A Bit About Me";
  hobbiesContainer.innerHTML = "";
  person.hobbies.forEach((hobby) => {
    const hobbyDiv = document.createElement("div");
    hobbyDiv.className =
      "profile-page-bottom-left-component-fetch-interest-item";
    hobbyDiv.textContent = hobby;
    hobbiesContainer.appendChild(hobbyDiv);
  });
  locationContent.textContent = person.location;
  occupationContent.textContent = person.work_title;
  educationContent.textContent = person.education_level;
  languageContent.textContent = person.language;
  heightContent.textContent = person.height;
  weightContent.textContent = person.weight;
  eyeContent.textContent = person.eye_color;
  hairContent.textContent = person.hair_color;
  haveKidsContent.textContent = person.have_kids;
  smokeContent.textContent = person.smoke_vape;
  drinkContent.textContent = person.drink_frequency;
  sexPreferenceContent.textContent = person.sex_preference
    ? `${person.sex_preference}, Year Range`
    : "Gender, Year Range";
}

//Clear local storage after fetching the data
function clearLocalStorageAfterUse() {
  localStorage.removeItem("selectedPersonToFetchTheirProfilePage");
  // localStorage.removeItem("selectedPersonToFetchTheirProfilePageWithChat");
}

// Add chat div if person exists in localStorage
function addChatDiv() {
  const chatContainer = document.querySelector(
    ".profile-page-chat-mostly-hidden-hugest-container"
  );
  const profileAlwaysShowComponent = document.querySelector(
    ".profile-page-main-information-container-always-show"
  );
  const profileAlwaysShowComponentInner = document.querySelector(
    ".profile-page-main-content-container"
  );
  const person = JSON.parse(
    localStorage.getItem("selectedPersonToFetchTheirProfilePageWithChat")
  );

  if (!person) {
    chatContainer.style.display = "none"; // Hide chat container if no person in localStorage
    return;
  }

  chatContainer.style.display = "block"; // Show chat container if person exists in localStorage
  profileAlwaysShowComponent.style.flex = 1; // used to depend on profileAlwaysShowComponentInner
  profileAlwaysShowComponentInner.style.width = "100%"; // used to be width 1200px;

  const chatUserImage = document.getElementById(
    "profile-page-chat-content-header-left-image"
  );
  const validImage = validateImageUrl(person); //check validation of image, not able to fetch then judgeg the image by persona's self_identity
  const chatUserName = document.querySelector(
    ".profile-page-chat-content-header-left-name"
  );

  chatUserName.textContent = person.name;
  chatUserImage.src = validImage;
  chatUserImage.alt = person.name;
}

//Chatbot funcationality
async function chatWithPerson() {
  const chatContainer = document.querySelector(
    ".profile-page-chat-mostly-hidden-hugest-container"
  );
  const favoriteIcon = document.getElementById(
    "profile-page-chat-content-header-right-favorite-icon"
  );
  const homeIcon = document.getElementById(
    "profile-page-chat-content-header-right-home-icon"
  );
  const closeIcon = document.getElementById(
    "profile-page-chat-content-header-right-close-icon"
  );
  const moreIcon = document.getElementById(
    "profile-page-chat-content-header-right-more-icon"
  );
  const chatMessageContainer = document.querySelector(
    ".profile-page-chat-content-message-content-container"
  );
  const chatInput = document.querySelector(
    ".profile-page-chat-content-user-input-container-bottom-section input"
  );
  const sendButton = document.getElementById(
    "profile-page-chat-content-user-input-container-bottom-send-button"
  );

  const nowTime = returnNowDateAndTime();
  const timeStrong = document.createElement("strong");

  const greetingMessage = await generateAutomaticMessage(); // Wait for the greeting message
  const automaticMessage = document.createElement("div");
  automaticMessage.textContent = greetingMessage;
  automaticMessage.className =
    "profile-page-chat-content-message-content-from-opposite";

  favoriteIcon.addEventListener("click", () => {
    favoriteIcon.classList.toggle("selected");
  });

  homeIcon.addEventListener("click", () => {
    window.location.href = "main.html";
  });

  closeIcon.addEventListener("click", () => {
    chatContainer.style.display = "none";
  });

  moreIcon.addEventListener("click", () => {
    moreIcon.classList.toggle("show");
  });

  timeStrong.textContent = nowTime;
  timeStrong.style.textAlign = "center";
  timeStrong.style.marginBottom = "20px";
  chatMessageContainer.innerHTML = ``;
  chatMessageContainer.appendChild(timeStrong);

  chatMessageContainer.appendChild(automaticMessage);

  //user at my side sending message:
  function userSendMessage() {
    const myMessage = chatInput.value.trim();
    if (myMessage) {
      const myMessageDiv = document.createElement("div");
      myMessageDiv.textContent = myMessage;
      myMessageDiv.className =
        "profile-page-chat-content-message-content-from-me-user";
      chatMessageContainer.appendChild(myMessageDiv);
      chatInput.value = ""; //clear input component after sending message
    }
  }

  //throttle the user's message sending
  let timeoutId;

  sendButton.addEventListener("click", () => {
    clearTimeout(timeoutId);
    userSendMessage();
    startTimeout();
  });

  chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      clearTimeout(timeoutId);
      userSendMessage();
      startTimeout();
      event.preventDefault(); // Prevent form submission if the input is inside a form
    }
  });

  function startTimeout() {
    timeoutId = setTimeout(() => {
      oppositeAutoReply();
    }, 1000); //wait until 15 seconds to send automatic message
  }

  async function oppositeAutoReply() {
    const blurryMessageFromOpposite = document.createElement("div");
    blurryMessageFromOpposite.textContent = await generateAutomaticMessage();
    blurryMessageFromOpposite.className =
      "profile-page-chat-content-message-content-from-opposite-blurry";

    const warningMessage = document.createElement("div");
    warningMessage.innerHTML =
      "This message is blurred, please upgrade to premium to see the message. If you are a premium user, please check out Center <a href='main.html'>contact us</a>.";
    warningMessage.className =
      "profile-page-chat-content-message-content-from-opposite-warning";

    chatMessageContainer.appendChild(blurryMessageFromOpposite);
    chatMessageContainer.appendChild(warningMessage);
  }
}

//helper function to generate now date and time
function returnNowDateAndTime() {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var date = currentDate.getDate();
  var hour = currentDate.getHours();
  var minute = currentDate.getMinutes();

  var formattedDate = `${year}-${month}-${date}`;
  var formattedTime = `${hour}:${minute}`;

  return `${formattedDate} ${formattedTime}`;
}

//helper function to generate some greeting message automatically
async function generateAutomaticMessage() {
  try {
    const greetings = await fetch("data/greetings.json");
    console.log(greetings);
    if (!greetings.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await greetings.json();
    const oneGreetingMessage =
      data.greetings[Math.floor(Math.random() * data.greetings.length)];
    return oneGreetingMessage;
  } catch (err) {
    console.error("Fetch failed", err);
    return "Hello! How are you today?"; //default greeting message
  }
}
