document.addEventListener("DOMContentLoaded", function () {
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("presents-page-header-placeholder").innerHTML =
        data;
      initializeHeader();
    });

  // Attach event listeners for buttons to switch content visibility of buying gifts and gift bucket
  const selectPurchaseSwitchButton = document.getElementById(
    "select-purchase-switch-button"
  );
  const giftBucketSwitchButton = document.getElementById(
    "gift-bucket-switch-button"
  );

  selectPurchaseSwitchButton.addEventListener("click", function () {
    document.getElementById("buy-gifts-container").style.display = "flex"; // Use flex instead of block
    document.getElementById("gifts-bucket-container").style.display = "none"; // Hide the gifts bucket section

    // Update font color
    selectPurchaseSwitchButton.classList.add(
      "select-purchase-switch-button-selected"
    );
    giftBucketSwitchButton.classList.remove(
      "gift-bucket-switch-button-selected"
    );
  });

  giftBucketSwitchButton.addEventListener("click", function () {
    document.getElementById("buy-gifts-container").style.display = "none"; // Hide the buy gifts section
    document.getElementById("gifts-bucket-container").style.display = "flex"; // Show the gifts bucket section with flex layout

    // Update font color
    giftBucketSwitchButton.classList.add("gift-bucket-switch-button-selected");
    selectPurchaseSwitchButton.classList.remove(
      "select-purchase-switch-button-selected"
    );
  });

  // Display the buy gifts section by default
  document.getElementById("buy-gifts-container").style.display = "flex";
  document.getElementById("gifts-bucket-container").style.display = "none";
  selectPurchaseSwitchButton.classList.add(
    "select-purchase-switch-button-selected"
  ); // Set default active button color

  // Start of credit refill modal:
  // 1. Fetch the refill credit modal starting from here:
  let creditCount = 100; // initialize the credit count as global variable

  const creditRefillModal = document.getElementById(
    "presents-page-credit-refill-modal"
  );
  const creditRefillModalCloseButton = document.getElementById(
    "presents-page-credit-refill-modal-close-button"
  );
  const creditRefillModalInput = document.getElementById(
    "presents-page-credit-count"
  );

  // 2. Display the modal and the credits are initialized
  document
    .getElementById("presents-page-refill-button")
    .addEventListener("click", function () {
      currentModalCredit = parseInt(
        document
          .getElementById("presents-page-display-credit")
          .textContent.replace(" CREDIT", ""),
        10
      ); // record current credit count
      creditRefillModal.style.display = "block";
      creditRefillModalInput.value = creditCount; // set the input-value to the current credit count
    });

  document
    .getElementById("presents-page-credit-refill-modal-submit-credit-button")
    .addEventListener("click", function () {
      let submittedCredit = parseInt(creditRefillModalInput.value, 10); // get the input value
      if (submittedCredit >= currentModalCredit) {
        creditCount = submittedCredit; // update current credit count
        document.getElementById("presents-page-display-credit").textContent =
          creditCount + " CREDIT";
        creditRefillModal.style.display = "none";
      } else {
        alert(
          "Submitted credit cannot be less than the credit when the modal was opened."
        );
        creditRefillModalInput.value = currentModalCredit; // reset the input-value to the original credit count
      }
    });

  document
    .getElementById("presents-page-credit-refill-modal-increase-button")
    .addEventListener("click", function () {
      let currentValue = parseInt(creditRefillModalInput.value, 10);
      creditRefillModalInput.value = currentValue + 1;
    });

  document
    .getElementById("presents-page-credit-refill-modal-decrease-button")
    .addEventListener("click", function () {
      let currentValue = parseInt(creditRefillModalInput.value, 10);
      if (currentValue > currentModalCredit) {
        // make sure the input-value would not be less than the original credit count
        creditRefillModalInput.value = currentValue - 1;
      }
    });

  // 3. Close the credit refill modal
  creditRefillModalCloseButton.addEventListener("click", function () {
    creditRefillModal.style.display = "none";
  });
  // End of credit refill modal

  // Start of gift purchase modal:
  const giftPurchaseModal = document.getElementById(
    "presents-page-gift-purchase-modal"
  );
  const giftPurchaseModalCloseButton = document.querySelector(
    "#presents-page-gift-purchase-modal .presents-page-gift-purchase-modal-close-button"
  );
  const giftPurchaseModalInput = document.getElementById(
    "presents-page-gift-purchase-count"
  );
  const giftPurchaseModalSubmitButton = document.getElementById(
    "presents-page-gift-purchase-modal-submit-credit-button"
  );
  const currentCreditLeftover = document.getElementById(
    "presents-page-display-credit"
  );

  let currentChoosedGiftValue = 0;
  let selectedGiftCard = null;

  function addGiftButtonListeners() {
    document
      .querySelectorAll(".buy-gift-show-card-container button")
      .forEach((button) => {
        button.addEventListener("click", function () {
          currentChoosedGiftValue = parseInt(
            button.textContent.replace("Credit: ", ""),
            10
          );
          selectedGiftCard = button.parentElement;
          giftPurchaseModal.style.display = "block";
        });
      });
  }

  giftPurchaseModalSubmitButton.addEventListener("click", function () {
    let purchaseCount = parseInt(giftPurchaseModalInput.value, 10);
    let currentPurchaseTotal = currentChoosedGiftValue * purchaseCount;
    let currentCredit = parseInt(
      currentCreditLeftover.textContent.replace(" CREDIT", ""),
      10
    );
    if (currentPurchaseTotal > currentCredit) {
      alert("Insufficient credit to make this purchase.");
    } else {
      currentCredit -= currentPurchaseTotal;
      currentCreditLeftover.textContent = currentCredit + " CREDIT";
      giftPurchaseModal.style.display = "none";

      addGiftToGiftBucket(selectedGiftCard, purchaseCount);
    }
  });

  // Close the gift purchase modal
  giftPurchaseModalCloseButton.addEventListener("click", function () {
    giftPurchaseModal.style.display = "none";
  });
  // End of gift purchase modal

  // Start of exchange to credit modal:
  const exchangeToCreditModal = document.getElementById(
    "presents-page-exchange-to-credit-modal"
  );
  const exchangeToCreditModalCloseButton = document.getElementById(
    "presents-page-exchange-to-credit-modal-close-button"
  );
  const exchangeToCreditModalSubmitButton = document.getElementById(
    "presents-page-exchange-to-credit-modal-submit-credit-button"
  );
  const exchangeToCreditModalInput = document.getElementById(
    "presents-page-exchange-to-credit-count"
  );

  document.addEventListener("click", function (e) {
    if (
      e.target &&
      e.target.classList.contains("bucket-gift-card-exchange-to-credit-button")
    ) {
      selectedGiftBucketCard = e.target.closest(".bucket-gift-card-container");
      exchangeToCreditModal.style.display = "block";
    }
  });

  exchangeToCreditModalSubmitButton.addEventListener("click", function () {
    let exchangeCount = parseInt(exchangeToCreditModalInput.value, 10);

    let currentQuantityElement = selectedGiftBucketCard.querySelector(
      ".bucket-gift-card-gift-quantity"
    );
    let currentQuantity = parseInt(
      currentQuantityElement.textContent.replace("Quantity You Hold: ", "")
    );
    let giftValue = parseInt(
      selectedGiftBucketCard.getAttribute("data-gift-value")
    );

    if (exchangeCount > currentQuantity) {
      alert("You cannot exchange more than you hold.");
    } else {
      let newQuantity = currentQuantity - exchangeCount;
      if (newQuantity <= 0) {
        selectedGiftBucketCard.remove();
      } else {
        currentQuantityElement.textContent =
          "Quantity You Hold: " + newQuantity;
      }

      let addedCredit = exchangeCount * giftValue;

      let currentCreditElement = document.getElementById(
        "presents-page-display-credit"
      );
      let currentCreditText = currentCreditElement.textContent
        .replace(" CREDIT", "")
        .trim();
      let currentCredit = parseInt(currentCreditText, 10);

      let newCredit = currentCredit + addedCredit;
      currentCreditElement.textContent = newCredit + " CREDIT";

      exchangeToCreditModal.style.display = "none";
    }
  });

  exchangeToCreditModalCloseButton.addEventListener("click", function () {
    exchangeToCreditModal.style.display = "none";
  });
  // End of exchange to credit modal

  // Load gifts information immediately
  fetchGiftsInformation().then(() => {
    addGiftButtonListeners(); // Ensure listeners are added after gift data is fetched and rendered
  });
});

