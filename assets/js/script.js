// position the buttons in the netflix scroller

const main = () => {
  setNetflixScoller();
};

window.addEventListener("load", main);

const setNetflixScoller = () => {
  addOrRemoveNetflixScrollerButtons();
  addOnNetflixScrollerShowButtonsHandler();
  positionNetflixScrollerButtons();
};

// if user is on desktop, immediately hide the
// netflix scroller buttons
const addOrRemoveNetflixScrollerButtons = () => {
  if (!isDesktopDevice()) {
    return;
  }
  //   user device is desktop
  const netflixScrollers = document.querySelectorAll(".netflix-scroller");
  netflixScrollers.forEach((netflixScroller) => {
    const buttons = netflixScroller.querySelector(".buttons");
    // FIX: when adding this class first, buttons do not seem
    // to be correctly positioned
    // buttons.classList.add("buttons-hidden");
  });
};

const addOnNetflixScrollerShowButtonsHandler = () => {
  // add on hover listener only if the user device is desktop
  // why? mobile does not have hover/mouseenter
  if (!isDesktopDevice()) {
    return;
  }
  //   user device is desktop

  const netflixScrollers = document.querySelectorAll(".netflix-scroller");
  netflixScrollers.forEach((netflixScroller) => {
    // user enters mouse: show scroller buttons
    netflixScroller.addEventListener("mouseenter", () => {
      // the buttons inside this scroller
      const buttons = netflixScroller.querySelector(".buttons");
      buttons.classList.remove("buttons-hidden");
    });

    // user leaves mouse: hide scroller buttons
    netflixScroller.addEventListener("mouseleave", () => {
      // the buttons inside this scroller
      const buttons = netflixScroller.querySelector(".buttons");
      buttons.classList.add("buttons-hidden");
    });
  });
};

const positionNetflixScrollerButtons = () => {
  // get netflix scoller
  const netflixScrollers = document.querySelectorAll(".netflix-scroller");

  netflixScrollers.forEach((netflixScroller) => {
    // get the buttons inside the scroller
    const buttons = netflixScroller.querySelector(".buttons");
    const cards = netflixScroller.querySelector(".cards");

    const leftButton = buttons.querySelector(".left");
    const rightButton = buttons.querySelector(".right");

    leftButton.textContent = "<";
    rightButton.textContent = ">";

    leftButton.style.top = getAppropriateNetflixScrollerButtonHeight(cards, leftButton);

    rightButton.style.top = getAppropriateNetflixScrollerButtonHeight(cards, rightButton);
    rightButton.style.right = 0;

    // add event listeners to move back and forth horizontally (x-axis)
    // in the cards container
    addNetflixScrollerButtonHandler(leftButton, "left", cards);
    addNetflixScrollerButtonHandler(rightButton, "right", cards);
  });
};

const addNetflixScrollerButtonHandler = (button, buttonDirection, cards) => {
  if (buttonDirection == "left") {
    button.addEventListener("click", () => {
      cards.scrollTo({
        left: -500,
        behavior: "smooth",
      });
    });
  } else if (buttonDirection == "right") {
    button.addEventListener("click", () => {
      cards.scrollTo({
        left: 500,
        behavior: "smooth",
      });
    });
  }
};

const getAppropriateNetflixScrollerButtonHeight = (cardsContainer, button) => {
  const cardsContainerHeight = cardsContainer.offsetHeight;
  const buttonHeight = button.offsetHeight;
  const result = cardsContainerHeight / 2 - buttonHeight / 2;
  return `${result}px`;
};

// HELPERS

const isDesktopDevice = () => {
  // 1. Modern API (Chromium-based browsers)
  if (navigator.userAgentData) {
    return !navigator.userAgentData.mobile;
  }

  // 2. Legacy Fallback (Safari, Firefox, etc.)
  // We check for common mobile identifiers; if none match, we assume Desktop
  const mobileRegex = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return !mobileRegex.test(navigator.userAgent);
};
