//Fetch the header section with dropdown function and display it at the top of the page
document.addEventListener("DOMContentLoaded", function () {
  initializePage();
});

// Initialize the page content
function initializePage() {
  fetchHeader();
  fetchDataAndDisplayProfiles();
  toggleShowButton();
  fetchDataAndAddChatRequests();
  loadGalleryWithLazyLoading();
  clearOldLocalStorage();
}

//define the deafultImage:
const defaultImage = {
  Male: "./data/personaPictures/male.jpeg",
  Female: "./data/personaPictures/female.jpeg",
  Them: "./data/personaPictures/them.jpeg",
};

function fetchHeader() {
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("main-page-header-placeholder").innerHTML = data;
      initializeHeader();
    });
}

function validateImageUrl(person) {
  if (person.image_url && person.image_url.trim() !== "") {
    return `data/personaPictures/${person.image_url.split("/").pop()}`;
  } else {
    return getDefaultImage(person.self_identity);
  }
}

function getDefaultImage(self_identity) {
  return defaultImage[self_identity] || defaultImage["Them"];
}

// Control the voice button: toggle the icon when clicked
document
  .querySelector(".main-page-right-upper-component-voice-content")
  .addEventListener("click", function () {
    var img = document.getElementById(
      "main-page-right-upper-component-search-bar-voice-status"
    );
    if (img.src.match("voice-on.svg")) {
      img.src = "./data/voice-mute.svg";
      img.alt = "voice-mute";
    } else {
      img.src = "./data/voice-on.svg";
      img.alt = "voice-on";
    }
  });

//fetch data to main-page-left-upper-component-container
function fetchDataAndDisplayProfiles() {
  fetch("data/personas.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById(
        "main-page-profile-slider-container"
      );
      data.slice(0, 20).forEach((person) => {
        // show 20 profiles only
        const profileDiv = document.createElement("div");
        profileDiv.className = "main-page-left-upper-component-one-profile";

        const firstName = person.name.split(" ")[0]; // split the first word from "name"

        const imageUrl = validateImageUrl(person);

        // create img element and set the src and alt
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = firstName;
        img.onerror = function () {
          this.src = getDefaultImage(person.self_identity); // if the image loading fails, use the default image
        };

        // create p element for first name
        const nameParagraph = document.createElement("p");
        nameParagraph.textContent = firstName;

        // construct the profileDiv
        profileDiv.appendChild(img);
        profileDiv.appendChild(nameParagraph);
        container.appendChild(profileDiv);

        // add event listener to the img element when clicked to show the bigger image for 5 seconds
        img.addEventListener("click", function () {
          const overlay = document.getElementById("main-page-overlay");
          const overlayImg = document.getElementById("main-page-overlay-img");
          const floatingDiv = document.querySelector(
            ".main-page-overlay-bottom-floating-div"
          );
          const chatNowButton = document.getElementById(
            "main-page-overlay-chat-now-button"
          );

          overlay.style.display = "flex";
          overlayImg.src = this.src; // show image

          // Store person info in localStorage for CHAT NOW button click
          localStorage.setItem("currentOverlayPerson", JSON.stringify(person));

          // Hide the floating div initially
          floatingDiv.style.display = "none";

          // Show the floating div after 2 seconds
          setTimeout(function () {
            floatingDiv.style.display = "block";
          }, 2000);

          // Hide the overlay after 6 seconds
          setTimeout(function () {
            overlay.style.display = "none";
          }, 6000);

          // Add event listener to CHAT NOW button
          chatNowButton.addEventListener("click", function () {
            appendNewChatRequestToUpperComponent(person);
            overlay.style.display = "none";
          });
        });
      });

      // add the close button to the overlay to close the image
      const closeButton = document.getElementById("main-page-overlay-close");
      closeButton.addEventListener("click", function () {
        const overlay = document.getElementById("main-page-overlay");
        overlay.style.display = "none";
      });
    })
    .catch((error) => console.error("Error loading the data:", error));
}

// Toggle SHOW LESS and SHOW MORE button at right bottom component
function toggleShowButton() {
  const toggleButton = document.querySelector(
    ".main-page-right-bottom-component-my-contacts-show-less-button"
  );
  const upperContainer = document.querySelector(
    ".main-page-right-upper-component-container"
  );
  const bottomContainer = document.querySelector(
    ".main-page-right-bottom-component-container"
  );

  initToggleButtonState(); // initialize the toggle button state as SHOW LESS, prevent the button text from being repeated staying at SHOW LESS when refreshing the page

  toggleButton.addEventListener("click", function () {
    if (toggleButton.textContent === "SHOW LESS") {
      upperContainer.style.height = "70%";
      bottomContainer.style.height = "30%";
      toggleButton.textContent = "SHOW MORE";
    } else {
      upperContainer.style.height = "40%";
      bottomContainer.style.height = "60%";
      toggleButton.textContent = "SHOW LESS";
    }
  });

  function initToggleButtonState() {
    // the initial state is SHOW LESS
    if (
      upperContainer.style.height === "70%" &&
      bottomContainer.style.height === "30%"
    ) {
      toggleButton.textContent = "SHOW MORE";
    } else {
      upperContainer.style.height = "40%";
      bottomContainer.style.height = "60%";
      toggleButton.textContent = "SHOW LESS";
    }
  }
}

