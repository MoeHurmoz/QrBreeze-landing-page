// Function to remove one or more HTML elements at once using a class name
const removeElements = (className) => {
  if (typeof className === "string") {
    const elements = document.getElementsByClassName(className);

    while (elements.length > 0) {
      elements[0].remove();
    }
  }
};

// Function to handle with <br /> tags in HTML that are not suitable for some screen sizes
const handleBrTags = () => {
  const userScreenSize = window.innerWidth;

  // If the user's screen is medium size
  if (userScreenSize <= 1200 && userScreenSize > 766) {
    // Remove <br /> tags that are not suitable for medium screens
    removeElements("md-screen");
  }
  // Else if the user's screen is small size
  else if (userScreenSize <= 766) {
    // Remove <br /> tags that are not suitable for small screens
    removeElements("removable-tag");
  }
};

// Function to handle the hamburger button and navigation bar
const handleHamburgerBtn = () => {
  const mainHeader = document.getElementById("main-header"),
    hamburgerBtn = document.getElementById("hamburger-btn"),
    navbar = document.getElementById("navbar");

  if (mainHeader && hamburgerBtn && navbar) {
    // Function to open and close navigation bar when hamburger button is clicked
    const toggleNavbar = (event) => {
      event.stopPropagation();

      const expanded = hamburgerBtn.getAttribute("aria-expanded") === "true";

      if (!expanded) {
        mainHeader.classList.add("active");
        document.addEventListener("click", closeNavbar);
      } else {
        setTimeout(() => {
          mainHeader.classList.remove("active");
        }, 500);
        document.removeEventListener("click", closeNavbar);
      }

      hamburgerBtn.classList.toggle("active");
      hamburgerBtn.setAttribute("aria-expanded", !expanded);
      navbar.classList.toggle("active");
    };

    // Function to close navigation bar when clicked anywhere outside navigation bar
    const closeNavbar = (event) => {
      if (!navbar.contains(event.target)) {
        setTimeout(() => {
          mainHeader.classList.remove("active");
        }, 500);

        hamburgerBtn.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        navbar.classList.remove("active");
        document.removeEventListener("click", closeNavbar);
      }
    };

    // Remove existing event listener if any
    hamburgerBtn.removeEventListener("click", toggleNavbar);

    // Add the event listener
    hamburgerBtn.addEventListener("click", toggleNavbar);
  }
};

// Function to perform a writing effect on the element passed to it
const writingEffect = (element, arrOfWords) => {
  if (element instanceof HTMLElement && Array.isArray(arrOfWords)) {
    let index = 0,
      currentWord = arrOfWords[index],
      charIndex = 0;

    // Function to type the current word
    const typeWord = () => {
      if (charIndex >= currentWord.length) {
        setTimeout(eraseWord, 600); // Wait before starting to erase the word
        return;
      }

      charIndex++;
      element.innerHTML = currentWord.substring(0, charIndex);
      setTimeout(typeWord, 50);
    };

    // Function to erase current word and move to the next word
    const eraseWord = () => {
      if (charIndex <= 0) {
        index = (index + 1) % arrOfWords.length;
        currentWord = arrOfWords[index];
        typeWord();
        return;
      }

      charIndex--;
      element.innerHTML = currentWord.substring(0, charIndex);
      setTimeout(eraseWord, 50);
    };

    typeWord();
  } else {
    throw new Error("There is an error in the element or array.");
  }
};

const variableText = document.getElementById("variable-text"),
  words = [
    "URL/Link",
    "PDF",
    "Vcard",
    "Images",
    "List of Links",
    "Business",
    "Menu",
    "Apps",
    "Coupon",
    "Event",
    "Video",
    "Social Media",
    "More...",
  ];

document.addEventListener("DOMContentLoaded", () => {
  handleBrTags();
  handleHamburgerBtn();
  writingEffect(variableText, words);
});

window.addEventListener("resize", handleBrTags);