function fetchGiftsInformation() {
  return fetch("data/giftInformation.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch gifts information");
      }
      return response.json();
    })
    .then((gifts) => {
      const buyGiftContainer = document.getElementById("buy-gifts-container");
      buyGiftContainer.innerHTML = ""; // Clear the container
      gifts.forEach((gift) => {
        const buyGiftCard = document.createElement("div");
        buyGiftCard.className = "buy-gift-show-card-container";
        const buyGiftCardImage = document.createElement("img");
        buyGiftCardImage.src = `data/giftInformation/${gift.giftPicture}`;
        buyGiftCardImage.alt = gift.giftName;
        const buyGiftCardName = document.createElement("h3");
        buyGiftCardName.textContent = gift.giftName;
        const buyGiftCardDescription = document.createElement("p");
        buyGiftCardDescription.textContent = gift.giftDescription;
        const buyGiftCardValue = document.createElement("button");
        buyGiftCardValue.textContent = `Credit: ${gift.giftValue}`;

        buyGiftCard.appendChild(buyGiftCardImage);
        buyGiftCard.appendChild(buyGiftCardName);
        buyGiftCard.appendChild(buyGiftCardDescription);
        buyGiftCard.appendChild(buyGiftCardValue);

        buyGiftContainer.appendChild(buyGiftCard);
      });
    })
    .catch((error) => {
      console.error("Error loading gifts:", error);
      const buyGiftContainer = document.getElementById("buy-gifts-container");
      buyGiftContainer.innerHTML = "<p>Error loading gifts.</p>";
    });
}