// Fetch the data from Peronas.json and add chat requests to the right bottom component
function fetchDataAndAddChatRequests() {
  const lastLoadTime = localStorage.getItem("lastLoadTime");
  const currentTime = new Date().getTime();

  // // whether repeat function call within 5 minutes
  // if (lastLoadTime && currentTime - lastLoadTime < 300000) {
  //   // 5 minutes * 60 seconds * 1000 milliseconds = 300000 milliseconds
  //   console.log("Refresh frequently within 5 minutes, skip this loading");
  //   return; // skip the loading
  // }

  // update the last load time
  localStorage.setItem("lastLoadTime", currentTime);

  fetch("./data/personas.json")
    .then((response) => response.json())
    .then((data) => {
      const randomDataInput = data.sort(() => 0.5 - Math.random()); // shuffle the data
      addChatRequest(randomDataInput);
    })
    .catch((error) => console.error("Error loading the data:", error));
}

// Add chat request to the right bottom component
function addChatRequest(chatData) {
  const fiboGenerator = fibonacci();
  let count = 0;
  const maxRequest = 25; // allow maximum 25 chat requests

  function appendChatRequest(index) {
    if (index >= chatData.length || count >= maxRequest) return;

    const oneRequest = chatData[index];
    const messageContent = document.querySelector(
      ".main-page-right-bottom-component-message-content"
    );
    const requestDiv = document.createElement("div");
    const requestImageUrl = validateImageUrl(oneRequest);

    // Error handling for description, if the description is empty, use the default description
    const requestDescription = oneRequest.description
      ? `${oneRequest.description}`
      : "is invited to chat.";

    // Construct the requestDiv
    requestDiv.className = "main-page-right-bottom-component-one-chat-request";
    requestDiv.innerHTML = `
      <img src="${requestImageUrl}" alt="${oneRequest.name}" class="main-page-right-bottom-component-one-chat-request-image">
      <div class="main-page-right-bottom-component-one-chat-request-user-info-content">
          <p class="main-page-right-bottom-component-one-chat-request-name">${oneRequest.name}</p>
          <p class="main-page-right-bottom-component-one-chat-request-description">${requestDescription}</p>
      </div>
      <button id="main-page-right-bottom-component-one-chat-request-reply-button" class="main-page-right-bottom-component-one-chat-request-reply-button">REPLY</button>  
    `;

    messageContent.appendChild(requestDiv);

    // REPLY button functionality
    const replyButton = requestDiv.querySelector(
      ".main-page-right-bottom-component-one-chat-request-reply-button"
    );
    replyButton.addEventListener("click", function () {
      appendNewChatRequestToUpperComponent(oneRequest, requestDiv);
    });

    count++;
    const nextTimeGenerate = fiboGenerator.next().value * 1000;
    setTimeout(
      () => appendChatRequest((index + 1) % chatData.length),
      nextTimeGenerate
    );
  }

  appendChatRequest(0); // start the first request here
}

function* fibonacci() {
  let a = 0,
    b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Move the chat request to the upper component when the REPLY button is clicked
function appendNewChatRequestToUpperComponent(request, oldRequestDiv = null) {
  const toBeRemovedContainer = document.querySelector(
    ".main-page-right-bottom-component-message-content"
  );
  const toBePastedContainer = document.querySelector(
    ".main-page-right-upper-component-chat-message-content"
  );

  // Check if the user is already in the upper component
  const existingUser = Array.from(
    toBePastedContainer.querySelectorAll(
      ".main-page-right-upper-component-chat-message-person-name"
    )
  ).find((element) => element.textContent === request.name);

  if (existingUser) {
    return; // User already exists, do not add again
  }

  const newRequestDiv = document.createElement("div");
  const newRequestImageUrl = validateImageUrl(request);

  // Remove the request from the bottom container if oldRequestDiv is provided
  if (oldRequestDiv) {
    toBeRemovedContainer.removeChild(oldRequestDiv);
  }

  // Start to construct the newRequestDiv
  newRequestDiv.className = "main-page-right-upper-component-one-chat-message";
  newRequestDiv.innerHTML = `
    <img src="${newRequestImageUrl}" alt="${request.name}" class="main-page-right-upper-component-one-chat-message-image">
    <div class="main-page-right-upper-component-chat-message-user-info">
        <p class="main-page-right-upper-component-chat-message-person-name">${request.name}</p>
        <p class="main-page-right-upper-component-chat-message-person-history">chat message placeholder here</p>
    </div>
  `;

  // Check if the container is empty
  const needToBeHiddenStrong = document.getElementById(
    "need-to-be-hidden-strong"
  );
  const needToBeHiddenP = document.getElementById("need-to-be-hidden-p");
  if (toBePastedContainer.children.length === 2) {
    needToBeHiddenStrong.style.display = "none";
    needToBeHiddenP.style.display = "none";
  }

  toBePastedContainer.appendChild(newRequestDiv);
  toBePastedContainer.style.justifyContent = "flex-start";

  setupChatMessageClickHandler(); // Add click handler to the new request
}

// Load the gallery content at the left bottom component, with Lazy Loading and Infinite Scrolling
let currentIndex = 0; // Initializes the global variable to record the currently loaded index
let isLoading = false; // prevent the repeated loading when scrolling

function loadGalleryWithLazyLoading() {
  const galleryShowContent = document.getElementById(
    "main-page-left-bottom-component-gallery-show-content"
  );

  const profilesContent = document.createElement("div");
  profilesContent.id =
    "main-page-left-bottom-component-explore-profile-gallery";
  profilesContent.className =
    "main-page-left-bottom-component-explore-profile-gallery";
  galleryShowContent.appendChild(profilesContent);

  loadGallery(profilesContent, "data/personas.json", currentIndex);

  window.addEventListener("scroll", () => {
    // Check that the user has scrolled to the bottom of the page while making sure that no data is loading
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isLoading
    ) {
      isLoading = true; // start loading data, set isLoading as true
      loadGallery(profilesContent, "data/personas.json", currentIndex);
    }
  });
}

function loadGallery(container, fetchData, startIndex) {
  fetch(fetchData)
    .then((response) => response.json())
    .then((data) => {
      const items = data.slice(startIndex, startIndex + 10); // load 10 cards each time
      items.forEach((gallery) => {
        const card = createGalleryCard(gallery);
        container.appendChild(card);
      });
      currentIndex += items.length; // update the global variable : index
      isLoading = false; // load finished, set isLoading false
    })
    .catch((error) => {
      console.error("Error loading the gallery:", error);
      isLoading = false; // error occurs, set isLoading false
    });
}

function createGalleryCard(gallery) {
  const card = document.createElement("div");
  card.className = "main-page-left-bottom-component-profile-gallery-card";

  const cardImageUrl = validateImageUrl(gallery);
  const img = document.createElement("img");
  img.src = cardImageUrl;
  img.alt = "Profile card image";
  img.className = "main-page-left-bottom-component-profile-gallery-card-image";
  img.onerror = function () {
    this.src = getDefaultImage(gallery.self_identity);
  };

  const infoContent = document.createElement("div");
  infoContent.className =
    "main-page-left-bottom-component-profile-gallery-card-info-content";
  const title = document.createElement("h4");
  title.textContent = `${gallery.name}, ${gallery.age}`;
  const description = document.createElement("p");
  description.textContent = gallery.description;

  const tagList = document.createElement("div");
  tagList.className =
    "main-page-left-bottom-component-profile-gallery-card-tag-list";
  if (gallery.hobbies && gallery.hobbies.length > 0) {
    gallery.hobbies.slice(0, 3).forEach((hobby) => {
      const tag = document.createElement("span");
      tag.className =
        "main-page-left-bottom-component-profile-gallery-card-one-tag";
      tag.textContent = hobby;
      tagList.appendChild(tag);
    });
  }

  infoContent.appendChild(title);
  infoContent.appendChild(description);
  infoContent.appendChild(tagList);
  card.appendChild(img);
  card.appendChild(infoContent);

  // Add click event listener to the card to redirect to profilePage.html
  card.addEventListener("click", function () {
    localStorage.setItem(
      "selectedPersonToFetchTheirProfilePage",
      JSON.stringify(gallery)
    ); // Store the persona's details in localStorage
    window.location.href = "profilePage.html"; // Redirect to profilePage.html
  });

  return card;
}

function clearOldLocalStorage() {
  localStorage.removeItem("selectedPersonToFetchTheirProfilePage");
  localStorage.removeItem("selectedPersonToFetchTheirProfilePageWithChat");
}

function setupChatMessageClickHandler() {
  document
    .querySelectorAll(".main-page-right-upper-component-one-chat-message")
    .forEach((chatMessageContent) => {
      chatMessageContent.addEventListener("click", function () {
        const personaName = chatMessageContent.querySelector(
          ".main-page-right-upper-component-chat-message-person-name"
        ).textContent;

        fetch("data/personas.json")
          .then((response) => response.json())
          .then((data) => {
            const person = data.find((p) => p.name === personaName);

            if (person) {
              localStorage.setItem(
                "selectedPersonToFetchTheirProfilePageWithChat",
                JSON.stringify(person)
              );
              window.location.href = "profilePage.html";
            }
          })
          .catch((error) =>
            console.error("Error fetching persona data:", error)
          );
      });
    });
}