function addGiftToGiftBucket(giftCard, giftQuantity) {
  const giftsBucketContainer = document.getElementById(
    "gifts-bucket-container"
  );
  const giftBucketContainerPrompt = document.getElementById(
    "gifts-bucket-prompt"
  );
  const giftId = giftCard.querySelector("img").src;

  let existingCard = giftsBucketContainer.querySelector(
    `.bucket-gift-card-container[data-id='${giftId}']`
  );

  if (existingCard) {
    let quantityElement = existingCard.querySelector(
      ".bucket-gift-card-gift-quantity"
    );
    let currentQuantity = parseInt(
      quantityElement.textContent.replace("Quantity You Hold: ", "")
    );
    let newQuantity = currentQuantity + giftQuantity;
    quantityElement.textContent = "Quantity You Hold: " + newQuantity;
  } else {
    let newCardForBucket = document.createElement("div");
    newCardForBucket.className = "bucket-gift-card-container";
    newCardForBucket.setAttribute("data-id", giftId);

    let bucketGiftImage = giftCard.querySelector("img").cloneNode(true);
    let bucketGiftName = giftCard.querySelector("h3").cloneNode(true);
    let bucketGiftDescription = giftCard.querySelector("p").cloneNode(true);
    let bucketGiftQuantityElement = document.createElement("h3");
    bucketGiftQuantityElement.className = "bucket-gift-card-gift-quantity";
    bucketGiftQuantityElement.textContent =
      "Quantity You Hold: " + giftQuantity;

    let exchangeToCreditButton = document.createElement("button");
    exchangeToCreditButton.textContent = "Exchange to Credit";
    exchangeToCreditButton.className =
      "bucket-gift-card-exchange-to-credit-button";

    let giftValue = giftCard
      .querySelector("button")
      .textContent.replace("Credit: ", "")
      .trim();
    newCardForBucket.setAttribute("data-gift-value", giftValue);

    newCardForBucket.appendChild(bucketGiftImage);
    newCardForBucket.appendChild(bucketGiftName);
    newCardForBucket.appendChild(bucketGiftDescription);
    newCardForBucket.appendChild(bucketGiftQuantityElement);
    newCardForBucket.appendChild(exchangeToCreditButton);

    giftsBucketContainer.appendChild(newCardForBucket);
  }

  if (giftBucketContainerPrompt) {
    giftBucketContainerPrompt.style.display = "none";
  }
}
